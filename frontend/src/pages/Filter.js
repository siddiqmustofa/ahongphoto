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
  
  const photos = location.state?.photos;
  const frame = location.state?.frame;

  useEffect(() => {
    if (!photos || !frame) {
      navigate('/frame-select');
    }
  }, [photos, frame, navigate]);

  useEffect(() => {
    if (photos && frame) {
      applyFilterAndFrame();
    }
  }, [selectedFilter, photos, frame]);

  const applyFilterAndFrame = async () => {
    const canvas = canvasRef.current;
    if (!canvas || !photos || photos.length === 0) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 800;

    const photoHeight = (canvas.height - (photos.length + 1) * 20) / photos.length;
    
    const imagePromises = photos.map((photo) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = photo;
      });
    });

    const images = await Promise.all(imagePromises);
    
    images.forEach((img, index) => {
      const yPos = 20 + index * (photoHeight + 20);
      
      ctx.filter = selectedFilter.filter;
      ctx.drawImage(img, 0, yPos, canvas.width, photoHeight);
    });

    ctx.filter = 'none';
    const svgImg = new Image();
    const svgBlob = new Blob([frame.svg], { type: 'image/svg+xml' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    svgImg.onload = () => {
      ctx.drawImage(svgImg, 0, 0, canvas.width, canvas.height);
      setProcessedImage(canvas.toDataURL('image/jpeg', 0.9));
      URL.revokeObjectURL(svgUrl);
    };
    
    svgImg.src = svgUrl;
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
      
      <div className="relative z-10 max-w-4xl mx-auto">
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
            <div className="aspect-[3/8] rounded-2xl overflow-hidden bg-black/5">
              <canvas ref={canvasRef} className="hidden" />
              {processedImage && (
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
                    className={`p-4 rounded-2xl transition-all ${
                      selectedFilter.id === filter.id
                        ? 'bg-candy-bright-pink text-white shadow-lg scale-105'
                        : 'bg-white/40 text-[#592E39] hover:bg-white/60'
                    }`}
                  >
                    <div className="text-sm font-bold">{filter.name}</div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>

            <div className="text-center">
              <JellyButton
                onClick={handleContinue}
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