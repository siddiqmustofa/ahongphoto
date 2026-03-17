// AR Filter effects
export const arFilters = [
  {
    id: 'none',
    name: 'Original',
    emoji: '😊'
  },
  {
    id: 'glasses',
    name: 'Glasses',
    emoji: '🕶️',
    overlay: '🕶️'
  },
  {
    id: 'heart',
    name: 'Hearts',
    emoji: '😍',
    overlay: '❤️'
  },
  {
    id: 'cat',
    name: 'Cat Ears',
    emoji: '🐱',
    overlay: '🐱'
  },
  {
    id: 'crown',
    name: 'Crown',
    emoji: '👑',
    overlay: '👑'
  },
  {
    id: 'star',
    name: 'Star Eyes',
    emoji: '🤩',
    overlay: '⭐'
  }
];

export const applyAROverlay = (canvas, filter, facePosition) => {
  if (!filter || !filter.overlay) return;
  
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  
  // Simple overlay - place emoji at face position
  ctx.font = '80px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  const x = facePosition?.x || width / 2;
  const y = facePosition?.y || height / 3;
  
  ctx.fillText(filter.overlay, x, y);
};