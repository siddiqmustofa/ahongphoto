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
    console.log('PREVIEW PAGE:', photo ? 'Photo OK' : 'NO PHOTO', frame ? 'Frame OK' : 'NO FRAME');
    
    if (!photo || !frame) {
      console.error('Missing data');
      toast.error('Data tidak lengkap');
      setTimeout(() => navigate('/frame-select'), 2000);
      return;
    }
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
    toast.success('Foto berhasil diunduh!');
  };

  const handleShowQR = async () => {
    if (!photo) {
      toast.error('Foto tidak tersedia');
      return;
    }
    
    try {
      toast.info('Generating QR code...');
      
      const response = await axios.post(`${API}/share/create`, {
        photo_data: photo,
        frame_name: frame.name
      });
      
      if (response.data.success) {
        setQrValue(response.data.share_url);
        setShowQR(true);
        toast.success('QR Code ready!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal membuat QR code');
    }
  };

  const handleEmailSend = async () => {
    if (!email) {
      toast.error('Masukkan email!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Email tidak valid!');
      return;
    }

    setIsSending(true);
    try {
      await axios.post(`${API}/send-photo`, {
        email,
        photo,
        frameName: frame.name
      });
      toast.success(`Terkirim ke ${email}!`);
      setEmail('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal mengirim email');
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
        toast.success('Print job sent!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal mencetak');
    } finally {
      setIsPrinting(false);
    }
  };

  const handleSaveToGallery = async () => {
    try {
      await axios.post(`${API}/gallery/save`, {
        photo_data: photo,
        frame_name: frame.name,
        frame_category: frame.category
      });
      toast.success('Tersimpan ke galeri!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal menyimpan');
    }
  };

  const handleCustomize = () => {
    navigate('/customize', { state: { photo, frame, photos } });
  };

  const handleRetake = () => {
    navigate('/frame-select');
  };

  const handleHome = () => {
    navigate('/');
  };

  if (!photo || !frame) {
    return (
      <div className="candy-gradient-bg min-h-screen flex items-center justify-center">
        <GlassCard className="text-center p-8">
          <p className="text-gray-700 font-medium">Loading...</p>
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
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-2"
            style={{ fontFamily: 'Fredoka, cursive' }}
          >
            Foto Strip Siap! 🎉
          </motion.h2>
          <p className="text-lg text-gray-600 font-medium">
            Download, kirim, atau cetak!
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,2fr] gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <GlassCard>
              <div className="bg-white p-4 rounded-2xl shadow-xl">
                <img
                  src={photo}
                  alt="Final strip"
                  className="w-full rounded-lg"
                  data-testid="final-photo"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-gray-800 font-bold text-lg">{frame.name}</p>
                <p className="text-gray-600 text-sm">{frame.category}</p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <GlassCard>
              <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
                📱 QR Code Download
              </h3>
              <div className="text-center">
                {showQR && qrValue ? (
                  <div className="bg-white p-4 rounded-2xl inline-block">
                    <QRCodeCanvas value={qrValue} size={200} level="H" />
                    <p className="text-xs text-gray-600 mt-2">Scan to download</p>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Fredoka, cursive' }}>
                🖨️ Print
              </h3>
              <JellyButton
                onClick={handlePrint}
                disabled={isPrinting}
                testId="print-photo-btn"
                className="w-full inline-flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                {isPrinting ? 'Printing...' : 'Print Now'}
              </JellyButton>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                📧 Email
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-white/70 border-2 border-white/50 focus:border-pink-500 rounded-2xl px-6 py-4 outline-none transition-all"
                  data-testid="email-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailSend()}
                />
                <JellyButton
                  onClick={handleEmailSend}
                  disabled={isSending}
                  testId="send-email-btn"
                  className="w-full inline-flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  {isSending ? 'Sending...' : 'Send Email'}
                </JellyButton>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                💾 Download
              </h3>
              <JellyButton
                onClick={handleDownload}
                testId="download-photo-btn"
                className="w-full inline-flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download
              </JellyButton>
            </GlassCard>

            <div className="grid grid-cols-2 gap-3">
              <JellyButton
                onClick={handleSaveToGallery}
                variant="secondary"
                testId="save-gallery-btn"
              >
                💾 Save
              </JellyButton>
              <JellyButton
                onClick={handleCustomize}
                variant="secondary"
                testId="customize-btn"
              >
                ✏️ Edit
              </JellyButton>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <JellyButton
                onClick={handleRetake}
                variant="secondary"
                testId="retake-btn"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Retake
              </JellyButton>
              <JellyButton
                onClick={() => navigate('/gallery')}
                variant="secondary"
                testId="gallery-btn"
              >
                🖼️ Gallery
              </JellyButton>
            </div>

            <JellyButton
              onClick={handleHome}
              variant="secondary"
              testId="home-btn"
              className="w-full"
            >
              <Home className="w-5 h-5 inline mr-2" />
              Home
            </JellyButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
