import { motion } from 'framer-motion';

const JellyButton = ({ children, onClick, className = '', variant = 'primary', disabled = false, testId }) => {
  const variants = {
    primary: 'jelly-button text-xl',
    secondary: 'bg-white/50 hover:bg-white/80 text-candy-accent-hover font-bold rounded-full px-8 py-3 border-2 border-candy-bright-pink/30 backdrop-blur-md transition-all shadow-sm hover:shadow-md'
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
      className={`${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  );
};

export default JellyButton;