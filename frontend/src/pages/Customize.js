import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import FloatingBubbles from '../components/FloatingBubbles';
import GlassCard from '../components/GlassCard';
import JellyButton from '../components/JellyButton';
import { ChevronLeft, Type, Sticker } from 'lucide-react';

const textPositions = [
  { id: 'top', name: 'Atas' },
  { id: 'center', name: 'Tengah' },
  { id: 'bottom', name: 'Bawah' }
];

const textColors = [
  { id: '#FFFFFF', name: 'Putih' },
  { id: '#FF69B4', name: 'Pink' },
  { id: '#FFD700', name: 'Emas' },
  { id: '#000000', name: 'Hitam' },
  { id: '#FF1493', name: 'Pink Tua' }
];

const stickers = [
  { id: 1, emoji: '❤️', name: 'Heart' },
  { id: 2, emoji: '✨', name: 'Sparkle' },
  { id: 3, emoji: '💖', name: 'Pink Heart' },
  { id: 4, emoji: '🎀', name: 'Ribbon' },
  { id: 5, emoji: '🎉', name: 'Party' },
  { id: 6, emoji: '⭐', name: 'Star' },
  { id: 7, emoji: '🌈', name: 'Rainbow' },
  { id: 8, emoji: '💞', name: 'Hearts' },
  { id: 9, emoji: '💕', name: 'Two Hearts' },
  { id: 10, emoji: '🌟', name: 'Glow' }
];

const Customize = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [photo, setPhoto] = useState(location.state?.photo);
  const [frame, setFrame] = useState(location.state?.frame);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(32);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [textPosition, setTextPosition] = useState('bottom');
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [customizedPhoto, setCustomizedPhoto] = useState(null);

  useEffect(() => {
    if (!photo || !frame) {
      navigate('/frame-select');
    }
  }, [photo, frame, navigate]);

  useEffect(() => {
    if (photo) {
      applyCustomization();
    }
  }, [photo, text, fontSize, textColor, textPosition, selectedStickers]);

  const applyCustomization = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 300;
      canvas.height = 800;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (text) {
        ctx.font = `bold ${fontSize}px Fredoka, Arial`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.strokeStyle = textColor === '#FFFFFF' ? '#000000' : '#FFFFFF';
        ctx.lineWidth = 3;

        let yPos;
        if (textPosition === 'top') {
          yPos = 60;
        } else if (textPosition === 'center') {
          yPos = canvas.height / 2;
        } else {
          yPos = canvas.height - 40;
        }

        ctx.strokeText(text, canvas.width / 2, yPos);
        ctx.fillText(text, canvas.width / 2, yPos);
      }

      selectedStickers.forEach((sticker, idx) => {
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        const xPos = 50 + (idx * 60);
        const yPos = 100;
        ctx.fillText(sticker.emoji, xPos, yPos);
      });

      setCustomizedPhoto(canvas.toDataURL('image/jpeg', 0.9));
    };

    img.src = photo;
  };

  const handleStickerToggle = (sticker) => {
    if (selectedStickers.find(s => s.id === sticker.id)) {
      setSelectedStickers(selectedStickers.filter(s => s.id !== sticker.id));
    } else if (selectedStickers.length < 5) {
      setSelectedStickers([...selectedStickers, sticker]);
    } else {
      toast.error('Maksimal 5 sticker!');
    }
  };

  const handleContinue = () => {
    if (customizedPhoto) {
      navigate('/preview', { state: { photo: customizedPhoto, frame } });
    }
  };

  if (!photo || !frame) return null;

  return (
    <div className="candy-gradient-bg min-h-screen py-8 px-4">
      <FloatingBubbles />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/filter', { state: { photos: location.state?.photos, frame } })}
            className="p-3 rounded-full bg-white/40 hover:bg-white/80 transition-all"
            data-testid="back-to-filter-btn"
          >
            <ChevronLeft className="w-6 h-6 text-candy-bright-pink" />
          </button>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#592E39] font-['Fredoka']">
            Customize Foto 🎨
          </h2>
          
          <div className="w-12"></div>
        </div>

        <div className="grid md:grid-cols-[1fr,2fr] gap-6">
          <GlassCard>
            <h3 className="text-lg font-bold text-[#592E39] mb-3 font-['Quicksand'] text-center">
              Preview
            </h3>
            <div className="aspect-[3/8] rounded-2xl overflow-hidden bg-black/5">
              <canvas ref={canvasRef} className="hidden" />
              {customizedPhoto && (
                <img
                  src={customizedPhoto}
                  alt="Customized"
                  className="w-full h-full object-cover"
                  data-testid="customized-preview"
                />
              )}
            </div>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-candy-bright-pink" />
                <h3 className="text-xl font-bold text-[#592E39] font-['Quicksand']">
                  Text Overlay
                </h3>
              </div>
              
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Masukkan text..."
                maxLength={30}
                className="w-full bg-white/70 border-2 border-white/50 focus:border-candy-bright-pink rounded-2xl px-6 py-3 text-candy-accent-hover placeholder-[#FFB6C1] focus:ring-4 focus:ring-candy-bright-pink/20 outline-none transition-all font-medium mb-3"
                data-testid="text-input"
              />

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-sm font-bold text-[#592E39] block mb-2">Ukuran Text</label>
                  <input
                    type="range"
                    min="16"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-center text-[#8B5F6D] text-sm mt-1">{fontSize}px</p>
                </div>
                <div>
                  <label className="text-sm font-bold text-[#592E39] block mb-2">Posisi</label>
                  <select
                    value={textPosition}
                    onChange={(e) => setTextPosition(e.target.value)}
                    className="w-full bg-white/70 border-2 border-white/50 rounded-xl px-4 py-2 text-[#592E39] font-medium"
                  >
                    {textPositions.map(pos => (
                      <option key={pos.id} value={pos.id}>{pos.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-[#592E39] block mb-2">Warna Text</label>
                <div className="flex gap-2">
                  {textColors.map(color => (
                    <button
                      key={color.id}
                      onClick={() => setTextColor(color.id)}
                      className={`w-10 h-10 rounded-full border-4 transition-all ${
                        textColor === color.id ? 'border-candy-bright-pink scale-110' : 'border-white/50'
                      }`}
                      style={{ backgroundColor: color.id }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Sticker className="w-5 h-5 text-candy-bright-pink" />
                <h3 className="text-xl font-bold text-[#592E39] font-['Quicksand']">
                  Stickers (max 5)
                </h3>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {stickers.map(sticker => (
                  <motion.button
                    key={sticker.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleStickerToggle(sticker)}
                    className={`aspect-square rounded-2xl text-3xl flex items-center justify-center transition-all ${
                      selectedStickers.find(s => s.id === sticker.id)
                        ? 'bg-candy-bright-pink scale-110'
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    data-testid={`sticker-${sticker.id}`}
                  >
                    {sticker.emoji}
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

export default Customize;