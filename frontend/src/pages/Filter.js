import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft } from 'lucide-react';

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
  
  const photos = location.state?.photos;
  const frame = location.state?.frame;

  useEffect(() => {
    if (!photos || !frame) {
      navigate('/frame-select');
      return;
    }
    console.log('Filter page loaded with photos:', photos.length);
  }, [photos, frame, navigate]);

  useEffect(() => {
    if (photos && frame && photos.length > 0) {
      applyFilterAndFrame();
    }
  }, [selectedFilter, photos, frame]);

  const applyFilterAndFrame = async () => {
    if (isProcessing) return;
    
    const canvas = canvasRef.current;
    if (!canvas || !photos || photos.length === 0) {
      console.error('Canvas or photos not available');
      return;
    }

    setIsProcessing(true);
    console.log('Processing', photos.length, 'photos with filter:', selectedFilter.name);

    try {
      const ctx = canvas.getContext('2d');
      canvas.width = 300;
      canvas.height = 800;

      ctx.fillStyle = '#FFD1DC';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const spacing = 20;
      const totalSpacing = spacing * (photos.length + 1);
      const photoHeight = (canvas.height - totalSpacing) / photos.length;
      
      const imagePromises = photos.map((photo) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = (err) => {
            console.error('Image load error:', err);
            reject(err);
          };
          img.src = photo;
        });
      });

      const images = await Promise.all(imagePromises);
      console.log('All images loaded successfully');
      
      images.forEach((img, index) => {
        const yPos = spacing + index * (photoHeight + spacing);
        
        ctx.save();
        ctx.filter = selectedFilter.filter;
        ctx.drawImage(img, 0, yPos, canvas.width, photoHeight);
        ctx.restore();
      });

      ctx.filter = 'none';
      
      if (frame.svg) {
        const svgImg = new Image();
        const svgBlob = new Blob([frame.svg], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        svgImg.onload = () => {
          ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height);
          const finalImage = canvas.toDataURL('image/jpeg', 0.9);
          setProcessedImage(finalImage);
          URL.revokeObjectURL(svgUrl);
          setIsProcessing(false);
          console.log('Image processed successfully');
        };
        
        svgImg.onerror = (err) => {
          console.error('SVG load error:', err);
          const finalImage = canvas.toDataURL('image/jpeg', 0.9);
          setProcessedImage(finalImage);
          URL.revokeObjectURL(svgUrl);
          setIsProcessing(false);
        };
        
        svgImg.src = svgUrl;
      } else {
        const finalImage = canvas.toDataURL('image/jpeg', 0.9);
        setProcessedImage(finalImage);
        setIsProcessing(false);
        console.log('Image processed (no frame SVG)');
      }
    } catch (error) {
      console.error('Error processing images:', error);
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    if (processedImage) {
      navigate('/preview', { state: { photo: processedImage, frame, photos } });
    }
  };

  if (!photos || !frame) return null;

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/capture', { state: { frame } })}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all"
            data-testid="back-to-capture-btn"
          >
            <ChevronLeft className="w-6 h-6 text-candy-bright-pink" />
          </button>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#592E39] font-['Fredoka']">
            Pilih Filter ✨
          </h2>
          
          <div className="w-12"></div>
        </div>

        <div className="grid md:grid-cols-[1fr,2fr] gap-6 mb-6">
          <GlassCard>
            <h3 className="text-lg font-bold text-[#592E39] mb-3 font-['Quicksand'] text-center">
              Preview Strip
            </h3>
            <div className="aspect-[3/8] rounded-2xl overflow-hidden bg-black/5 relative">
              <canvas ref={canvasRef} className="hidden" />
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4"></div>
                    <p className="text-[#592E39] font-medium">Memproses...</p>
                  </div>
                </div>
              )}
              {processedImage && !isProcessing && (
                <img
                  src={processedImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  data-testid="filtered-preview"
                />
              )}
            </div>
          </GlassCard>

          <div>
            <GlassCard className="mb-6">
              <h3 className="text-xl font-bold text-[#592E39] mb-4 font-['Quicksand']">
                Pilih Filter
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFilter(filter)}
                    data-testid={`filter-option-${filter.id}`}
                    disabled={isProcessing}
                    className={`p-4 rounded-2xl transition-all ${
                      selectedFilter.id === filter.id
                        ? 'bg-candy-bright-pink text-white shadow-lg scale-105'
                        : 'bg-white/40 text-[#592E39] hover:bg-white/60'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="text-sm font-bold">{filter.name}</div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="mb-6">
              <h3 className="text-lg font-bold text-[#592E39] mb-3 font-['Quicksand']">
                Foto yang Diambil
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border-2 border-candy-bright-pink/30">
                    <img src={photo} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="text-center">
              <JellyButton
                onClick={handleContinue}
                disabled={!processedImage || isProcessing}
                testId="continue-to-preview-btn"
                className="w-full"
              >
                Lanjut ke Preview →
              </JellyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
