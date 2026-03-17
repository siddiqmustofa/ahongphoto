import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

const filters = [
  { id: 'none', name: 'Original', filter: 'none' },
  { id: 'brightness', name: 'Bright', filter: 'brightness(1.2) contrast(1.1)' },
  { id: 'vintage', name: 'Vintage', filter: 'sepia(0.5) contrast(1.2)' },
  { id: 'candy', name: 'Candy', filter: 'saturate(1.5) brightness(1.1) hue-rotate(10deg)' },
  { id: 'dreamy', name: 'Dreamy', filter: 'brightness(1.15) contrast(0.9) saturate(1.3)' },
  { id: 'cool', name: 'Cool', filter: 'saturate(1.2) hue-rotate(-10deg) brightness(1.05)' }
];

const Filter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const photos = location.state?.photos || [];
  const frame = location.state?.frame;

  useEffect(() => {
    console.log('FILTER PAGE: Photos:', photos.length, 'Frame:', frame?.name);
    
    if (!photos || photos.length === 0 || !frame) {
      console.error('Missing data');
      toast.error('Data foto tidak ditemukan!');
      setTimeout(() => navigate('/frame-select'), 2000);
      return;
    }
    
    setTimeout(() => applyFilterAndFrame(), 500);
  }, []);

  useEffect(() => {
    if (selectedFilter && photos.length > 0 && !isProcessing) {
      applyFilterAndFrame();
    }
  }, [selectedFilter.id]);

  const applyFilterAndFrame = async () => {
    if (isProcessing || !photos || photos.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsProcessing(true);
    console.log('Processing', photos.length, 'photos...');

    try {
      const ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 800;

      ctx.fillStyle = '#FFD1DC';
      ctx.fillRect(0, 0, 300, 800);

      const photoHeight = Math.floor((800 - 80) / 3);
      
      const imagePromises = photos.map((photoData) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = photoData;
        });
      });

      const images = await Promise.all(imagePromises);
      console.log('Images loaded:', images.length);
      
      images.forEach((img, index) => {
        const yPos = 20 + (index * (photoHeight + 20));
        ctx.save();
        ctx.filter = selectedFilter.filter;
        const scale = Math.max(300 / img.width, photoHeight / img.height);
        const sw = img.width * scale;
        const sh = img.height * scale;
        const x = (300 - sw) / 2;
        const y = (photoHeight - sh) / 2;
        ctx.drawImage(img, x, yPos + y, sw, sh);
        ctx.restore();
      });

      ctx.filter = 'none';
      
      if (frame?.svg) {
        const svgBlob = new Blob([frame.svg], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        await new Promise((resolve) => {
          const svgImg = new Image();
          svgImg.onload = () => {
            ctx.drawImage(svgImg, 0, 0, 300, 800);
            URL.revokeObjectURL(svgUrl);
            resolve();
          };
          svgImg.onerror = () => {
            URL.revokeObjectURL(svgUrl);
            resolve();
          };
          svgImg.src = svgUrl;
        });
      }

      const result = canvas.toDataURL('image/jpeg', 0.95);
      console.log('Strip created:', result.length, 'bytes');
      
      setProcessedImage(result);
      setIsProcessing(false);
      toast.success('Strip foto berhasil!');
      
    } catch (error) {
      console.error('Processing error:', error);
      setIsProcessing(false);
      toast.error('Gagal memproses foto');
    }
  };

  const handleContinue = () => {
    if (!processedImage) {
      toast.error('Tunggu proses selesai...');
      return;
    }
    
    console.log('Navigating to preview with image:', processedImage.length);
    navigate('/preview', { 
      state: { photo: processedImage, frame, photos },
      replace: false
    });
  };

  if (!photos || photos.length === 0 || !frame) {
    return (
      <div className="candy-gradient-bg min-h-screen flex items-center justify-center">
        <GlassCard className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4" />
          <p className="text-gray-700 font-medium">Memuat...</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/capture', { state: { frame } })}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-candy-bright-pink" />
          </button>
          
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Pilih Filter
          </h2>
          
          <div className="w-12" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard>
            <h3 className="text-lg font-bold text-gray-800 mb-3 text-center">
              Preview Strip
            </h3>
            <div className="aspect-[3/8] rounded-2xl overflow-hidden bg-gradient-to-b from-pink-200 to-purple-200 relative">
              <canvas ref={canvasRef} className="hidden" />
              
              {isProcessing ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent mx-auto mb-4" />
                    <p className="text-gray-700 font-medium">Memproses...</p>
                  </div>
                </div>
              ) : processedImage ? (
                <img
                  src={processedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  data-testid="filtered-preview"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600">Loading...</p>
                </div>
              )}
            </div>
          </GlassCard>

          <div>
            <GlassCard className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Pilih Filter
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFilter(filter)}
                    disabled={isProcessing}
                    className={`p-4 rounded-2xl transition-all ${
                      selectedFilter.id === filter.id
                        ? 'bg-pink-500 text-white shadow-lg'
                        : 'bg-white/40 text-gray-800 hover:bg-white/60'
                    } ${isProcessing ? 'opacity-50' : ''}`}
                  >
                    <div className="text-sm font-bold">{filter.name}</div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Foto ({photos.length})
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border-2 border-pink-300">
                    <img 
                      src={photo} 
                      alt={`Foto ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                      style={{ transform: 'scaleX(-1)' }}
                    />
                  </div>
                ))}
              </div>
            </GlassCard>

            <JellyButton
              onClick={handleContinue}
              disabled={!processedImage || isProcessing}
              testId="continue-to-preview-btn"
              className="w-full"
            >
              {isProcessing ? 'Memproses...' : 'Lanjut ke Preview'}
            </JellyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
