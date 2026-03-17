import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { Download, Mail, RotateCcw, Home, Printer } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Preview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  
  const photo = location.state?.photo;
  const frame = location.state?.frame;

  useEffect(() => {
    if (!photo || !frame) {
      navigate('/frame-select');
    }
  }, [photo, frame, navigate]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = photo;
    link.download = `glowbox-strip-${Date.now()}.jpg`;
    link.click();
    toast.success('Foto strip berhasil diunduh!');
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
        layout: frame.printLayout
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

  if (!photo || !frame) return null;

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
                <img
                  src={photo}
                  alt="Final photo strip"
                  className="w-full rounded-lg"
                  data-testid="final-photo"
                />
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
            className="space-y-4">
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
                📩 Kirim ke Email
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
                📥 Download Foto
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
                onClick={handleRetake}
                variant="secondary"
                testId="retake-photo-btn"
                className="inline-flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Foto Lagi
              </JellyButton>
              <JellyButton
                onClick={handleHome}
                variant="secondary"
                testId="go-home-btn"
                className="inline-flex items-center justify-center gap-2"
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