# GlowBox - Self Photobooth Application

## Original Problem Statement
Buatkan Aplikasi Self Photobooth Bernama GlowBox dengan desain / tema UI dengan tema sweet candy / bubble pop, menggunakan palet warna soft pink (Pantone 1905C) sebagai dasar dan bright pink (Pantone 205C) sebagai aksen. Gaya visual glossy, playful, dan modern, dengan elemen bubble transparan, rounded shapes, dan efek soft shadow. Nuansa keseluruhan harus terasa fun, friendly, dan youthful, dengan sentuhan semi-glassmorphism dan candy-like aesthetics.

## Product Requirements

### Core Flow
1. **Pilih Frame (Select Frame)** - User selects a photo frame from categories
2. **Foto & Filter (Take Photo & Apply Filter)** - 3 shots per session
3. **Cetak Dan Kirim File via email (Print and Send File via email)**

### UI/UX Requirements
- Sweet candy/bubble pop theme
- Colors: Soft pink (Pantone 1905C) base, bright pink (Pantone 205C) accent
- Visual Style: Glossy, playful, modern, transparent bubbles, rounded shapes, soft shadows, semi-glassmorphism
- Logo: "GlowBox by glad to glow"
- Layout: All pages fit viewport without scroll (h-screen)
- Paper size: 4R (10.2 x 15.2 cm) for photo strips

### Features
- **Frame Selection**: Categories (All, Plain, K-POP, Music, Anime, Cute)
- **Photo Capture**: 3 photos per session with countdown timer
- **Filters**: Original, Bright, Vintage, Candy, Dreamy, Cool
- **Output Options**:
  - Email photos (using Resend)
  - QR Code for instant download (via shareable link)
  - Physical printing support (mocked)
- **Gallery**: View previously saved photos
- **Admin Dashboard**: Analytics and settings

## Technical Stack
- **Frontend**: React, React Router, Tailwind CSS, Framer Motion
- **Backend**: FastAPI (Python), MongoDB
- **Integrations**: Resend (Email), qrcode.react
- **DevOps**: Docker, Nginx, Supervisor

## What's Been Implemented

### Completed (March 17, 2026)
- [x] Landing page with GlowBox branding
- [x] Frame Selection page with 9 frames and categories
- [x] Photo Capture page with webcam integration
- [x] Filter page with canvas-based image processing
- [x] Preview page with download, email, QR, print options
- [x] Gallery page with photo display and management
- [x] Admin Dashboard (basic)
- [x] Sweet candy/bubble pop theme throughout
- [x] Floating bubbles animation
- [x] Glassmorphism styling (glass-card)
- [x] All pages fit viewport (h-screen layout) - FIXED
- [x] Navigation flows working
- [x] 4R paper size layout for photo strips
- [x] QR code shareable link system
- [x] Docker deployment setup

### API Endpoints (All Working)
- `GET /api/` - Health check
- `POST /api/send-photo` - Send photo via email (MOCKED without RESEND_API_KEY)
- `POST /api/print-photo` - Print photo (MOCKED)
- `GET /api/gallery` - Get all gallery photos
- `POST /api/gallery/save` - Save photo to gallery
- `DELETE /api/gallery/{photo_id}` - Delete photo
- `POST /api/share/create` - Create shareable link
- `GET /api/share/{share_id}` - Get shared photo

## Known Issues

### Resolved
- [x] Pages requiring scroll - FIXED with h-screen layout
- [x] State management in capture flow - FIXED with functional updates

### Outstanding (Low Priority)
- Gallery may show broken image if test data has invalid photo_data
- Email sending requires RESEND_API_KEY configuration
- Print functionality is mocked

## Upcoming Tasks (P1)
- [ ] Implement AR Face Filters (DeepAR SDK scaffolded)
- [ ] Implement Custom Text Overlay
- [ ] Implement Virtual Props/Stickers

## Future Tasks (P2)
- [ ] Enhanced Admin Dashboard with charts
- [ ] Real Printer Integration
- [ ] Data export (CSV/PDF)

## Environment Setup
- Frontend: `REACT_APP_BACKEND_URL` 
- Backend: `MONGO_URL`, `DB_NAME`, `RESEND_API_KEY` (optional)
- Services run via Supervisor (frontend:3000, backend:8001)
