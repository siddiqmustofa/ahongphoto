import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { Download, Mail, RotateCcw, Home, Printer, QrCode } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import { QRCodeCanvas } from 'qrcode.react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [qrValue, setQrValue] = useState('');
  
  const photo = location.state?.photo;
  const frame = location.state?.frame;
  const photos = location.state?.photos;

  useEffect(() => {
    console.log('=== PREVIEW PAGE DEBUG ===');
    console.log('Photo received:', photo ? `${photo.substring(0, 100)}... (${photo.length} bytes)` : 'NULL');
    console.log('Frame received:', frame?.name || 'NULL');
    console.log('Photos array:', photos?.length || 0);
    
    if (!photo || !frame) {
      console.error('❌ Missing photo or frame data');
      toast.error('Data tidak lengkap. Kembali ke awal.');
      setTimeout(() => navigate('/frame-select'), 2000);
      return;
    }
    console.log('✅ Preview data OK');
  }, [photo, frame, navigate]);

  const handleDownload = () => {
    if (!photo) {
      toast.error('Foto tidak tersedia');
      return;
    }
    const link = document.createElement('a');
    link.href = photo;
    link.download = `glowbox-strip-${Date.now()}.jpg`;
    link.click();
    toast.success('Foto strip berhasil diunduh!');
  };

  const handleShowQR = () => {
    if (!photo) {
      toast.error('Foto tidak tersedia');
      return;
    }
    setQrValue(photo);
    setShowQR(true);
    toast.success('Scan QR code untuk download!');
  };

  const handleEmailSend = async () => {
    if (!email) {
      toast.error('Masukkan alamat email!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Format email tidak valid!');
      return;
    }

    setIsSending(true);
    try {
      await axios.post(`${API}/send-photo`, {
        email,
        photo,
        frameName: frame.name
      });
      toast.success(`Foto berhasil dikirim ke ${email}!`);
      setEmail('');
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Gagal mengirim email. Coba lagi nanti.');
    } finally {
      setIsSending(false);
    }
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      const response = await axios.post(`${API}/print-photo`, {
        photo,
        frameName: frame.name,
        layout: frame.printLayout || { spacing: 20, photoHeight: 240 }
      });
      
      if (response.data.success) {
        toast.success('Perintah cetak dikirim ke printer! 🖨️');
      } else {
        toast.error('Printer tidak tersedia');
      }
    } catch (error) {
      console.error('Error printing:', error);
      toast.error('Gagal mencetak. Pastikan printer terhubung.');
    } finally {
      setIsPrinting(false);
    }
  };

  const handleRetake = () => {
    navigate('/frame-select');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleSaveToGallery = async () => {
    try {
      await axios.post(`${API}/gallery/save`, {
        photo_data: photo,
        frame_name: frame.name,
        frame_category: frame.category
      });
      toast.success('Foto berhasil disimpan ke galeri!');
    } catch (error) {
      console.error('Error saving to gallery:', error);
      toast.error('Gagal menyimpan ke galeri');
    }
  };

  const handleCustomize = () => {
    navigate('/customize', { state: { photo, frame, photos } });
  };

  if (!photo || !frame) {
    return (
      <div className="candy-gradient-bg min-h-screen flex items-center justify-center">
        <GlassCard className="text-center p-8">
          <p className="text-[#592E39] font-medium">Memuat...</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold text-[#592E39] font-['Fredoka'] mb-2"
          >
            Foto Strip Kamu Siap! 🎉
          </motion.h2>
          <p className="text-lg text-[#8B5F6D] font-medium">
            Download, kirim email, atau cetak langsung!
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,2fr] gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard>
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                {photo ? (
                  <img
                    src={photo}
                    alt="Final photo strip"
                    className="w-full rounded-lg"
                    data-testid="final-photo"
                    onError={(e) => {
                      console.error('Image failed to load');
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="800"><rect fill="%23FFD1DC" width="300" height="800"/><text x="150" y="400" text-anchor="middle" fill="%23592E39">Image Error</text></svg>';
                    }}
                  />
                ) : (
                  <div className="aspect-[3/8] bg-gradient-to-b from-candy-soft-pink to-candy-lavender flex items-center justify-center rounded-lg">
                    <p className="text-[#8B5F6D]">No image</p>
                  </div>
                )}
              </div>
              <div className="mt-4 text-center">
                <p className="text-[#592E39] font-bold text-lg">{frame.name}</p>
                <p className="text-[#8B5F6D] text-sm">{frame.category} Strip</p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <GlassCard>
              <h3 className="text-2xl font-bold text-[#592E39] mb-4 font-['Fredoka']">
                📱 QR Code Download
              </h3>
              <div className="text-center">
                {showQR && qrValue ? (
                  <div className="bg-white p-4 rounded-2xl inline-block">
                    <QRCodeCanvas value={qrValue} size={200} level="H" />
                    <p className="text-xs text-[#8B5F6D] mt-2">Scan untuk download</p>
                  </div>
                ) : (
                  <JellyButton
                    onClick={handleShowQR}
                    testId="show-qr-btn"
                    className="w-full inline-flex items-center justify-center gap-2"
                  >
                    <QrCode className="w-5 h-5" />
                    Generate QR Code
                  </JellyButton>
                )}
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-2xl font-bold text-[#592E39] mb-4 font-['Fredoka']">
                🔥 Cetak ke Printer
              </h3>
              <p className="text-[#8B5F6D] mb-4 text-sm">
                Cetak foto strip langsung ke printer yang terhubung (4R / 6R size)
              </p>
              <JellyButton
                onClick={handlePrint}
                disabled={isPrinting}
                testId="print-photo-btn"
                className="w-full inline-flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                {isPrinting ? 'Mencetak...' : 'Cetak Sekarang'}
              </JellyButton>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-bold text-[#592E39] mb-4 font-['Quicksand']">
                📧 Kirim ke Email
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masukkan@email.com"
                  className="w-full bg-white/70 border-2 border-white/50 focus:border-candy-bright-pink rounded-2xl px-6 py-4 text-candy-accent-hover placeholder-[#FFB6C1] focus:ring-4 focus:ring-candy-bright-pink/20 outline-none transition-all font-medium text-lg"
                  data-testid="email-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleEmailSend();
                    }
                  }}
                />
                <JellyButton
                  onClick={handleEmailSend}
                  disabled={isSending}
                  testId="send-email-btn"
                  className="w-full inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  {isSending ? 'Mengirim...' : 'Kirim Email'}
                </JellyButton>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-bold text-[#592E39] mb-4 font-['Quicksand']">
                💾 Download Foto
              </h3>
              <JellyButton
                onClick={handleDownload}
                testId="download-photo-btn"
                className="w-full inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Foto Strip
              </JellyButton>
            </GlassCard>

            <div className="grid grid-cols-2 gap-3">
              <JellyButton
                onClick={handleSaveToGallery}
                variant="secondary"
                testId="save-to-gallery-btn"
                className="inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Simpan
              </JellyButton>
              <JellyButton
                onClick={handleCustomize}
                variant="secondary"
                testId="customize-btn"
                className="inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Customize
              </JellyButton>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <JellyButton
                onClick={handleRetake}
                variant="secondary"
                testId="retake-photo-btn"
                className="inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Foto Lagi
              </JellyButton>
              <JellyButton
                onClick={() => navigate('/gallery')}
                variant="secondary"
                testId="view-gallery-btn"
                className="inline-flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Gallery
              </JellyButton>
            </div>
            <div className="text-center">
              <JellyButton
                onClick={handleHome}
                variant="secondary"
                testId="go-home-btn"
                className="w-full inline-flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Home
              </JellyButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Preview;