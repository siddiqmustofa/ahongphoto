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
    if (!photos || photos.length === 0 || !frame) {
      console.error('Missing photos or frame');
      toast.error('Data tidak lengkap. Kembali ke awal.');
      setTimeout(() => navigate('/frame-select'), 2000);
      return;
    }
    console.log('Filter page: Got', photos.length, 'photos');
  }, [photos, frame, navigate]);

  useEffect(() => {
    if (photos && photos.length > 0 && frame) {
      console.log('Applying filter:', selectedFilter.name);
      applyFilterAndFrame();
    }
  }, [selectedFilter]);

  useEffect(() => {
    if (photos && photos.length > 0 && frame && !processedImage) {
      console.log('Initial render');
      applyFilterAndFrame();
    }
  }, [photos, frame]);

  const applyFilterAndFrame = async () => {
    if (isProcessing) {
      console.log('Already processing, skipping...');
      return;
    }
    
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas not found');
      return;
    }

    if (!photos || photos.length === 0) {
      console.error('No photos to process');
      return;
    }

    setIsProcessing(true);
    console.log('Starting to process', photos.length, 'photos...');

    try {
      const ctx = canvas.getContext('2d');
      const stripWidth = 300;
      const stripHeight = 800;
      
      canvas.width = stripWidth;
      canvas.height = stripHeight;

      // Fill background
      ctx.fillStyle = '#FFD1DC';
      ctx.fillRect(0, 0, stripWidth, stripHeight);

      const spacing = 20;
      const availableHeight = stripHeight - (spacing * (photos.length + 1));
      const photoHeight = Math.floor(availableHeight / photos.length);
      
      console.log('Strip dimensions:', stripWidth, 'x', stripHeight);
      console.log('Each photo height:', photoHeight);

      // Load all images
      const loadImage = (src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            console.log('Image loaded successfully');
            resolve(img);
          };
          img.onerror = (err) => {
            console.error('Image load error:', err);
            reject(err);
          };
          img.src = src;
        });
      };

      const imagePromises = photos.map((photo, idx) => {
        console.log(`Loading photo ${idx + 1}...`);
        return loadImage(photo);
      });

      const images = await Promise.all(imagePromises);
      console.log('All images loaded!');
      
      // Draw each photo
      images.forEach((img, index) => {
        const yPos = spacing + (index * (photoHeight + spacing));
        
        console.log(`Drawing photo ${index + 1} at Y:${yPos}`);
        
        ctx.save();
        ctx.filter = selectedFilter.filter;
        
        // Calculate scaling to cover the area
        const scale = Math.max(stripWidth / img.width, photoHeight / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const xOffset = (stripWidth - scaledWidth) / 2;
        const yOffset = (photoHeight - scaledHeight) / 2;
        
        ctx.drawImage(
          img, 
          xOffset, 
          yPos + yOffset, 
          scaledWidth, 
          scaledHeight
        );
        
        ctx.restore();
      });

      console.log('All photos drawn');

      // Apply frame overlay
      ctx.filter = 'none';
      
      if (frame && frame.svg) {
        console.log('Applying frame overlay...');
        
        const svgBlob = new Blob([frame.svg], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        
        const svgImg = new Image();
        
        const svgLoadPromise = new Promise((resolve, reject) => {
          svgImg.onload = () => {
            console.log('Frame SVG loaded');
            ctx.drawImage(svgImg, 0, 0, stripWidth, stripHeight);
            URL.revokeObjectURL(svgUrl);
            resolve();
          };
          
          svgImg.onerror = (err) => {
            console.error('SVG load error:', err);
            URL.revokeObjectURL(svgUrl);
            reject(err);
          };
          
          svgImg.src = svgUrl;
        });
        
        await svgLoadPromise;
      }

      // Convert to data URL
      const finalImage = canvas.toDataURL('image/jpeg', 0.95);
      console.log('Final image created, length:', finalImage.length);
      
      setProcessedImage(finalImage);
      setIsProcessing(false);
      toast.success('Strip foto berhasil dibuat!');
      
    } catch (error) {
      console.error('Error processing images:', error);
      setIsProcessing(false);
      toast.error('Gagal memproses foto. Coba lagi.');
    }
  };

  const handleContinue = () => {
    if (!processedImage) {
      toast.error('Tunggu proses selesai...');
      return;
    }
    console.log('Navigating to preview with processed image');
    navigate('/preview', { 
      state: { 
        photo: processedImage, 
        frame,
        photos 
      } 
    });
  };

  if (!photos || photos.length === 0 || !frame) {
    return (
      <div className="candy-gradient-bg min-h-screen flex items-center justify-center">
        <GlassCard className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4"></div>
          <p className="text-[#592E39] font-medium">Memuat...</p>
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
            <div className="aspect-[3/8] rounded-2xl overflow-hidden bg-gradient-to-b from-candy-soft-pink to-candy-lavender relative">
              <canvas ref={canvasRef} className="hidden" />
              
              {isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-candy-bright-pink border-t-transparent mx-auto mb-4"></div>
                    <p className="text-[#592E39] font-medium">Memproses strip...</p>
                  </div>
                </div>
              )}
              
              {processedImage && !isProcessing ? (
                <img
                  src={processedImage}
                  alt="Preview Strip"
                  className="w-full h-full object-cover"
                  data-testid="filtered-preview"
                />
              ) : !isProcessing && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[#8B5F6D] font-medium">Generating preview...</p>
                </div>
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
                Foto yang Diambil ({photos.length})
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {photos.map((photo, idx) => (
                  <div key={idx} className="aspect-square rounded-lg overflow-hidden border-2 border-candy-bright-pink/30">
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

            <div className="text-center">
              <JellyButton
                onClick={handleContinue}
                disabled={!processedImage || isProcessing}
                testId="continue-to-preview-btn"
                className="w-full"
              >
                {isProcessing ? 'Memproses...' : 'Lanjut ke Preview →'}
              </JellyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
