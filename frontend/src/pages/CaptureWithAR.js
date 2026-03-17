import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import Webcam from 'react-webcam';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft, Camera, Sparkles } from 'lucide-react';
import { arFilters, applyAROverlay } from '../utils/arFilters';
import { toast } from 'sonner';

const CaptureWithAR = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [showFlash, setShowFlash] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);
  const [selectedARFilter, setSelectedARFilter] = useState(arFilters[0]);
  const [showARPanel, setShowARPanel] = useState(false);
  
  const frame = location.state?.frame;
  const totalPhotos = frame?.slots || 3;

  useEffect(() => {
    if (!frame) {
      navigate('/frame-select');
    }
  }, [frame, navigate]);

  const startCountdown = () => {
    if (isCapturing) return;
    
    setIsCapturing(true);
    let count = 3;
    setCountdown(count);
    
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
      } else {
        clearInterval(timer);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  };

  const capturePhoto = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // Apply AR filter if selected
      let processedImage = imageSrc;
      
      if (selectedARFilter.id !== 'none' && selectedARFilter.overlay) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Apply AR overlay
          applyAROverlay(canvas, selectedARFilter, { x: canvas.width / 2, y: canvas.height / 3 });
          
          processedImage = canvas.toDataURL('image/jpeg', 0.9);
          finalizeCapturedPhoto(processedImage);
        };
        
        img.src = imageSrc;
      } else {
        finalizeCapturedPhoto(processedImage);
      }
    }
  }, [capturedPhotos, selectedARFilter, navigate, frame, totalPhotos]);

  const finalizeCapturedPhoto = (processedImage) => {
    setShowFlash(true);
    
    setTimeout(() => {
      setShowFlash(false);
      const newPhotos = [...capturedPhotos, processedImage];
      setCapturedPhotos(newPhotos);
      
      if (newPhotos.length < totalPhotos) {
        setCurrentPhotoIndex(newPhotos.length);
        setIsCapturing(false);
        toast.success(`Foto ${newPhotos.length}/${totalPhotos} berhasil!`);
      } else {
        toast.success('Semua foto berhasil diambil!');
        navigate('/filter', { state: { photos: newPhotos, frame } });
      }
    }, 300);
  };

  const handleRetake = () => {
    setCapturedPhotos([]);
    setCurrentPhotoIndex(0);
    setIsCapturing(false);
  };

  if (!frame) return null;

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      {showFlash && <div className="flash-effect" />}
      <canvas ref={canvasRef} className="hidden" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/frame-select')}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all"
            data-testid="back-to-frame-select-btn"
          >
            <ChevronLeft className="w-6 h-6 text-candy-bright-pink" />
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#592E39] font-['Fredoka']">
              Ambil Foto {currentPhotoIndex + 1}/{totalPhotos} 📸
            </h2>
            <div className="flex gap-2 justify-center mt-2">
              {Array.from({ length: totalPhotos }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx < capturedPhotos.length
                      ? 'bg-candy-bright-pink scale-110'
                      : idx === currentPhotoIndex
                      ? 'bg-candy-bright-pink/50 animate-pulse'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setShowARPanel(!showARPanel)}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all"
            data-testid="ar-filter-toggle"
          >
            <Sparkles className="w-6 h-6 text-candy-bright-pink" />
          </button>
        </div>

        <AnimatePresence>
          {showARPanel && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <GlassCard>
                <h3 className="text-lg font-bold text-[#592E39] mb-3 font-['Quicksand']">
                  AR Filters
                </h3>
                <div className="grid grid-cols-6 gap-2">
                  {arFilters.map((filter) => (
                    <motion.button
                      key={filter.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setSelectedARFilter(filter);
                        toast.success(`Filter ${filter.name} dipilih`);
                      }}
                      data-testid={`ar-filter-${filter.id}`}
                      className={`aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all ${
                        selectedARFilter.id === filter.id
                          ? 'bg-candy-bright-pink scale-110 shadow-lg'
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                    >
                      {filter.emoji}
                    </motion.button>
                  ))}
                </div>
                <p className="text-center text-sm text-[#8B5F6D] mt-3">
                  Filter saat ini: <span className="font-bold">{selectedARFilter.name}</span>
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <GlassCard>
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-black/10">
              {!isCameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 z-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4"></div>
                    <p className="text-[#592E39] font-medium">Menyiapkan kamera...</p>
                  </div>
                </div>
              )}
              
              <Webcam
                ref={webcamRef}
                audio={false}
                screenshotFormat="image/jpeg"
                className="webcam-mirror w-full h-full object-cover"
                videoConstraints={{
                  width: 1280,
                  height: 1600,
                  facingMode: 'user'
                }}
                onUserMedia={() => setIsCameraReady(true)}
                data-testid="webcam-feed"
              />
              
              {selectedARFilter.id !== 'none' && isCameraReady && (
                <div className="absolute top-4 left-4 glass-card px-4 py-2 rounded-full">
                  <p className="text-sm font-bold text-[#592E39]">
                    {selectedARFilter.emoji} {selectedARFilter.name}
                  </p>
                </div>
              )}
              
              <AnimatePresence>
                {countdown !== null && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 z-30"
                  >
                    <div className="countdown-number text-9xl font-black text-white" data-testid="countdown-timer">
                      {countdown}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 text-center space-y-4">
              <JellyButton
                onClick={startCountdown}
                disabled={countdown !== null || !isCameraReady || isCapturing}
                testId="capture-photo-btn"
                className="inline-flex items-center gap-3"
              >
                <Camera className="w-6 h-6" />
                {isCapturing ? 'Mengambil foto...' : `Ambil Foto ${currentPhotoIndex + 1}`}
              </JellyButton>
              
              {capturedPhotos.length > 0 && (
                <JellyButton
                  onClick={handleRetake}
                  variant="secondary"
                  testId="retake-all-btn"
                >
                  Foto Ulang Semua
                </JellyButton>
              )}
              
              <p className="text-sm text-[#8B5F6D] font-medium">
                Klik tombol untuk memulai countdown 3 detik
              </p>
            </div>
          </GlassCard>

          <div>
            <GlassCard>
              <h3 className="text-xl font-bold text-[#592E39] mb-4 font-['Quicksand'] text-center">
                Foto Terambil
              </h3>
              <div className="space-y-3">
                {Array.from({ length: totalPhotos }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all ${
                      capturedPhotos[idx]
                        ? 'border-candy-bright-pink'
                        : 'border-white/30 bg-white/10'
                    }`}
                    data-testid={`thumbnail-${idx}`}
                  >
                    {capturedPhotos[idx] ? (
                      <img
                        src={capturedPhotos[idx]}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-[#8B5F6D] text-sm font-medium">Foto {idx + 1}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptureWithAR;