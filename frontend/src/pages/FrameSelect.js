import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft } from 'lucide-react';
import { photoboothFrames, frameCategories } from '../data/frames';

const FrameSelect = () => {
  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const filteredFrames = selectedCategory === 'Semua' 
    ? photoboothFrames 
    : photoboothFrames.filter(frame => frame.category === selectedCategory);

  const handleContinue = () => {
    if (selectedFrame) {
      navigate('/capture', { state: { frame: selectedFrame } });
    }
  };

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all"
            data-testid="back-to-home-btn"
          >
            <ChevronLeft className="w-6 h-6 text-candy-bright-pink" />
          </button>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#592E39] font-['Fredoka']">
            Pilih Frame Strip 🎀
          </h2>
          
          <div className="w-12"></div>
        </div>

        <div className="mb-6">
          <GlassCard className="p-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {frameCategories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`category-${category.toLowerCase()}`}
                  className={`px-6 py-3 rounded-full font-bold text-lg transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-b from-[#FF85C0] to-[#FF69B4] text-white shadow-lg scale-105'
                      : 'bg-white/50 text-[#592E39] hover:bg-white/70'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="grid md:grid-cols-[2fr,1fr] gap-6">
          <GlassCard>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filteredFrames.map((frame) => (
                <motion.div
                  key={frame.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedFrame(frame)}
                  data-testid={`frame-option-${frame.id}`}
                  className={`cursor-pointer group relative aspect-[3/8] rounded-2xl overflow-hidden border-4 transition-all duration-300 shadow-md hover:shadow-xl bg-white/20 ${
                    selectedFrame?.id === frame.id
                      ? 'border-white scale-105 shadow-[0_0_0_4px_#FF69B4]'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={frame.preview}
                    alt={frame.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    dangerouslySetInnerHTML={{ __html: frame.svg }}
                  />
                  {selectedFrame?.id === frame.id && (
                    <div className="absolute top-2 right-2 bg-candy-bright-pink text-white rounded-full p-2">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p className="text-white font-bold text-xs text-center">{frame.name}</p>
                    <p className="text-white/80 text-[10px] text-center">{frame.slots} Foto</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          <div className="space-y-4">
            {selectedFrame && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <GlassCard>
                  <h3 className="text-xl font-bold text-[#592E39] mb-3 font-['Quicksand'] text-center">
                    Preview
                  </h3>
                  <div className="aspect-[3/8] rounded-2xl overflow-hidden bg-white/20 relative">
                    <img
                      src={selectedFrame.preview}
                      alt={selectedFrame.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0 pointer-events-none"
                      dangerouslySetInnerHTML={{ __html: selectedFrame.svg }}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-[#592E39] font-bold text-lg">{selectedFrame.name}</p>
                    <p className="text-[#8B5F6D] text-sm">{selectedFrame.category} • {selectedFrame.slots} Foto</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}

            <div className="text-center">
              <JellyButton
                onClick={handleContinue}
                disabled={!selectedFrame}
                testId="continue-to-capture-btn"
                className="w-full"
              >
                Mulai Sesi Foto ✨
              </JellyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameSelect;