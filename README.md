# GlowBox Photobooth

<div align="center">
  <h1>🎀 GlowBox by Glad2Glow 🎀</h1>
  <p><strong>Self Photobooth dengan Tema Sweet Candy / Bubble Pop</strong></p>
  <p>Multi-shot photobooth app dengan AR filters, QR code sharing, dan admin dashboard</p>
</div>

## ✨ Features

### 📸 Core Features
- **Multi-Shot Capture**: Ambil 3 foto berturut-turut untuk strip photobooth
- **9 Frame Options**: Pilihan frame dengan 5 kategori (Semua, Polos, K-POP, Music, Anime)
- **6 AR Face Filters**: Real-time AR filters (Glasses, Hearts, Cat Ears, Crown, Star Eyes)
- **6 Photo Filters**: Brightness, Vintage, Candy, Dreamy, Cool effects
- **Text Overlay**: Custom text dengan 5 warna dan 3 posisi
- **10 Virtual Stickers**: Emoji stickers untuk personalisasi

### 🎯 Sharing & Output
- **QR Code Generation**: Shareable links dengan QR code (expires 7 days)
- **Email Integration**: Send photos via Resend API dengan HTML template
- **Print to Printer**: Integration-ready untuk thermal printers
- **Direct Download**: High-quality JPG download
- **Gallery System**: Save dan manage photos

### 📊 Admin Dashboard
- Real-time statistics (Sessions, Emails, Prints)
- Recent photos grid
- Print queue management
- Quick analytics
- **Printer Settings**: Configure printer connection

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- (Optional) Resend API key for email functionality

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/glowbox.git
cd glowbox

# Run deployment script
chmod +x deploy.sh
./deploy.sh
```

Application will be available at:
- Frontend: http://localhost
- Backend: http://localhost:8001
- API Docs: http://localhost:8001/docs

### Manual Setup

```bash
# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:

```env
# Backend
RESEND_API_KEY=re_your_actual_key
SENDER_EMAIL=noreply@yourdomain.com
APP_URL=https://your-domain.com

# Frontend
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Email Setup (Optional)

1. Sign up at [Resend.com](https://resend.com)
2. Get API key
3. Update `RESEND_API_KEY` in `.env`
4. Restart backend: `docker-compose restart backend`

See `/app/EMAIL_SETUP.md` for detailed guide.

### Printer Setup (Optional)

For physical printer integration:
- DNP DS620
- Mitsubishi CP-D70  
- CUPS (Linux)
- Windows Print Spooler

Configure via Admin Dashboard → Printer Settings

## 📐 Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Framer Motion (animations)
- React Webcam
- QRCode.react
- Axios
- React Router v6

### Backend
- FastAPI (Python)
- Motor (async MongoDB)
- Resend (email)
- Pydantic

### Database
- MongoDB 7

### Deployment
- Docker & Docker Compose
- Nginx (reverse proxy)

## 🎨 UI/UX Design

- **Theme**: Sweet Candy / Bubble Pop
- **Colors**: Soft Pink (#FFD1DC), Bright Pink (#FF69B4)
- **Typography**: Nunito, Fredoka, Quicksand
- **Effects**: Glassmorphism, floating bubbles, smooth animations

## 📱 Application Flow

```
Landing (By Glad2Glow)
  ↓
Frame Selection (9 frames, 5 categories)
  ↓
Capture with AR (3 photos, 6 AR filters)
  ↓
Filter Application (6 filters, auto-processing)
  ↓
Customize (Text overlay + Stickers) [Optional]
  ↓
Preview & Actions
  ├─ QR Code Generation
  ├─ Email Send
  ├─ Print to Printer
  ├─ Download
  └─ Save to Gallery
  ↓
Gallery (View all saved photos)
```

## 🔐 Admin Access

Click the "GlowBox" logo 5 times on landing page to access admin dashboard.

## 📊 API Endpoints

### Photos
- `POST /api/gallery/save` - Save photo
- `GET /api/gallery` - Get all photos
- `DELETE /api/gallery/{id}` - Delete photo

### Sharing
- `POST /api/share/create` - Create shareable link
- `GET /api/share/{shareId}` - Get shared photo

### Email & Print
- `POST /api/send-photo` - Send via email
- `POST /api/print-photo` - Print photo
- `GET /api/print-jobs` - Get print queue

### Admin
- `GET /api/photos` - Get email history
- `GET /api/status` - Health check

## 🛠️ Development

### Local Development

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload --port 8001

# Frontend  
cd frontend
yarn install
yarn start
```

### Project Structure

```
glowbox/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
├── docker-compose.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── nginx.conf
└── deploy.sh
```

## 📝 License

MIT License - feel free to use for commercial projects

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📧 Support

For issues or questions, please open a GitHub issue.

## 🎉 Credits

Built with ❤️ by Glad2Glow Team

---

<div align="center">
  <p><strong>Made with Emergent Agent</strong></p>
  <p>🎀 Sweet • Fun • Shareable 🎀</p>
</div>