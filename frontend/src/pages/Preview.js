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
    console.log('=== PREVIEW PAGE LOADED ===');
    console.log('location.state:', location.state);
    console.log('photo exists:', !!photo);
    console.log('photo preview:', photo?.substring(0, 100));
    console.log('frame:', frame?.name);
    console.log('original photos count:', photos?.length);
    
    if (!photo || !frame) {
      console.error('PREVIEW ERROR: Missing data - photo:', !!photo, 'frame:', !!frame);
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
      <div className="candy-gradient-bg h-screen flex items-center justify-center overflow-hidden">
        <GlassCard className="text-center p-8">
          <p className="text-gray-700 font-medium">Loading...</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="candy-gradient-bg h-screen flex flex-col py-4 px-4 overflow-hidden">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-6xl mx-auto flex-1 flex flex-col min-h-0">
        <div className="text-center mb-4 flex-shrink-0">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-1"
            style={{ fontFamily: 'Fredoka, cursive' }}
          >
            Foto Strip Siap! 🎉
          </motion.h2>
          <p className="text-sm text-gray-600 font-medium">
            Download, kirim, atau cetak!
          </p>
        </div>

        <div className="grid md:grid-cols-[1fr,2fr] gap-4 flex-1 min-h-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="min-h-0"
          >
            <GlassCard className="h-full flex flex-col">
              <div className="bg-white p-3 rounded-xl shadow-xl flex-1 min-h-0 overflow-hidden">
                <img
                  src={photo}
                  alt="Final strip"
                  className="w-full h-full object-contain rounded-lg"
                  data-testid="final-photo"
                />
              </div>
              <div className="mt-2 text-center flex-shrink-0">
                <p className="text-gray-800 font-bold">{frame.name}</p>
                <p className="text-gray-600 text-xs">{frame.category}</p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-3 overflow-y-auto min-h-0 pr-1"
          >
            {/* QR Code & Print Row */}
            <div className="grid grid-cols-2 gap-3">
              <GlassCard>
                <h3 className="text-sm font-bold text-gray-800 mb-2">📱 QR Download</h3>
                <div className="text-center">
                  {showQR && qrValue ? (
                    <div className="bg-white p-2 rounded-lg inline-block">
                      <QRCodeCanvas value={qrValue} size={100} level="H" />
                      <p className="text-[10px] text-gray-600 mt-1">Scan to download</p>
                    </div>
                  ) : (
                    <JellyButton
                      onClick={handleShowQR}
                      testId="show-qr-btn"
                      className="w-full text-xs inline-flex items-center justify-center gap-1"
                    >
                      <QrCode className="w-4 h-4" />
                      QR Code
                    </JellyButton>
                  )}
                </div>
              </GlassCard>

              <GlassCard>
                <h3 className="text-sm font-bold text-gray-800 mb-2">🖨️ Print</h3>
                <JellyButton
                  onClick={handlePrint}
                  disabled={isPrinting}
                  testId="print-photo-btn"
                  className="w-full text-xs inline-flex items-center justify-center gap-1"
                >
                  <Printer className="w-4 h-4" />
                  {isPrinting ? 'Printing...' : 'Print Now'}
                </JellyButton>
              </GlassCard>
            </div>

            {/* Email */}
            <GlassCard>
              <h3 className="text-sm font-bold text-gray-800 mb-2">📧 Email</h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/70 border-2 border-white/50 focus:border-pink-500 rounded-xl px-3 py-2 outline-none transition-all text-sm"
                  data-testid="email-input"
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailSend()}
                />
                <JellyButton
                  onClick={handleEmailSend}
                  disabled={isSending}
                  testId="send-email-btn"
                  className="text-xs inline-flex items-center gap-1"
                >
                  <Mail className="w-4 h-4" />
                  {isSending ? '...' : 'Send'}
                </JellyButton>
              </div>
            </GlassCard>

            {/* Download */}
            <GlassCard>
              <JellyButton
                onClick={handleDownload}
                testId="download-photo-btn"
                className="w-full inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Foto
              </JellyButton>
            </GlassCard>

            {/* Action Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <JellyButton
                onClick={handleSaveToGallery}
                variant="secondary"
                testId="save-gallery-btn"
                className="text-xs"
              >
                💾
              </JellyButton>
              <JellyButton
                onClick={handleCustomize}
                variant="secondary"
                testId="customize-btn"
                className="text-xs"
              >
                ✏️
              </JellyButton>
              <JellyButton
                onClick={handleRetake}
                variant="secondary"
                testId="retake-btn"
                className="text-xs"
              >
                🔄
              </JellyButton>
              <JellyButton
                onClick={() => navigate('/gallery')}
                variant="secondary"
                testId="gallery-btn"
                className="text-xs"
              >
                🖼️
              </JellyButton>
            </div>

            <JellyButton
              onClick={handleHome}
              variant="secondary"
              testId="home-btn"
              className="w-full text-sm"
            >
              <Home className="w-4 h-4 inline mr-1" />
              Home
            </JellyButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
