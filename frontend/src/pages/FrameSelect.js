import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft } from 'lucide-react';
import { photoboothFrames, frameCategories } from '../data/frames';
import { toast } from 'sonner';

const FrameSelect = () => {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredFrames = selectedCategory === 'Semua' 
    ? photoboothFrames 
    : photoboothFrames.filter(frame => frame.category === selectedCategory);

  const handleFrameClick = (frame) => {
    console.log('Frame selected:', frame.name);
    setSelectedFrame(frame);
    toast.success(`Frame ${frame.name} dipilih!`);
  };

  const handleContinue = () => {
    if (!selectedFrame) {
      toast.error('Pilih frame terlebih dahulu!');
      return;
    }
    
    console.log('Navigating to capture with frame:', selectedFrame.name);
    navigate('/capture', { state: { frame: selectedFrame } });
  };

  return (
    <div className="candy-gradient-bg h-screen flex flex-col py-4 px-4 overflow-hidden">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-7xl mx-auto flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all shadow-md"
            data-testid="back-to-home-btn"
          >
            <ChevronLeft className="w-6 h-6 text-pink-600" />
          </button>
          
          <h2 className="text-xl md:text-3xl font-bold text-gray-800" style={{ fontFamily: 'Fredoka, cursive' }}>
            Pilih Frame Strip 🎀
          </h2>
          <p className="text-xs text-gray-600 mt-1">Ukuran 4R (10.2 x 15.2 cm)</p>
          
          <div className="w-12" />
        </div>

        {/* Category Filter */}
        <div className="mb-4 flex-shrink-0">
          <GlassCard className="p-3">
            <div className="flex flex-wrap gap-2 justify-center">
              {frameCategories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory(category);
                    toast.info(`Kategori: ${category}`);
                  }}
                  data-testid={`category-${category.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all shadow-md ${
                    selectedCategory === category
                      ? 'bg-gradient-to-b from-pink-400 to-pink-600 text-white scale-105'
                      : 'bg-white/60 text-gray-800 hover:bg-white/80'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[2fr,1fr] gap-4 flex-1 min-h-0 overflow-hidden">
          {/* Frames Grid */}
          <GlassCard className="overflow-hidden flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex-shrink-0" style={{ fontFamily: 'Quicksand, sans-serif' }}>
              Pilih Frame ({filteredFrames.length} tersedia)
            </h3>
            
            {filteredFrames.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 text-lg">Tidak ada frame di kategori ini</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto flex-1 pr-2">
                {filteredFrames.map((frame) => (
                  <motion.div
                    key={frame.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleFrameClick(frame)}
                    data-testid={`frame-option-${frame.id}`}
                    className={`cursor-pointer relative aspect-[2/3] rounded-xl overflow-hidden border-3 transition-all shadow-lg hover:shadow-xl ${
                      selectedFrame?.id === frame.id
                        ? 'border-pink-500 ring-4 ring-pink-300'
                        : 'border-white/50 hover:border-white'
                    }`}
                    style={{ backgroundColor: frame.bgColor || '#FFD1DC' }}
                  >
                    {frame.preview ? (
                      <img
                        src={frame.preview}
                        alt={frame.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: frame.svg }}
                      />
                    )}
                    
                    {selectedFrame?.id === frame.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 bg-pink-500 text-white rounded-full p-1.5 shadow-lg"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white font-bold text-xs text-center">{frame.name}</p>
                      <p className="text-white/80 text-[10px] text-center">{frame.slots} Foto</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Preview & Action Panel */}
          <div className="flex flex-col gap-3 overflow-hidden">
            {selectedFrame ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 min-h-0"
              >
                <GlassCard className="h-full flex flex-col">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 text-center flex-shrink-0" style={{ fontFamily: 'Quicksand, sans-serif' }}>
                    Preview
                  </h3>
                  
                  <div 
                    className="aspect-[2/3] rounded-xl overflow-hidden shadow-xl relative mb-3 max-h-[40vh]"
                    style={{ backgroundColor: selectedFrame.bgColor || '#FFD1DC' }}
                  >
                    {selectedFrame.preview ? (
                      <img
                        src={selectedFrame.preview}
                        alt={selectedFrame.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full"
                        dangerouslySetInnerHTML={{ __html: selectedFrame.svg }}
                      />
                    )}
                  </div>
                  
                  <div className="text-center mb-3 flex-shrink-0">
                    <p className="text-gray-800 font-bold">{selectedFrame.name}</p>
                    <p className="text-gray-600 text-xs">{selectedFrame.category}</p>
                    <p className="text-pink-600 text-xs font-medium">{selectedFrame.slots} Foto Strip</p>
                  </div>

                  <JellyButton
                    onClick={handleContinue}
                    testId="continue-to-capture-btn"
                    className="w-full"
                  >
                    Mulai Sesi Foto ✨
                  </JellyButton>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="flex-1">
                <div className="text-center py-8">
                  <p className="text-4xl mb-3">👆</p>
                  <p className="text-gray-800 font-bold mb-1">Pilih Frame</p>
                  <p className="text-gray-600 text-xs">
                    Pilih salah satu frame di sebelah kiri
                  </p>
                </div>
              </GlassCard>
            )}

            {/* Info Card */}
            <GlassCard className="flex-shrink-0">
              <h4 className="font-bold text-gray-800 mb-1 text-sm">ℹ️ Info</h4>
              <ul className="text-xs text-gray-700 space-y-0.5">
                <li>✓ {filteredFrames.length} frame tersedia</li>
                <li>✓ 3 foto per strip</li>
                <li>✓ AR filters available</li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameSelect;
