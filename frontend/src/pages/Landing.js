import { motion } from 'framer-motion';
import FloatingBubbles from '../components/FloatingBubbles';
import JellyButton from '../components/JellyButton';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="candy-gradient-bg flex items-center justify-center">
      <FloatingBubbles />
      
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1 className="logo-3d text-7xl md:text-9xl font-extrabold text-candy-bright-pink mb-6">
            GlowBox
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-[#592E39] mb-4 font-['Quicksand']">
            Self Photobooth ✨
          </p>
          <p className="text-lg md:text-xl text-[#8B5F6D] mb-12 font-medium">
            Ambil foto cantik dengan frame & filter candy pop!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <JellyButton 
            onClick={() => navigate('/frame-select')}
            testId="start-photobooth-btn"
          >
            Mulai Photobooth 📸
          </JellyButton>
          
          <motion.div className="mt-4">
            <JellyButton 
              onClick={() => navigate('/gallery')}
              variant="secondary"
              testId="view-gallery-btn"
            >
              Lihat Gallery 🖼️
            </JellyButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <div className="inline-block glass-card rounded-full px-8 py-3">
            <p className="text-sm font-medium text-[#592E39]">
              🎀 Sweet • Fun • Shareable 🎀
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;