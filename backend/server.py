from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List
import uuid
from datetime import datetime, timezone
import base64


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class PhotoEmailRequest(BaseModel):
    email: EmailStr
    photo: str
    frameName: str

class PhotoRecord(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    frame_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PrintRequest(BaseModel):
    photo: str
    frameName: str
    layout: dict


@api_router.get("/")
async def root():
    return {"message": "GlowBox Photobooth API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/send-photo")
async def send_photo(request: PhotoEmailRequest):
    try:
        photo_record = PhotoRecord(
            email=request.email,
            frame_name=request.frameName
        )
        
        doc = photo_record.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.photos.insert_one(doc)
        
        logger.info(f"Photo record saved for {request.email} with frame {request.frameName}")
        
        return {
            "success": True,
            "message": f"Photo would be sent to {request.email}",
            "note": "Email sending is mocked for MVP. Integrate with SendGrid/Resend for production."
        }
    
    except Exception as e:
        logger.error(f"Error processing photo send: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process photo")

@api_router.get("/photos", response_model=List[PhotoRecord])
async def get_photos():
    photos = await db.photos.find({}, {"_id": 0}).to_list(1000)
    
    for photo in photos:
        if isinstance(photo['timestamp'], str):
            photo['timestamp'] = datetime.fromisoformat(photo['timestamp'])
    
    return photos

@api_router.post("/print-photo")
async def print_photo(request: PrintRequest):
    try:
        logger.info(f"Print request received for frame: {request.frameName}")
        
        print_record = {
            "id": str(uuid.uuid4()),
            "frame_name": request.frameName,
            "layout": request.layout,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "queued"
        }
        
        await db.print_jobs.insert_one(print_record)
        
        logger.info(f"Print job created: {print_record['id']}")
        
        return {
            "success": True,
            "message": "Print job sent to printer queue",
            "jobId": print_record['id'],
            "note": "This is a mock implementation. In production, integrate with CUPS, Windows Print Spooler, or thermal printer SDK (e.g., DNP, Mitsubishi CP-D70)."
        }
    
    except Exception as e:
        logger.error(f"Error processing print job: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process print job")

@api_router.get("/print-jobs")
async def get_print_jobs():
    jobs = await db.print_jobs.find({}, {"_id": 0}).to_list(1000)
    return jobs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()