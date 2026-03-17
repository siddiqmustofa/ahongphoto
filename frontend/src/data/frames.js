export const frameCategories = ['Semua', 'Polos', 'K-POP', 'Music', 'Anime'];

export const photoboothFrames = [
  {
    id: 1,
    name: 'Candy Hearts Strip',
    category: 'Polos',
    preview: 'https://images.unsplash.com/photo-1518133835878-5a93cc3f89e5?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="3"/></filter>
        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFB6C1;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#pinkGrad)"/>
      <path d="M70,60 Q70,30 90,30 Q110,30 110,50 Q110,30 130,30 Q150,30 150,60 Q150,110 110,145 Q70,110 70,60 Z" fill="white" opacity="0.6" filter="url(#glow)"/>
      <path d="M220,60 Q220,30 240,30 Q260,30 260,50 Q260,30 280,30 Q300,30 300,60 Q300,110 260,145 Q220,110 220,60 Z" fill="white" opacity="0.6" filter="url(#glow)"/>
      <text x="150" y="780" font-family="Fredoka" font-size="20" fill="white" text-anchor="middle" font-weight="bold">Sweet Memories</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 2,
    name: 'K-POP Star',
    category: 'K-POP',
    preview: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kpopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#E6E6FA;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#kpopGrad)"/>
      <circle cx="50" cy="50" r="15" fill="#FF69B4" opacity="0.7"/>
      <circle cx="250" cy="50" r="15" fill="#FF69B4" opacity="0.7"/>
      <path d="M130,40 L135,55 L150,60 L135,65 L130,80 L125,65 L110,60 L125,55 Z" fill="#FFD1DC" opacity="0.8"/>
      <path d="M170,40 L175,55 L190,60 L175,65 L170,80 L165,65 L150,60 L165,55 Z" fill="#FFD1DC" opacity="0.8"/>
      <text x="150" y="780" font-family="Fredoka" font-size="24" fill="#FF1493" text-anchor="middle" font-weight="bold">K-POP VIBES</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 3,
    name: 'Music Notes',
    category: 'Music',
    preview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="musicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#B0E0E6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#musicGrad)"/>
      <ellipse cx="60" cy="70" rx="12" ry="8" fill="#FF69B4"/>
      <rect x="70" y="30" width="3" height="40" fill="#FF69B4"/>
      <ellipse cx="240" cy="70" rx="12" ry="8" fill="#FFD1DC"/>
      <rect x="250" y="30" width="3" height="40" fill="#FFD1DC"/>
      <path d="M130,60 Q140,50 150,60 T170,60" stroke="#FF69B4" stroke-width="3" fill="none"/>
      <text x="150" y="780" font-family="Fredoka" font-size="22" fill="#FF1493" text-anchor="middle" font-weight="bold">MUSIC LOVE</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 4,
    name: 'Anime Kawaii',
    category: 'Anime',
    preview: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="animeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFF0F5;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFF0F5;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#animeGrad)"/>
      <circle cx="70" cy="60" r="20" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="65" cy="55" r="5" fill="white"/>
      <circle cx="230" cy="60" r="20" fill="#FFB6C1" opacity="0.6"/>
      <circle cx="225" cy="55" r="5" fill="white"/>
      <path d="M120,50 Q150,40 180,50" stroke="#FF69B4" stroke-width="2" fill="none"/>
      <text x="150" y="780" font-family="Fredoka" font-size="22" fill="#FF69B4" text-anchor="middle" font-weight="bold">KAWAII DESU</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 5,
    name: 'Bubble Pop Strip',
    category: 'Polos',
    preview: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bubble">
          <stop offset="0%" stop-color="white" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#FFD1DC" stop-opacity="0.4"/>
        </radialGradient>
        <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FFD1DC;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#E6E6FA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B0E0E6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#bubbleGrad)"/>
      <circle cx="60" cy="50" r="35" fill="url(#bubble)" stroke="white" stroke-width="2" opacity="0.7"/>
      <circle cx="240" cy="70" r="30" fill="url(#bubble)" stroke="white" stroke-width="2" opacity="0.7"/>
      <circle cx="50" cy="750" r="30" fill="url(#bubble)" stroke="white" stroke-width="2" opacity="0.7"/>
      <circle cx="250" cy="730" r="35" fill="url(#bubble)" stroke="white" stroke-width="2" opacity="0.7"/>
      <text x="150" y="780" font-family="Fredoka" font-size="20" fill="white" text-anchor="middle" font-weight="bold">Bubble Memories</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 6,
    name: 'K-POP Neon',
    category: 'K-POP',
    preview: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="neonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FF69B4;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#E6E6FA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#B0E0E6;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#neonGrad)" opacity="0.9"/>
      <rect x="20" y="20" width="260" height="760" rx="20" fill="none" stroke="white" stroke-width="4" opacity="0.8"/>
      <text x="150" y="780" font-family="Fredoka" font-size="24" fill="white" text-anchor="middle" font-weight="bold">IDOL VIBES</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 7,
    name: 'Music Festival',
    category: 'Music',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="festGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFE4E1;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#festGrad)"/>
      <rect x="40" y="30" width="15" height="15" fill="#FF69B4" opacity="0.7" transform="rotate(15 47 37)"/>
      <rect x="245" y="40" width="18" height="18" fill="#FFD1DC" opacity="0.7" transform="rotate(-20 254 49)"/>
      <circle cx="80" cy="60" r="8" fill="#B0E0E6" opacity="0.7"/>
      <circle cx="220" cy="70" r="10" fill="#FFB6C1" opacity="0.7"/>
      <text x="150" y="780" font-family="Fredoka" font-size="22" fill="#FF1493" text-anchor="middle" font-weight="bold">MUSIC FEST</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 8,
    name: 'Anime Pastel',
    category: 'Anime',
    preview: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pastelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#E6E6FA;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#FFD1DC;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="300" height="800" fill="url(#pastelGrad)"/>
      <path d="M50,40 L55,55 L70,60 L55,65 L50,80 L45,65 L30,60 L45,55 Z" fill="#FF69B4" opacity="0.7"/>
      <path d="M250,50 L258,68 L278,76 L258,84 L250,102 L242,84 L222,76 L242,68 Z" fill="#FFD1DC" opacity="0.7"/>
      <text x="150" y="780" font-family="Fredoka" font-size="20" fill="#FF69B4" text-anchor="middle" font-weight="bold">ANIME MAGIC</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  },
  {
    id: 9,
    name: 'Simple Sweet',
    category: 'Polos',
    preview: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=800&fit=crop',
    type: 'strip',
    slots: 3,
    layout: 'vertical',
    svg: `<svg viewBox="0 0 300 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="800" fill="#FFD1DC"/>
      <rect x="20" y="20" width="260" height="760" rx="15" fill="none" stroke="white" stroke-width="6"/>
      <rect x="30" y="30" width="240" height="740" rx="10" fill="none" stroke="#FF69B4" stroke-width="3" stroke-dasharray="10,5"/>
      <text x="150" y="780" font-family="Fredoka" font-size="20" fill="white" text-anchor="middle" font-weight="bold">Smile Always</text>
    </svg>`,
    printLayout: { spacing: 20, photoHeight: 240 }
  }
];