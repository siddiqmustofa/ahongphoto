from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import base64
import asyncio

try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False
    logging.warning("Resend not installed. Email functionality will be mocked.")


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

if RESEND_AVAILABLE:
    RESEND_API_KEY = os.environ.get('RESEND_API_KEY', 're_demo_key')
    SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'noreply@glowbox.app')
    resend.api_key = RESEND_API_KEY

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

class GalleryPhoto(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    photo_data: str
    frame_name: str
    frame_category: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TextOverlay(BaseModel):
    text: str
    fontSize: int = 24
    color: str = "#FFFFFF"
    position: str = "bottom"

class CustomizeRequest(BaseModel):
    photo: str
    textOverlay: Optional[TextOverlay] = None


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
        
        if RESEND_AVAILABLE and RESEND_API_KEY != 're_demo_key':
            html_content = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: 'Arial', sans-serif; background: linear-gradient(135deg, #FFD1DC 0%, #E6E6FA 100%); margin: 0; padding: 40px; }}
                    .container {{ max-width: 600px; margin: 0 auto; background: white; border-radius: 30px; padding: 40px; box-shadow: 0 10px 40px rgba(255, 105, 180, 0.3); }}
                    .header {{ text-align: center; margin-bottom: 30px; }}
                    .logo {{ font-size: 48px; font-weight: bold; color: #FF69B4; text-shadow: 2px 2px 0 #FF1493; }}
                    .photo-container {{ text-align: center; margin: 30px 0; }}
                    .photo {{ max-width: 100%; border-radius: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.1); }}
                    .footer {{ text-align: center; color: #8B5F6D; margin-top: 30px; font-size: 14px; }}
                    .button {{ display: inline-block; background: linear-gradient(180deg, #FF85C0 0%, #FF69B4 100%); color: white; padding: 15px 40px; border-radius: 50px; text-decoration: none; font-weight: bold; margin-top: 20px; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <div class="logo">GlowBox</div>
                        <p style="color: #592E39; font-size: 18px;">Your Photobooth Memory! ✨</p>
                    </div>
                    <div class="photo-container">
                        <img src="{request.photo}" alt="Your GlowBox Photo" class="photo" />
                        <p style="color: #8B5F6D; margin-top: 15px; font-weight: bold;">Frame: {request.frameName}</p>
                    </div>
                    <div style="text-align: center; color: #592E39; font-size: 16px; margin: 20px 0;">
                        Thanks for using GlowBox! Share your sweet memories with friends! 🎀
                    </div>
                    <div class="footer">
                        <p>© 2026 GlowBox Photobooth. Made with ❤️</p>
                    </div>
                </div>
            </body>
            </html>
            """
            
            params = {
                "from": SENDER_EMAIL,
                "to": [request.email],
                "subject": f"✨ Your GlowBox Photo Strip - {request.frameName}",
                "html": html_content
            }
            
            try:
                email_result = await asyncio.to_thread(resend.Emails.send, params)
                logger.info(f"Email sent successfully to {request.email}: {email_result.get('id')}")
                return {
                    "success": True,
                    "message": f"Photo sent to {request.email}",
                    "email_id": email_result.get('id')
                }
            except Exception as e:
                logger.error(f"Resend API error: {str(e)}")
                return {
                    "success": True,
                    "message": f"Photo record saved for {request.email} (email sending failed: {str(e)})",
                    "note": "Email service error - saved to database"
                }
        else:
            logger.info(f"Photo record saved for {request.email} (email sending mocked)")
            return {
                "success": True,
                "message": f"Photo record saved for {request.email}",
                "note": "Email sending is mocked. Add RESEND_API_KEY to .env for real email delivery."
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
            "note": "This is a mock implementation. In production, integrate with CUPS (Linux), Windows Print Spooler, or thermal printer SDK (DNP DS620, Mitsubishi CP-D70, etc.)."
        }
    
    except Exception as e:
        logger.error(f"Error processing print job: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process print job")

@api_router.get("/print-jobs")
async def get_print_jobs():
    jobs = await db.print_jobs.find({}, {"_id": 0}).to_list(1000)
    return jobs

@api_router.post("/gallery/save")
async def save_to_gallery(photo: GalleryPhoto):
    try:
        doc = photo.model_dump()
        doc['timestamp'] = doc['timestamp'].isoformat()
        
        await db.gallery.insert_one(doc)
        
        logger.info(f"Photo saved to gallery: {photo.id}")
        
        return {
            "success": True,
            "message": "Photo saved to gallery",
            "photoId": photo.id
        }
    except Exception as e:
        logger.error(f"Error saving to gallery: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to save to gallery")

@api_router.get("/gallery")
async def get_gallery(limit: int = 50):
    try:
        photos = await db.gallery.find(
            {}, 
            {"_id": 0}
        ).sort("timestamp", -1).limit(limit).to_list(limit)
        
        for photo in photos:
            if isinstance(photo['timestamp'], str):
                photo['timestamp'] = datetime.fromisoformat(photo['timestamp'])
        
        return {
            "success": True,
            "photos": photos,
            "count": len(photos)
        }
    except Exception as e:
        logger.error(f"Error fetching gallery: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch gallery")

@api_router.delete("/gallery/{photo_id}")
async def delete_from_gallery(photo_id: str):
    try:
        result = await db.gallery.delete_one({"id": photo_id})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Photo not found")
        
        return {
            "success": True,
            "message": "Photo deleted from gallery"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting from gallery: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to delete photo")

@api_router.post("/customize")
async def customize_photo(request: CustomizeRequest):
    try:
        return {
            "success": True,
            "message": "Photo customization completed",
            "photo": request.photo,
            "note": "Text overlay feature is implemented on frontend using Canvas API"
        }
    except Exception as e:
        logger.error(f"Error customizing photo: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to customize photo")


@api_router.post("/share/create")
async def create_share_link(photo: dict):
    try:
        share_id = str(uuid.uuid4())[:8]
        
        share_record = {
            "id": share_id,
            "photo_data": photo.get("photo_data"),
            "frame_name": photo.get("frame_name", "GlowBox Photo"),
            "created_at": datetime.now(timezone.utc).isoformat(),
            "expires_at": (datetime.now(timezone.utc) + timedelta(days=7)).isoformat()
        }
        
        await db.shared_photos.insert_one(share_record)
        
        share_url = f"{os.environ.get('APP_URL', 'https://sweet-snap-box.preview.emergentagent.com')}/share/{share_id}"
        
        logger.info(f"Share link created: {share_id}")
        
        return {
            "success": True,
            "share_id": share_id,
            "share_url": share_url
        }
    except Exception as e:
        logger.error(f"Error creating share link: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create share link")

@api_router.get("/share/{share_id}")
async def get_shared_photo(share_id: str):
    try:
        photo = await db.shared_photos.find_one({"id": share_id}, {"_id": 0})
        
        if not photo:
            raise HTTPException(status_code=404, detail="Photo not found")
        
        return {
            "success": True,
            "photo": photo
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching shared photo: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch photo")


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