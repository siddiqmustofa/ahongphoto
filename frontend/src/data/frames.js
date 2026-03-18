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

export const frameCategories = ['Semua', 'Minimalist', 'Retro', 'K-POP', 'Aesthetic', 'Cute', 'Neon'];

// Standard photo layout for 3 photos in vertical strip
const standardPhotoLayout = [
  { x: 30, y: 50, width: 540, height: 250 },
  { x: 30, y: 320, width: 540, height: 250 },
  { x: 30, y: 590, width: 540, height: 250 }
];

const compactPhotoLayout = [
  { x: 40, y: 60, width: 520, height: 240 },
  { x: 40, y: 320, width: 520, height: 240 },
  { x: 40, y: 580, width: 520, height: 240 }
];

export const photoboothFrames = [
  // ============ MINIMALIST FRAMES ============
  {
    id: 1,
    name: 'Clean White',
    category: 'Minimalist',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#FFFFFF',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#FFFFFF" width="200" height="300"/><rect x="10" y="10" width="180" height="280" fill="none" stroke="#E5E5E5" stroke-width="1"/><rect x="15" y="20" width="170" height="70" fill="#F5F5F5"/><rect x="15" y="100" width="170" height="70" fill="#F5F5F5"/><rect x="15" y="180" width="170" height="70" fill="#F5F5F5"/><text x="100" y="275" font-size="8" fill="#999" text-anchor="middle">@glowbox</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FFFFFF"/>
      <rect x="20" y="20" width="560" height="860" rx="8" fill="none" stroke="#E5E5E5" stroke-width="2"/>
      <text x="300" y="870" font-family="Arial, sans-serif" font-size="14" fill="#999999" text-anchor="middle">@glowbox</text>
    </svg>`
  },
  {
    id: 2,
    name: 'Soft Cream',
    category: 'Minimalist',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#FDF8F3',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#FDF8F3" width="200" height="300"/><rect x="15" y="20" width="170" height="70" fill="#F5EDE6"/><rect x="15" y="100" width="170" height="70" fill="#F5EDE6"/><rect x="15" y="180" width="170" height="70" fill="#F5EDE6"/><text x="100" y="275" font-size="7" fill="#C4B5A5" text-anchor="middle" font-style="italic">memories</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FDF8F3"/>
      <rect x="25" y="40" width="550" height="820" rx="4" fill="none" stroke="#E8DDD4" stroke-width="1"/>
      <text x="300" y="875" font-family="Georgia, serif" font-size="12" fill="#C4B5A5" text-anchor="middle" font-style="italic">memories</text>
    </svg>`
  },
  {
    id: 3,
    name: 'Black Elegant',
    category: 'Minimalist',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: compactPhotoLayout,
    bgColor: '#1A1A1A',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#1A1A1A" width="200" height="300"/><rect x="15" y="20" width="170" height="70" fill="#2A2A2A"/><rect x="15" y="100" width="170" height="70" fill="#2A2A2A"/><rect x="15" y="180" width="170" height="70" fill="#2A2A2A"/><text x="100" y="275" font-size="7" fill="#666" text-anchor="middle" letter-spacing="2">GLOWBOX</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#1A1A1A"/>
      <rect x="30" y="30" width="540" height="840" rx="0" fill="none" stroke="#333333" stroke-width="1"/>
      <text x="300" y="865" font-family="Helvetica, sans-serif" font-size="11" fill="#666666" text-anchor="middle" letter-spacing="3">GLOWBOX</text>
    </svg>`
  },

  // ============ RETRO FRAMES ============
  {
    id: 4,
    name: 'Vintage Film',
    category: 'Retro',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: [
      { x: 60, y: 50, width: 480, height: 240 },
      { x: 60, y: 320, width: 480, height: 240 },
      { x: 60, y: 590, width: 480, height: 240 }
    ],
    bgColor: '#2C2C2C',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#2C2C2C" width="200" height="300"/><rect x="5" y="10" width="8" height="12" fill="#1A1A1A" stroke="#444"/><rect x="5" y="30" width="8" height="12" fill="#1A1A1A" stroke="#444"/><rect x="5" y="50" width="8" height="12" fill="#1A1A1A" stroke="#444"/><rect x="187" y="10" width="8" height="12" fill="#1A1A1A" stroke="#444"/><rect x="187" y="30" width="8" height="12" fill="#1A1A1A" stroke="#444"/><rect x="187" y="50" width="8" height="12" fill="#1A1A1A" stroke="#444"/><rect x="20" y="20" width="160" height="70" fill="#3A3A3A"/><rect x="20" y="100" width="160" height="70" fill="#3A3A3A"/><rect x="20" y="180" width="160" height="70" fill="#3A3A3A"/><text x="100" y="280" font-size="6" fill="#666" text-anchor="middle">KODAK 400TX</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#2C2C2C"/>
      <!-- Film sprocket holes left -->
      ${[...Array(18)].map((_, i) => `<rect x="15" y="${25 + i * 50}" width="25" height="35" rx="3" fill="#1A1A1A" stroke="#444" stroke-width="1"/>`).join('')}
      <!-- Film sprocket holes right -->
      ${[...Array(18)].map((_, i) => `<rect x="560" y="${25 + i * 50}" width="25" height="35" rx="3" fill="#1A1A1A" stroke="#444" stroke-width="1"/>`).join('')}
      <text x="300" y="870" font-family="Courier New, monospace" font-size="10" fill="#666666" text-anchor="middle">KODAK 400TX</text>
    </svg>`
  },
  {
    id: 5,
    name: 'Polaroid Classic',
    category: 'Retro',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: [
      { x: 40, y: 40, width: 520, height: 230 },
      { x: 40, y: 300, width: 520, height: 230 },
      { x: 40, y: 560, width: 520, height: 230 }
    ],
    bgColor: '#FAFAFA',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#FAFAFA" width="200" height="300"/><rect x="10" y="10" width="180" height="260" fill="white" stroke="#EEE"/><rect x="15" y="15" width="170" height="65" fill="#E8E8E8"/><rect x="15" y="90" width="170" height="65" fill="#E8E8E8"/><rect x="15" y="165" width="170" height="65" fill="#E8E8E8"/><rect x="15" y="240" width="170" height="25" fill="#F5F5F5"/><text x="100" y="258" font-size="7" fill="#666" text-anchor="middle">best moments ♡</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FAFAFA"/>
      <rect x="20" y="20" width="560" height="860" fill="white" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))"/>
      <rect x="30" y="800" width="540" height="70" fill="#F5F5F5"/>
      <text x="300" y="845" font-family="Comic Sans MS, cursive" font-size="16" fill="#666" text-anchor="middle">best moments ♡</text>
    </svg>`
  },
  {
    id: 6,
    name: 'Y2K Vibes',
    category: 'Retro',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#FF99CC',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="y2k" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF99CC"/><stop offset="50%" stop-color="#99CCFF"/><stop offset="100%" stop-color="#FFCC99"/></linearGradient></defs><rect fill="url(#y2k)" width="200" height="300"/><rect x="15" y="25" width="170" height="70" fill="rgba(255,255,255,0.3)"/><rect x="15" y="105" width="170" height="70" fill="rgba(255,255,255,0.3)"/><rect x="15" y="185" width="170" height="70" fill="rgba(255,255,255,0.3)"/><text x="30" y="20" font-size="10" fill="white" opacity="0.8">2000s</text><text x="100" y="280" font-size="8" fill="white" text-anchor="middle">✧ Y2K ✧</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="y2k" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF99CC"/>
          <stop offset="50%" style="stop-color:#99CCFF"/>
          <stop offset="100%" style="stop-color:#FFCC99"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#y2k)"/>
      <text x="80" y="40" font-family="Impact, sans-serif" font-size="24" fill="white" opacity="0.8">2000s</text>
      <circle cx="550" cy="50" r="30" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
      <path d="M530,30 L570,70 M570,30 L530,70" stroke="white" stroke-width="2" opacity="0.6"/>
      <text x="300" y="870" font-family="Arial Black, sans-serif" font-size="14" fill="white" text-anchor="middle">✧ Y2K ✧</text>
    </svg>`
  },

  // ============ K-POP FRAMES ============
  {
    id: 7,
    name: 'Idol Photocard',
    category: 'K-POP',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: compactPhotoLayout,
    bgColor: '#F8F0FF',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="kp" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#F8F0FF"/><stop offset="100%" stop-color="#E8D5F5"/></linearGradient></defs><rect fill="url(#kp)" width="200" height="300"/><polygon points="25,15 28,25 38,27 28,29 25,39 22,29 12,27 22,25" fill="#FFD700"/><polygon points="175,20 177,28 186,30 177,32 175,40 173,32 164,30 173,28" fill="#FF69B4"/><rect x="15" y="25" width="170" height="70" fill="rgba(255,255,255,0.5)"/><rect x="15" y="105" width="170" height="70" fill="rgba(255,255,255,0.5)"/><rect x="15" y="185" width="170" height="70" fill="rgba(255,255,255,0.5)"/><text x="100" y="280" font-size="8" fill="#9B59B6" text-anchor="middle" font-weight="bold">IDOL MOMENT</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kpop1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#F8F0FF"/>
          <stop offset="100%" style="stop-color:#E8D5F5"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#kpop1)"/>
      <!-- Stars decoration -->
      <path d="M50,30 L55,45 L70,50 L55,55 L50,70 L45,55 L30,50 L45,45 Z" fill="#FFD700"/>
      <path d="M550,40 L555,52 L568,56 L555,60 L550,72 L545,60 L532,56 L545,52 Z" fill="#FF69B4"/>
      <path d="M100,850 L104,860 L115,863 L104,866 L100,876 L96,866 L85,863 L96,860 Z" fill="#87CEEB"/>
      <!-- Hearts -->
      <text x="530" y="850" font-size="20">💜</text>
      <text x="55" y="880" font-size="16">✨</text>
      <text x="300" y="875" font-family="Fredoka, cursive" font-size="16" fill="#9B59B6" text-anchor="middle" font-weight="bold">IDOL MOMENT</text>
    </svg>`
  },
  {
    id: 8,
    name: 'Concert Vibe',
    category: 'K-POP',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#1A0A2E',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="con" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#1A0A2E"/><stop offset="50%" stop-color="#2D1B4E"/><stop offset="100%" stop-color="#1A0A2E"/></linearGradient></defs><rect fill="url(#con)" width="200" height="300"/><polygon points="0,0 40,150 0,150" fill="#9B59B6" opacity="0.3"/><polygon points="200,0 160,150 200,150" fill="#E91E63" opacity="0.3"/><rect x="15" y="25" width="170" height="70" fill="rgba(255,255,255,0.15)"/><rect x="15" y="105" width="170" height="70" fill="rgba(255,255,255,0.15)"/><rect x="15" y="185" width="170" height="70" fill="rgba(255,255,255,0.15)"/><circle cx="30" cy="20" r="2" fill="white" opacity="0.8"/><circle cx="170" cy="30" r="1.5" fill="white" opacity="0.6"/><text x="100" y="280" font-size="8" fill="#E91E63" text-anchor="middle" letter-spacing="1">CONCERT</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="concert" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#1A0A2E"/>
          <stop offset="50%" style="stop-color:#2D1B4E"/>
          <stop offset="100%" style="stop-color:#1A0A2E"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#concert)"/>
      <!-- Light beams -->
      <polygon points="0,0 100,400 0,400" fill="#9B59B6" opacity="0.2"/>
      <polygon points="600,0 500,400 600,400" fill="#E91E63" opacity="0.2"/>
      <polygon points="300,0 200,300 400,300" fill="#00BCD4" opacity="0.15"/>
      <!-- Sparkles -->
      <circle cx="80" cy="60" r="3" fill="white" opacity="0.8"/>
      <circle cx="520" cy="80" r="2" fill="white" opacity="0.6"/>
      <circle cx="150" cy="850" r="2" fill="white" opacity="0.7"/>
      <circle cx="450" cy="830" r="3" fill="white" opacity="0.8"/>
      <text x="300" y="875" font-family="Arial Black, sans-serif" font-size="14" fill="#E91E63" text-anchor="middle" letter-spacing="2">CONCERT</text>
    </svg>`
  },
  {
    id: 9,
    name: 'Lightstick',
    category: 'K-POP',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#FFF5F8',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#FFF5F8" width="200" height="300"/><ellipse cx="30" cy="25" rx="12" ry="15" fill="#FF69B4" opacity="0.6"/><rect x="25" y="38" width="10" height="25" fill="#FFB6C1"/><ellipse cx="170" cy="20" rx="10" ry="12" fill="#9B59B6" opacity="0.6"/><rect x="166" y="30" width="8" height="20" fill="#DDA0DD"/><rect x="15" y="30" width="170" height="70" fill="rgba(255,182,193,0.2)"/><rect x="15" y="110" width="170" height="70" fill="rgba(255,182,193,0.2)"/><rect x="15" y="190" width="170" height="70" fill="rgba(255,182,193,0.2)"/><text x="100" y="285" font-size="8" fill="#FF69B4" text-anchor="middle" font-weight="bold">MY BIAS ♡</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FFF5F8"/>
      <!-- Lightstick decorations -->
      <ellipse cx="80" cy="60" rx="25" ry="30" fill="#FF69B4" opacity="0.6"/>
      <rect x="72" y="85" width="16" height="50" fill="#FFB6C1"/>
      <ellipse cx="520" cy="50" rx="20" ry="25" fill="#9B59B6" opacity="0.6"/>
      <rect x="513" y="70" width="14" height="45" fill="#DDA0DD"/>
      <!-- Hearts scattered -->
      <text x="150" y="35" font-size="14" opacity="0.5">♡</text>
      <text x="450" y="850" font-size="14" opacity="0.5">♡</text>
      <text x="550" y="870" font-size="12" opacity="0.5">♡</text>
      <text x="300" y="875" font-family="Quicksand, sans-serif" font-size="15" fill="#FF69B4" text-anchor="middle" font-weight="bold">MY BIAS ♡</text>
    </svg>`
  },

  // ============ AESTHETIC FRAMES ============
  {
    id: 10,
    name: 'Soft Pastel',
    category: 'Aesthetic',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#E8F0F2',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="pas" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#E8F0F2"/><stop offset="50%" stop-color="#F5E6E8"/><stop offset="100%" stop-color="#E8EAF0"/></linearGradient></defs><rect fill="url(#pas)" width="200" height="300"/><circle cx="30" cy="30" r="25" fill="#FFE4E1" opacity="0.5"/><circle cx="180" cy="50" r="20" fill="#E6E6FA" opacity="0.5"/><rect x="15" y="30" width="170" height="70" fill="rgba(255,255,255,0.4)"/><rect x="15" y="110" width="170" height="70" fill="rgba(255,255,255,0.4)"/><rect x="15" y="190" width="170" height="70" fill="rgba(255,255,255,0.4)"/><text x="100" y="285" font-size="7" fill="#A0A0A0" text-anchor="middle" font-style="italic">soft moments</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pastel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#E8F0F2"/>
          <stop offset="50%" style="stop-color:#F5E6E8"/>
          <stop offset="100%" style="stop-color:#E8EAF0"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#pastel)"/>
      <!-- Soft shapes -->
      <circle cx="80" cy="80" r="60" fill="#FFE4E1" opacity="0.4"/>
      <circle cx="550" cy="120" r="45" fill="#E6E6FA" opacity="0.4"/>
      <circle cx="100" cy="800" r="50" fill="#F0FFF0" opacity="0.4"/>
      <text x="300" y="870" font-family="Georgia, serif" font-size="13" fill="#A0A0A0" text-anchor="middle" font-style="italic">soft moments</text>
    </svg>`
  },
  {
    id: 11,
    name: 'Cloud Dream',
    category: 'Aesthetic',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#E6F3FF',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#B8D4E8"/><stop offset="100%" stop-color="#E6F3FF"/></linearGradient></defs><rect fill="url(#sky)" width="200" height="300"/><ellipse cx="40" cy="25" rx="25" ry="12" fill="white" opacity="0.8"/><ellipse cx="55" cy="22" rx="18" ry="10" fill="white" opacity="0.8"/><ellipse cx="160" cy="35" rx="22" ry="11" fill="white" opacity="0.7"/><rect x="15" y="30" width="170" height="70" fill="rgba(255,255,255,0.4)"/><rect x="15" y="110" width="170" height="70" fill="rgba(255,255,255,0.4)"/><rect x="15" y="190" width="170" height="70" fill="rgba(255,255,255,0.4)"/><text x="100" y="285" font-size="7" fill="#7EB6D9" text-anchor="middle">☁ dreamy ☁</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#B8D4E8"/>
          <stop offset="100%" style="stop-color:#E6F3FF"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#sky)"/>
      <!-- Clouds -->
      <ellipse cx="100" cy="50" rx="50" ry="25" fill="white" opacity="0.8"/>
      <ellipse cx="130" cy="45" rx="35" ry="20" fill="white" opacity="0.8"/>
      <ellipse cx="70" cy="55" rx="30" ry="18" fill="white" opacity="0.8"/>
      <ellipse cx="500" cy="70" rx="45" ry="22" fill="white" opacity="0.7"/>
      <ellipse cx="530" cy="65" rx="35" ry="20" fill="white" opacity="0.7"/>
      <ellipse cx="150" cy="830" rx="55" ry="25" fill="white" opacity="0.6"/>
      <ellipse cx="180" cy="825" rx="40" ry="20" fill="white" opacity="0.6"/>
      <text x="300" y="875" font-family="Quicksand, sans-serif" font-size="14" fill="#7EB6D9" text-anchor="middle">☁ dreamy ☁</text>
    </svg>`
  },
  {
    id: 12,
    name: 'Botanical',
    category: 'Aesthetic',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: compactPhotoLayout,
    bgColor: '#F5F7F0',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#F5F7F0" width="200" height="300"/><ellipse cx="25" cy="40" rx="5" ry="15" fill="#8FBC8F" transform="rotate(-30 25 40)" opacity="0.6"/><ellipse cx="35" cy="35" rx="4" ry="12" fill="#8FBC8F" transform="rotate(10 35 35)" opacity="0.5"/><ellipse cx="175" cy="30" rx="4" ry="13" fill="#8FBC8F" transform="rotate(20 175 30)" opacity="0.6"/><rect x="15" y="30" width="170" height="70" fill="rgba(143,188,143,0.15)"/><rect x="15" y="110" width="170" height="70" fill="rgba(143,188,143,0.15)"/><rect x="15" y="190" width="170" height="70" fill="rgba(143,188,143,0.15)"/><text x="100" y="285" font-size="7" fill="#6B8E6B" text-anchor="middle" font-style="italic">botanical</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#F5F7F0"/>
      <!-- Leaf decorations -->
      <ellipse cx="50" cy="100" rx="8" ry="25" fill="#8FBC8F" transform="rotate(-30 50 100)" opacity="0.6"/>
      <ellipse cx="65" cy="90" rx="6" ry="20" fill="#8FBC8F" transform="rotate(10 65 90)" opacity="0.5"/>
      <ellipse cx="550" cy="80" rx="7" ry="22" fill="#8FBC8F" transform="rotate(20 550 80)" opacity="0.6"/>
      <ellipse cx="535" cy="95" rx="5" ry="18" fill="#8FBC8F" transform="rotate(-15 535 95)" opacity="0.5"/>
      <!-- Bottom leaves -->
      <ellipse cx="80" cy="850" rx="10" ry="30" fill="#8FBC8F" transform="rotate(-20 80 850)" opacity="0.5"/>
      <ellipse cx="520" cy="840" rx="8" ry="25" fill="#8FBC8F" transform="rotate(25 520 840)" opacity="0.5"/>
      <text x="300" y="875" font-family="Georgia, serif" font-size="12" fill="#6B8E6B" text-anchor="middle" font-style="italic">botanical</text>
    </svg>`
  },

  // ============ CUTE FRAMES ============
  {
    id: 13,
    name: 'Bunny Love',
    category: 'Cute',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#FFF0F5',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#FFF0F5" width="200" height="300"/><ellipse cx="25" cy="20" rx="8" ry="20" fill="#FFB6C1"/><ellipse cx="25" cy="20" rx="4" ry="15" fill="#FFC0CB"/><ellipse cx="45" cy="25" rx="8" ry="18" fill="#FFB6C1" transform="rotate(15 45 25)"/><ellipse cx="175" cy="20" rx="8" ry="20" fill="#FFB6C1"/><ellipse cx="155" cy="25" rx="8" ry="18" fill="#FFB6C1" transform="rotate(-15 155 25)"/><rect x="15" y="30" width="170" height="70" fill="rgba(255,182,193,0.2)"/><rect x="15" y="110" width="170" height="70" fill="rgba(255,182,193,0.2)"/><rect x="15" y="190" width="170" height="70" fill="rgba(255,182,193,0.2)"/><text x="100" y="285" font-size="7" fill="#FF69B4" text-anchor="middle">bunny love ♡</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FFF0F5"/>
      <!-- Bunny ears top left -->
      <ellipse cx="60" cy="40" rx="15" ry="40" fill="#FFB6C1"/>
      <ellipse cx="60" cy="40" rx="8" ry="30" fill="#FFC0CB"/>
      <ellipse cx="100" cy="50" rx="15" ry="35" fill="#FFB6C1" transform="rotate(15 100 50)"/>
      <ellipse cx="100" cy="50" rx="8" ry="25" fill="#FFC0CB" transform="rotate(15 100 50)"/>
      <!-- Bunny ears top right -->
      <ellipse cx="540" cy="40" rx="15" ry="40" fill="#FFB6C1"/>
      <ellipse cx="540" cy="40" rx="8" ry="30" fill="#FFC0CB"/>
      <ellipse cx="500" cy="50" rx="15" ry="35" fill="#FFB6C1" transform="rotate(-15 500 50)"/>
      <ellipse cx="500" cy="50" rx="8" ry="25" fill="#FFC0CB" transform="rotate(-15 500 50)"/>
      <!-- Hearts -->
      <text x="300" y="35" font-size="20">🐰</text>
      <text x="50" y="870" font-size="14">♡</text>
      <text x="540" y="860" font-size="14">♡</text>
      <text x="300" y="875" font-family="Comic Sans MS, cursive" font-size="14" fill="#FF69B4" text-anchor="middle">bunny love ♡</text>
    </svg>`
  },
  {
    id: 14,
    name: 'Cherry Blossom',
    category: 'Cute',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#FFF5F5',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sak" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFE4E9"/><stop offset="100%" stop-color="#FFF5F5"/></linearGradient></defs><rect fill="url(#sak)" width="200" height="300"/><g fill="#FFB7C5" opacity="0.7"><circle cx="25" cy="25" r="4"/><circle cx="33" cy="20" r="4"/><circle cx="38" cy="28" r="4"/><circle cx="30" cy="35" r="4"/><circle cx="22" cy="32" r="4"/></g><g fill="#FFB7C5" opacity="0.6"><circle cx="175" cy="30" r="3.5"/><circle cx="182" cy="26" r="3.5"/><circle cx="186" cy="33" r="3.5"/></g><rect x="15" y="30" width="170" height="70" fill="rgba(255,183,197,0.2)"/><rect x="15" y="110" width="170" height="70" fill="rgba(255,183,197,0.2)"/><rect x="15" y="190" width="170" height="70" fill="rgba(255,183,197,0.2)"/><text x="100" y="285" font-size="7" fill="#E75480" text-anchor="middle">🌸 sakura 🌸</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sakura" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#FFE4E9"/>
          <stop offset="100%" style="stop-color:#FFF5F5"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#sakura)"/>
      <!-- Cherry blossoms -->
      <g fill="#FFB7C5" opacity="0.7">
        <circle cx="50" cy="50" r="8"/><circle cx="65" cy="40" r="8"/><circle cx="75" cy="55" r="8"/><circle cx="60" cy="68" r="8"/><circle cx="45" cy="62" r="8"/>
        <circle cx="60" cy="54" r="5" fill="#FFCDD8"/>
      </g>
      <g fill="#FFB7C5" opacity="0.6">
        <circle cx="530" cy="60" r="7"/><circle cx="543" cy="52" r="7"/><circle cx="551" cy="65" r="7"/><circle cx="538" cy="76" r="7"/><circle cx="523" cy="70" r="7"/>
        <circle cx="538" cy="64" r="4" fill="#FFCDD8"/>
      </g>
      <g fill="#FFB7C5" opacity="0.5">
        <circle cx="100" cy="840" r="6"/><circle cx="111" cy="833" r="6"/><circle cx="118" cy="844" r="6"/><circle cx="107" cy="853" r="6"/><circle cx="94" cy="848" r="6"/>
      </g>
      <text x="300" y="875" font-family="Quicksand, sans-serif" font-size="14" fill="#E75480" text-anchor="middle">🌸 sakura 🌸</text>
    </svg>`
  },
  {
    id: 15,
    name: 'Strawberry Milk',
    category: 'Cute',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#FFEBEE',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#FFEBEE" width="200" height="300"/><g transform="translate(20,15)"><ellipse cx="10" cy="12" rx="10" ry="12" fill="#FF6B6B"/><ellipse cx="10" cy="5" rx="7" ry="4" fill="#4CAF50"/><circle cx="7" cy="12" r="1.5" fill="#FFEB3B"/><circle cx="13" cy="15" r="1.5" fill="#FFEB3B"/></g><g transform="translate(165,20)"><ellipse cx="8" cy="10" rx="8" ry="10" fill="#FF6B6B"/><ellipse cx="8" cy="4" rx="5" ry="3" fill="#4CAF50"/></g><rect x="15" y="30" width="170" height="70" fill="rgba(255,107,107,0.1)"/><rect x="15" y="110" width="170" height="70" fill="rgba(255,107,107,0.1)"/><rect x="15" y="190" width="170" height="70" fill="rgba(255,107,107,0.1)"/><text x="100" y="285" font-size="6" fill="#FF6B6B" text-anchor="middle">🍓 strawberry milk 🥛</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#FFEBEE"/>
      <!-- Strawberry decorations -->
      <g transform="translate(50, 30)">
        <ellipse cx="15" cy="20" rx="15" ry="18" fill="#FF6B6B"/>
        <ellipse cx="15" cy="8" rx="10" ry="6" fill="#4CAF50"/>
        <circle cx="10" cy="18" r="2" fill="#FFEB3B"/><circle cx="20" cy="22" r="2" fill="#FFEB3B"/><circle cx="12" cy="28" r="2" fill="#FFEB3B"/>
      </g>
      <g transform="translate(520, 40)">
        <ellipse cx="15" cy="20" rx="12" ry="15" fill="#FF6B6B"/>
        <ellipse cx="15" cy="8" rx="8" ry="5" fill="#4CAF50"/>
        <circle cx="10" cy="18" r="1.5" fill="#FFEB3B"/><circle cx="18" cy="22" r="1.5" fill="#FFEB3B"/>
      </g>
      <g transform="translate(80, 830)">
        <ellipse cx="12" cy="15" rx="12" ry="14" fill="#FF6B6B" opacity="0.7"/>
        <ellipse cx="12" cy="6" rx="8" ry="5" fill="#4CAF50" opacity="0.7"/>
      </g>
      <text x="300" y="875" font-family="Comic Sans MS, cursive" font-size="14" fill="#FF6B6B" text-anchor="middle">🍓 strawberry milk 🥛</text>
    </svg>`
  },

  // ============ NEON FRAMES ============
  {
    id: 16,
    name: 'Neon Pink',
    category: 'Neon',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: compactPhotoLayout,
    bgColor: '#0D0D0D',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><rect fill="#0D0D0D" width="200" height="300"/><rect x="10" y="10" width="180" height="280" rx="5" fill="none" stroke="#FF10F0" stroke-width="2"/><rect x="15" y="15" width="170" height="270" rx="4" fill="none" stroke="#FF10F0" stroke-width="0.5" opacity="0.5"/><rect x="20" y="25" width="160" height="70" fill="rgba(255,16,240,0.1)"/><rect x="20" y="105" width="160" height="70" fill="rgba(255,16,240,0.1)"/><rect x="20" y="185" width="160" height="70" fill="rgba(255,16,240,0.1)"/><text x="100" y="280" font-size="9" fill="#FF10F0" text-anchor="middle" font-weight="bold">NEON</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="900" fill="#0D0D0D"/>
      <!-- Neon glow effect -->
      <rect x="25" y="25" width="550" height="850" rx="10" fill="none" stroke="#FF10F0" stroke-width="3" filter="url(#glow)"/>
      <rect x="30" y="30" width="540" height="840" rx="8" fill="none" stroke="#FF10F0" stroke-width="1" opacity="0.5"/>
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <text x="300" y="870" font-family="Arial Black, sans-serif" font-size="16" fill="#FF10F0" text-anchor="middle" filter="url(#glow)">NEON</text>
    </svg>`
  },
  {
    id: 17,
    name: 'Cyberpunk',
    category: 'Neon',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: compactPhotoLayout,
    bgColor: '#0A0A15',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cyb" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0A0A15"/><stop offset="100%" stop-color="#1A1A2E"/></linearGradient></defs><rect fill="url(#cyb)" width="200" height="300"/><line x1="0" y1="50" x2="50" y2="0" stroke="#00FFFF" stroke-width="0.5" opacity="0.4"/><line x1="0" y1="100" x2="100" y2="0" stroke="#FF00FF" stroke-width="0.5" opacity="0.4"/><path d="M10,10 L40,10 L40,12 L12,12 L12,40 L10,40 Z" fill="#00FFFF"/><path d="M190,10 L160,10 L160,12 L188,12 L188,40 L190,40 Z" fill="#FF00FF"/><rect x="20" y="25" width="160" height="70" fill="rgba(0,255,255,0.1)"/><rect x="20" y="105" width="160" height="70" fill="rgba(255,0,255,0.1)"/><rect x="20" y="185" width="160" height="70" fill="rgba(0,255,255,0.1)"/><text x="100" y="280" font-size="7" fill="#00FFFF" text-anchor="middle">CYBER_2026</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0A0A15"/>
          <stop offset="100%" style="stop-color:#1A1A2E"/>
        </linearGradient>
        <filter id="neonGlow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="600" height="900" fill="url(#cyber)"/>
      <!-- Cyber lines -->
      <line x1="0" y1="100" x2="100" y2="0" stroke="#00FFFF" stroke-width="1" opacity="0.3"/>
      <line x1="0" y1="200" x2="200" y2="0" stroke="#FF00FF" stroke-width="1" opacity="0.3"/>
      <line x1="500" y1="900" x2="600" y2="800" stroke="#00FFFF" stroke-width="1" opacity="0.3"/>
      <line x1="400" y1="900" x2="600" y2="700" stroke="#FF00FF" stroke-width="1" opacity="0.3"/>
      <!-- Corner accents -->
      <path d="M20,20 L80,20 L80,25 L25,25 L25,80 L20,80 Z" fill="#00FFFF" filter="url(#neonGlow)"/>
      <path d="M580,20 L520,20 L520,25 L575,25 L575,80 L580,80 Z" fill="#FF00FF" filter="url(#neonGlow)"/>
      <path d="M20,880 L80,880 L80,875 L25,875 L25,820 L20,820 Z" fill="#FF00FF" filter="url(#neonGlow)"/>
      <path d="M580,880 L520,880 L520,875 L575,875 L575,820 L580,820 Z" fill="#00FFFF" filter="url(#neonGlow)"/>
      <text x="300" y="870" font-family="Orbitron, sans-serif" font-size="12" fill="#00FFFF" text-anchor="middle" filter="url(#neonGlow)">CYBER_2026</text>
    </svg>`
  },
  {
    id: 18,
    name: 'Holographic',
    category: 'Neon',
    slots: 3,
    layout: 'vertical-strip',
    photoLayout: standardPhotoLayout,
    bgColor: '#1A1A2E',
    preview: 'data:image/svg+xml,' + encodeURIComponent('<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="hol" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#FF6B6B"/><stop offset="25%" stop-color="#FFE66D"/><stop offset="50%" stop-color="#4ECDC4"/><stop offset="75%" stop-color="#A78BFA"/><stop offset="100%" stop-color="#FF6B6B"/></linearGradient></defs><rect fill="#1A1A2E" width="200" height="300"/><rect x="8" y="8" width="184" height="284" rx="8" fill="none" stroke="url(#hol)" stroke-width="3"/><rect x="15" y="15" width="170" height="270" rx="6" fill="none" stroke="url(#hol)" stroke-width="0.5" opacity="0.5"/><circle cx="40" cy="25" r="2" fill="white" opacity="0.8"/><circle cx="165" cy="35" r="1.5" fill="white" opacity="0.6"/><rect x="20" y="25" width="160" height="70" fill="rgba(255,255,255,0.1)"/><rect x="20" y="105" width="160" height="70" fill="rgba(255,255,255,0.1)"/><rect x="20" y="185" width="160" height="70" fill="rgba(255,255,255,0.1)"/><text x="100" y="280" font-size="7" fill="url(#hol)" text-anchor="middle" font-weight="bold">✧ HOLOGRAPHIC ✧</text></svg>'),
    svg: `<svg viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="holo" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#FF6B6B"/>
          <stop offset="25%" style="stop-color:#FFE66D"/>
          <stop offset="50%" style="stop-color:#4ECDC4"/>
          <stop offset="75%" style="stop-color:#A78BFA"/>
          <stop offset="100%" style="stop-color:#FF6B6B"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="#1A1A2E"/>
      <rect x="15" y="15" width="570" height="870" rx="15" fill="none" stroke="url(#holo)" stroke-width="4"/>
      <rect x="25" y="25" width="550" height="850" rx="12" fill="none" stroke="url(#holo)" stroke-width="1" opacity="0.5"/>
      <!-- Sparkles -->
      <circle cx="100" cy="50" r="3" fill="white" opacity="0.8"/>
      <circle cx="500" cy="80" r="2" fill="white" opacity="0.6"/>
      <circle cx="80" cy="850" r="2" fill="white" opacity="0.7"/>
      <circle cx="520" cy="830" r="3" fill="white" opacity="0.8"/>
      <text x="300" y="872" font-family="Arial, sans-serif" font-size="13" fill="url(#holo)" text-anchor="middle" font-weight="bold">✧ HOLOGRAPHIC ✧</text>
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
