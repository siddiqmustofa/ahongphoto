// 4R Paper Size: 4x6 inch = 10.2 x 15.2 cm = 1200 x 1800 pixels at 300 DPI
// For web display: 600 x 900 pixels (50% scale)

export const PAPER_4R = {
  width: 600,
  height: 900,
  dpi: 150,
  printWidth: 1200,
  printHeight: 1800,
  printDpi: 300
};

export const frameCategories = ['Semua', 'Polos', 'K-POP', 'Music', 'Anime', 'Cute'];

export const photoboothFrames = [
  {
    id: 1,
    name: 'Classic Strip',
    category: 'Polos',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 30, width: 540, height: 240 },
      { x: 30, y: 300, width: 540, height: 240 },
      { x: 30, y: 570, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFB6C1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#grad1)"/>
      <text x="300" y="860" font-family="Fredoka" font-size="24" fill="white" text-anchor="middle" font-weight="bold">GlowBox Memories</text>
    </svg>`
  },
  {
    id: 2,
    name: 'K-POP Star',
    category: 'K-POP',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 40, width: 540, height: 240 },
      { x: 30, y: 310, width: 540, height: 240 },
      { x: 30, y: 580, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kpop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#E6E6FA;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#kpop)"/>
      <path d="M50,20 L60,35 L75,40 L60,45 L50,60 L40,45 L25,40 L40,35 Z" fill="#FF69B4"/>
      <path d="M550,20 L560,35 L575,40 L560,45 L550,60 L540,45 L525,40 L540,35 Z" fill="#FFD1DC"/>
      <text x="300" y="870" font-family="Fredoka" font-size="28" fill="#FF1493" text-anchor="middle" font-weight="bold">K-POP VIBES</text>
    </svg>`
  },
  {
    id: 3,
    name: 'Music Lover',
    category: 'Music',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 50, width: 540, height: 240 },
      { x: 30, y: 320, width: 540, height: 240 },
      { x: 30, y: 590, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="music" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#B0E0E6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#music)"/>
      <ellipse cx="60" cy="30" rx="15" ry="10" fill="#FF69B4"/>
      <rect x="73" y="10" width="4" height="20" fill="#FF69B4"/>
      <text x="300" y="870" font-family="Fredoka" font-size="26" fill="#FF1493" text-anchor="middle" font-weight="bold">MUSIC LOVE</text>
    </svg>`
  },
  {
    id: 4,
    name: 'Anime Kawaii',
    category: 'Anime',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 40, width: 540, height: 240 },
      { x: 30, y: 310, width: 540, height: 240 },
      { x: 30, y: 580, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="anime" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFF0F5;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFF0F5;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#anime)"/>
      <circle cx="80" cy="40" r="25" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="70" cy="35" r="6" fill="white"/>
      <text x="300" y="870" font-family="Fredoka" font-size="26" fill="#FF69B4" text-anchor="middle" font-weight="bold">KAWAII DESU</text>
    </svg>`
  },
  {
    id: 5,
    name: 'Bubble Pop',
    category: 'Cute',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 50, width: 540, height: 240 },
      { x: 30, y: 320, width: 540, height: 240 },
      { x: 30, y: 590, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bubble">
          <stop offset="0%" stop-color="white" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FFD1DC" stop-opacity="0.4"/>
        </radialGradient>
      </defs>
      <rect width="600" height="900" fill="#FFD1DC"/>
      <circle cx="80" cy="50" r="40" fill="url(#bubble)" stroke="white" stroke-width="3" opacity="0.7"/>
      <circle cx="520" cy="70" r="35" fill="url(#bubble)" stroke="white" stroke-width="3" opacity="0.7"/>
      <text x="300" y="870" font-family="Fredoka" font-size="24" fill="white" text-anchor="middle" font-weight="bold">Bubble Memories</text>
    </svg>`
  },
  {
    id: 6,
    name: 'Heart Frame',
    category: 'Cute',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 60, width: 540, height: 240 },
      { x: 30, y: 330, width: 540, height: 240 },
      { x: 30, y: 600, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FFE4E1"/>
      <path d="M80,40 Q80,20 95,20 Q110,20 110,40 Q110,20 125,20 Q140,20 140,40 Q140,80 110,110 Q80,80 80,40 Z" fill="#FFD1DC" opacity="0.8"/>
      <path d="M460,40 Q460,20 475,20 Q490,20 490,40 Q490,20 505,20 Q520,20 520,40 Q520,80 490,110 Q460,80 460,40 Z" fill="#FF69B4" opacity="0.8"/>
      <text x="300" y="870" font-family="Fredoka" font-size="24" fill="#FF69B4" text-anchor="middle" font-weight="bold">Sweet Memories</text>
    </svg>`
  },
  {
    id: 7,
    name: 'Gradient Dream',
    category: 'Polos',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 40, width: 540, height: 240 },
      { x: 30, y: 310, width: 540, height: 240 },
      { x: 30, y: 580, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="dream" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#E6E6FA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B0E0E6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#dream)"/>
      <text x="300" y="870" font-family="Fredoka" font-size="24" fill="white" text-anchor="middle" font-weight="bold">Dream Vibes</text>
    </svg>`
  },
  {
    id: 8,
    name: 'Sparkle Star',
    category: 'Cute',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 30, y: 50, width: 540, height: 240 },
      { x: 30, y: 320, width: 540, height: 240 },
      { x: 30, y: 590, width: 540, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FFF0F5"/>
      <path d="M70,30 L75,45 L90,50 L75,55 L70,70 L65,55 L50,50 L65,45 Z" fill="#FF69B4"/>
      <path d="M530,30 L538,48 L558,56 L538,64 L530,82 L522,64 L502,56 L522,48 Z" fill="#FFD1DC"/>
      <text x="300" y="870" font-family="Fredoka" font-size="24" fill="#FF69B4" text-anchor="middle" font-weight="bold">Sparkle Time</text>
    </svg>`
  },
  {
    id: 9,
    name: 'Minimal Chic',
    category: 'Polos',
    slots: 3,
    layout: 'vertical-strip',
    preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=900&fit=crop',
    photoLayout: [
      { x: 40, y: 50, width: 520, height: 240 },
      { x: 40, y: 320, width: 520, height: 240 },
      { x: 40, y: 590, width: 520, height: 240 }
    ],
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FFD1DC"/>
      <rect x="20" y="20" width="560" height="860" rx="15" fill="none" stroke="white" stroke-width="8"/>
      <text x="300" y="870" font-family="Fredoka" font-size="24" fill="white" text-anchor="middle" font-weight="bold">Minimal Style</text>
    </svg>`
  }
];

export const get4RPrintLayout = (frame) => {
  return {
    width: PAPER_4R.printWidth,
    height: PAPER_4R.printHeight,
    dpi: PAPER_4R.printDpi,
    photos: frame.photoLayout.map(layout => ({
      x: layout.x * 2,
      y: layout.y * 2,
      width: layout.width * 2,
      height: layout.height * 2
    }))
  };
};