// Cosmetic unlockables for shop & customization

export const TERMINAL_THEMES = [
  {
    id: 'matrix',
    name: 'Matrix Retro Verde',
    className: 'theme-matrix',
    price: 0,
    isDefault: true,
    previewColor: '#10b981',
    description: 'Estética clásica hacker verde fosforito.'
  },
  {
    id: 'amber',
    name: 'Ámbar Vintage 1980',
    className: 'theme-amber',
    price: 100,
    isDefault: false,
    previewColor: '#f59e0b',
    description: 'Consola retro color ámbar de los primeros ordenadores.'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neón',
    className: 'theme-cyberpunk',
    price: 200,
    isDefault: false,
    previewColor: '#ec4899',
    description: 'Vibrante contraste magenta y violeta neón.'
  },
  {
    id: 'dracula',
    name: 'Drácula Místico',
    className: 'theme-dracula',
    price: 250,
    isDefault: false,
    previewColor: '#7aa2f7',
    description: 'Modo oscuro elegante azul y violeta pastel.'
  },
  {
    id: 'classic',
    name: 'Moderna Oscura',
    className: 'theme-classic',
    price: 50,
    isDefault: false,
    previewColor: '#f4f4f5',
    description: 'Consola minimalista blanco sobre gris oscuro.'
  }
];

export const MASCOT_AVATARS = [
  {
    id: 'owl-default',
    name: 'Byte el Búho Cyber',
    price: 0,
    icon: '🦉',
    description: 'Tu leal compañero con gafas retro.'
  },
  {
    id: 'bot-pixel',
    name: 'Robo-Bit 3000',
    price: 150,
    icon: '🤖',
    description: 'Asistente robótico de circuitos de neón.'
  },
  {
    id: 'cat-hacker',
    name: 'Gato Nyan CLI',
    price: 250,
    icon: '🐱',
    description: 'Gato espacial de alta velocidad.'
  }
];
