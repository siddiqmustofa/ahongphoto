import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = [];
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 100 + 50,
          left: Math.random() * 100,
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 15
        });
      }
      setBubbles(newBubbles);
    };
    generateBubbles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: '100%'
          }}
          animate={{
            y: [0, -window.innerHeight - 200],
            x: [0, Math.sin(bubble.id) * 100]
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;