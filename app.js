'use strict';

/* ============================================================
   GWM Venezuela Quiz — application logic
   Static, zero-build, kiosk-first.
   ============================================================ */

// ============ DATA: QUESTIONS ============
const questions = [
  {
    id: 'place',
    emoji: 'globe',
    text: '¿Dónde te gustaría pasar tus vacaciones ideales?',
    hint: 'Elige el lugar que más te atrae',
    singleCol: false,
    options: [
      { icon: 'waves', label: 'La playa', desc: 'Sol, arena y mar', value: 'beach' },
      { icon: 'mountain', label: 'La montaña', desc: 'Aventura y naturaleza', value: 'mountain' },
      { icon: 'building-2', label: 'La ciudad', desc: 'Cultura y entretenimiento', value: 'city' },
      { icon: 'trees', label: 'El campo', desc: 'Paz y tranquilidad', value: 'countryside' },
      { icon: 'anchor', label: 'Costa tranquila', desc: 'Relax junto al mar', value: 'coast' },
      { icon: 'droplets', label: 'El lago', desc: 'Agua dulce y calma', value: 'lake' }
    ]
  },
  {
    id: 'vehicleType',
    emoji: 'car',
    text: '¿Qué tipo de vehículo te imagina mejor contigo?',
    hint: 'Elige el estilo que más te guste',
    singleCol: false,
    options: [
      { icon: 'car', label: 'SUV', desc: 'Espacio y presencia', value: 'vt_suv' },
      { icon: 'truck', label: 'Pickup', desc: 'Fuerza y versatilidad', value: 'vt_pickup' },
      { icon: 'wind', label: 'Coupé', desc: 'Estilo y actitud', value: 'vt_coupe' },
      { icon: 'building-2', label: 'Compacto', desc: 'Ágil para la ciudad', value: 'vt_compact' },
      { icon: 'zap', label: 'Híbrido', desc: 'Eficiencia y tecnología', value: 'vt_hybrid' }
    ]
  },
  {
    id: 'time',
    emoji: 'clock',
    text: '¿En qué momento prefieres viajar?',
    hint: 'Tu horario ideal de aventura',
    singleCol: false,
    options: [
      { icon: 'sunrise', label: 'Amanecer', desc: 'Saludos al sol naciente', value: 'sunrise' },
      { icon: 'sun', label: 'Mediodía', desc: 'Pleno día de acción', value: 'noon' },
      { icon: 'sunset', label: 'Atardecer', desc: 'Horas doradas', value: 'sunset' },
      { icon: 'moon', label: 'Noche', desc: 'Luces y estrellas', value: 'night' },
      { icon: 'calendar', label: 'Sin horario', desc: 'Cuando quiera', value: 'flexible' },
      { icon: 'cloud-sun', label: 'Madrugada', desc: 'Antes de que despierte todo', value: 'dawn' }
    ]
  },
  {
    id: 'terrain',
    emoji: 'navigation',
    text: '¿Por dónde vas a manejar la mayor parte del tiempo?',
    hint: 'Tu ruta típica al volante',
    singleCol: false,
    options: [
      { icon: 'building-2', label: 'Ciudad', desc: 'Calles y tránsito', value: 'terrain_city' },
      { icon: 'navigation', label: 'Autopista', desc: 'Largas distancias', value: 'terrain_highway' },
      { icon: 'mountain', label: 'Montaña', desc: 'Caminos de tierra', value: 'terrain_mountain' },
      { icon: 'trees', label: 'Todo terreno', desc: 'Sin caminos', value: 'terrain_offroad' },
      { icon: 'route', label: 'Mixto', desc: 'Un poco de todo', value: 'terrain_mixed' }
    ]
  },
  {
    id: 'music',
    emoji: 'music',
    text: '¿Qué música suena en tu auto?',
    hint: 'Tu playlist favorita al conducir',
    singleCol: false,
    options: [
      { icon: 'guitar', label: 'Rock / Pop', desc: 'Energía pura', value: 'rock' },
      { icon: 'mic', label: 'Urbano', desc: 'Reggaetón y trap', value: 'urban' },
      { icon: 'radio', label: 'Electrónica', desc: 'Beats y ritmo', value: 'electronic' },
      { icon: 'headphones', label: 'Clásica / Lo-fi', desc: 'Calma y concentración', value: 'chill' },
      { icon: 'disc', label: 'Salsa / Merengue', desc: 'Ritmo caribeño', value: 'salsa' },
      { icon: 'podcast', label: 'Podcast / Silencio', desc: 'Paz mental', value: 'silence' },
      { icon: 'music-2', label: 'Indie / Alternativo', desc: 'Sonido propio', value: 'indie' }
    ]
  },
  {
    id: 'company',
    emoji: 'users',
    text: '¿Con quién viajas más?',
    hint: 'Tus compañeros de ruta habituales',
    singleCol: false,
    options: [
      { icon: 'user', label: 'Solo/a', desc: 'Libertad total', value: 'solo' },
      { icon: 'heart', label: 'En pareja', desc: 'A dos velocidades', value: 'couple' },
      { icon: 'users', label: 'En familia', desc: 'Todos a bordo', value: 'family' },
      { icon: 'party-popper', label: 'Con amigos', desc: 'Aventura en grupo', value: 'friends' },
      { icon: 'dog', label: 'Con mascotas', desc: 'Ellos también viajan', value: 'pets' },
      { icon: 'briefcase', label: 'Con colegas', desc: 'Equipo de trabajo', value: 'coworkers' }
    ]
  },
  {
    id: 'activity',
    emoji: 'target',
    text: '¿Qué actividad no puede faltar en tu fin de semana?',
    hint: 'Tu plan ideal de descanso',
    singleCol: false,
    options: [
      { icon: 'dumbbell', label: 'Deporte', desc: 'Entrenar y moverse', value: 'sport' },
      { icon: 'clapperboard', label: 'Entretenimiento', desc: 'Cine, series, eventos', value: 'entertainment' },
      { icon: 'armchair', label: 'Relax total', desc: 'Descansar y recargar', value: 'relax' },
      { icon: 'wrench', label: 'Proyectos', desc: 'Crear y construir', value: 'projects' },
      { icon: 'tent', label: 'Naturaleza', desc: 'Camping y senderismo', value: 'nature' },
      { icon: 'shopping-bag', label: 'Compras / Salir', desc: 'Social y compras', value: 'shopping' },
      { icon: 'map', label: 'Road trip', desc: 'Kilómetros y paisajes', value: 'roadtrip' }
    ]
  },
  {
    id: 'food',
    emoji: 'utensils',
    text: '¿Cuál es tu estilo de comida?',
    hint: 'La gastronomía también dice mucho de ti',
    singleCol: false,
    options: [
      { icon: 'sandwich', label: 'Casual', desc: 'Hamburguesas y snacks', value: 'casual' },
      { icon: 'fish', label: 'Gourmet', desc: 'Sabores del mundo', value: 'gourmet' },
      { icon: 'salad', label: 'Saludable', desc: 'Fresco y nutritivo', value: 'healthy' },
      { icon: 'egg-fried', label: 'Casera', desc: 'Sabor de hogar', value: 'home' },
      { icon: 'ice-cream-cone', label: 'Street food', desc: 'Comida callejera', value: 'streetfood' },
      { icon: 'flame', label: 'Parrilla', desc: 'BBQ con amigos', value: 'bbq' }
    ]
  },
  {
    id: 'budget',
    emoji: 'wallet',
    text: '¿Qué tan importante es el precio vs. el equipamiento?',
    hint: 'Tu prioridad al comprar',
    singleCol: false,
    options: [
      { icon: 'piggy-bank', label: 'Precio primero', desc: 'Lo más accesible', value: 'budget_value' },
      { icon: 'scale', label: 'Equilibrio', desc: 'Calidad y precio', value: 'budget_balanced' },
      { icon: 'crown', label: 'Equipo completo', desc: 'Lo mejor de todo', value: 'budget_premium' },
      { icon: 'cpu', label: 'Tecnología primero', desc: 'Innovación a bordo', value: 'budget_tech' }
    ]
  },
  {
    id: 'personality',
    emoji: 'sparkles',
    text: '¿Cómo te describirían tus amigos?',
    hint: 'Elige la que más resuene contigo',
    singleCol: false,
    options: [
      { icon: 'flame', label: 'Aventurero/a', desc: 'Siempre buscando lo nuevo', value: 'adventurer' },
      { icon: 'brain', label: 'Analítico/a', desc: 'Piensa antes de actuar', value: 'analytical' },
      { icon: 'heart', label: 'Sociable', desc: 'El alma de la fiesta', value: 'social' },
      { icon: 'palette', label: 'Creativo/a', desc: 'Imaginación sin límites', value: 'creative' },
      { icon: 'crown', label: 'Líder', desc: 'Siempre al frente', value: 'leader' },
      { icon: 'coffee', label: 'Tranquilo/a', desc: 'Paz y calma', value: 'calm' },
      { icon: 'trophy', label: 'Competitivo/a', desc: 'Siempre a ganar', value: 'competitive' }
    ]
  }
];

// ============ DATA: MODELS ============
// Legacy answer keys are kept intact. New keys:
//   vehicleType -> vt_*   |   terrain -> terrain_*   |   budget -> budget_*
const models = {
  haval_h7: {
    name: 'HAVAL H7',
    brand: 'HAVAL',
    tagline: 'Tu compañero de exploración',
    mainImage: 'public/haval-h7-hamilton-white.webp',
    colors: [
      { name: 'Hamilton White', hex: '#FFFFFF', image: 'public/haval-h7-hamilton-white.webp' },
      { name: 'N1 Black', hex: '#1a1a1a', image: 'public/haval-h7-n1-black.webp' },
      { name: 'C1H Gray', hex: '#808080', image: 'public/haval-h7-c1h-gray.webp' },
      { name: 'C0C Gray', hex: '#606060', image: 'public/haval-h7-c0c-gray.webp' },
      { name: '41E Green', hex: '#2d5016', image: 'public/haval-h7-41e-green.webp' }
    ],
    description: 'El HAVAL H7 es perfecto para ti. Con su gran tamaño, capacidad off-road y tecnología avanzada, este SUV está diseñado para quienes buscan aventura sin renunciar al confort. Su interior espacioso y sus sistemas de seguridad lo hacen ideal para familias y exploradores.',
    features: [
      { icon: 'mountain', label: 'Capacidad 4x4' },
      { icon: 'users', label: 'Espacio familiar' },
      { icon: 'shield-check', label: 'Seguridad total' }
    ],
    personality: ['Aventurero', 'Familiar', 'Explorador', 'Decidido'],
    scores: {
      vt_suv: 3, vt_pickup: 0, vt_coupe: 1, vt_compact: 0,
      terrain_city: 1, terrain_highway: 2, terrain_mountain: 3, terrain_offroad: 2,
      budget_value: 1, budget_balanced: 3, budget_premium: 2,
      mountain: 3, beach: 1, city: 1, countryside: 2, coast: 1,
      sunrise: 2, noon: 1, sunset: 2, night: 1, flexible: 1,
      rock: 2, urban: 1, electronic: 1, chill: 2, salsa: 1, silence: 2,
      solo: 1, couple: 2, family: 3, friends: 1, pets: 2,
      sport: 2, entertainment: 1, relax: 1, projects: 2, nature: 3, shopping: 0,
      casual: 1, gourmet: 1, healthy: 2, home: 2, streetfood: 1,
      adventurer: 3, analytical: 1, social: 1, creative: 1, leader: 2, calm: 2
    }
  },
  ora_5: {
    name: 'ORA 5',
    brand: 'ORA',
    tagline: 'Estilo que te define',
    mainImage: 'public/ora-5-v1-9h-white.webp',
    colors: [
      { name: '9H White', hex: '#FFFFFF', image: 'public/ora-5-v1-9h-white.webp' },
      { name: '90L White', hex: '#F5F5F5', image: 'public/ora-5-v1-90l-white.webp' },
      { name: '10W Red', hex: '#CC0000', image: 'public/ora-5-v1-10w-red.webp' },
      { name: '41E Green', hex: '#2d5016', image: 'public/ora-5-v1-41e-green (1).webp' },
      { name: '61B Blue', hex: '#1a3a5c', image: 'public/ora-5-v1-61b-blue.webp' },
      { name: 'N1 Black', hex: '#1a1a1a', image: 'public/ora-5-v1-n1-black.webp' },
      { name: 'C1H Matte Gray', hex: '#808080', image: 'public/ora-5-v1-c1h-matte-gray.webp' },
      { name: 'C2P Mountain Grey', hex: '#6B7B8D', image: 'public/ora-5-v1-c2p-distant-mountain-grey.webp' }
    ],
    description: 'El ORA 5 es tu match perfecto. Con un diseño elegante y lleno de tecnología, este vehículo compacto es ideal para quienes valoran el estilo, la innovación y la versatilidad. Perfecto para moverte por la ciudad con personalidad propia.',
    features: [
      { icon: 'sparkles', label: 'Diseño elegante' },
      { icon: 'smartphone', label: 'Tech avanzada' },
      { icon: 'building', label: 'Urbano' }
    ],
    personality: ['Estiloso', 'Innovador', 'Urbano', 'Trendy'],
    scores: {
      vt_suv: 1, vt_pickup: 0, vt_coupe: 2, vt_compact: 3,
      terrain_city: 3, terrain_highway: 1, terrain_mountain: 0, terrain_offroad: 0,
      budget_value: 2, budget_balanced: 3, budget_premium: 1,
      mountain: 0, beach: 2, city: 3, countryside: 0, coast: 2,
      sunrise: 1, noon: 2, sunset: 2, night: 2, flexible: 2,
      rock: 1, urban: 3, electronic: 2, chill: 1, salsa: 2, silence: 1,
      solo: 2, couple: 3, family: 0, friends: 2, pets: 1,
      sport: 1, entertainment: 3, relax: 1, projects: 1, nature: 0, shopping: 3,
      casual: 1, gourmet: 3, healthy: 1, home: 0, streetfood: 2,
      adventurer: 1, analytical: 1, social: 3, creative: 2, leader: 1, calm: 1
    }
  },
  tank_300: {
    name: 'TANK 300',
    brand: 'TANK',
    tagline: 'Robusto como tú',
    mainImage: 'public/white-tank-300-venezuela-gwm.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/white-tank-300-venezuela-gwm.webp' },
      { name: 'Sun Black', hex: '#1a1a1a', image: 'public/sun-black-tank-300-venezuela-gwm.webp' },
      { name: 'Thunder Grey', hex: '#6B6B6B', image: 'public/thunder-grey-tank-300-venezuela-gwm.webp' },
      { name: 'Mars Red', hex: '#8B2500', image: 'public/tank-300-mars-red-gwm-venezuela.webp' },
      { name: 'Lava Orange', hex: '#FF6B2B', image: 'public/tank-300-lava-orange-gwm-venezuela.webp' }
    ],
    description: 'El TANK 300 es exactamente lo que necesitas. Con robustez y eficiencia para cualquier desafío, este SUV off-road de lujo combina potencia pura con equipamiento premium. Si eres de los que no teme a ningún terreno, este es tu vehículo.',
    features: [
      { icon: 'zap', label: 'Potencia pura' },
      { icon: 'tent', label: 'Off-road real' },
      { icon: 'crown', label: 'Premium' }
    ],
    personality: ['Audaz', 'Fuerte', 'Independiente', 'Líder'],
    scores: {
      vt_suv: 3, vt_pickup: 2, vt_coupe: 0, vt_compact: 0,
      terrain_city: 0, terrain_highway: 1, terrain_mountain: 3, terrain_offroad: 3,
      budget_value: 1, budget_balanced: 2, budget_premium: 3,
      mountain: 3, beach: 1, city: 0, countryside: 2, coast: 1,
      sunrise: 2, noon: 1, sunset: 1, night: 2, flexible: 1,
      rock: 3, urban: 0, electronic: 1, chill: 1, salsa: 0, silence: 2,
      solo: 3, couple: 1, family: 1, friends: 2, pets: 1,
      sport: 3, entertainment: 0, relax: 0, projects: 2, nature: 3, shopping: 0,
      casual: 2, gourmet: 0, healthy: 2, home: 0, streetfood: 1,
      adventurer: 3, analytical: 0, social: 0, creative: 0, leader: 3, calm: 1
    }
  },
  haval_h6gt: {
    name: 'HAVAL H6 GT',
    brand: 'HAVAL',
    tagline: 'Deportivo y audaz',
    mainImage: 'public/haval-hev-h6gt-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/haval-hev-h6gt-white-gwm-venezuela.webp' },
      { name: 'G7 Red', hex: '#CC0000', image: 'public/haval-hev-h6gt-g7-red-gwm-venezuela.webp' },
      { name: 'Atlantic Blue', hex: '#1a3a5c', image: 'public/haval-hev-h6gt-atlantic-blue-gwm-venezuela.webp' },
      { name: 'KU Gray', hex: '#808080', image: 'public/haval-hev-h6gt-ku-gray-gwm-venezuela.webp' },
      { name: 'Ayers Gray', hex: '#606060', image: 'public/haval-hev-h6gt-ayers-gray-gwm-venezuela.webp' },
      { name: 'Sun Black', hex: '#1a1a1a', image: 'public/haval-hev-h6gt-sun-black-gwm-venezuela.webp' }
    ],
    description: 'El HAVAL H6 GT combina un diseño audaz y deportivo con tecnología de vanguardia. Si buscas velocidad, estilo y rendimiento, este SUV coupé es tu compañero ideal para las calles y las carreteras.',
    features: [
      { icon: 'flag', label: 'Deportivo' },
      { icon: 'flame', label: 'Diseño audaz' },
      { icon: 'wind', label: 'Rendimiento' }
    ],
    personality: ['Deportivo', 'Audaz', 'Veloz', 'Carismático'],
    scores: {
      vt_suv: 2, vt_pickup: 0, vt_coupe: 3, vt_compact: 1,
      terrain_city: 2, terrain_highway: 3, terrain_mountain: 1, terrain_offroad: 1,
      budget_value: 1, budget_balanced: 3, budget_premium: 2,
      mountain: 1, beach: 2, city: 2, countryside: 0, coast: 2,
      sunrise: 1, noon: 2, sunset: 2, night: 3, flexible: 2,
      rock: 2, urban: 2, electronic: 3, chill: 0, salsa: 1, silence: 0,
      solo: 2, couple: 2, family: 0, friends: 3, pets: 0,
      sport: 3, entertainment: 2, relax: 0, projects: 0, nature: 1, shopping: 1,
      casual: 2, gourmet: 1, healthy: 1, home: 0, streetfood: 2,
      adventurer: 2, analytical: 0, social: 2, creative: 1, leader: 2, calm: 0
    }
  },
  poer_passenger: {
    name: 'POER PASSENGER',
    brand: 'POER',
    tagline: 'Explora sin límites',
    mainImage: 'public/haval-poer-passenger-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/haval-poer-passenger-white-gwm-venezuela.webp' },
      { name: 'Silver', hex: '#C0C0C0', image: 'public/haval-poer-passenger-silver-gwm-venezuela.webp' }
    ],
    description: 'El POER PASSENGER es la pickup que combina fuerza real con confort y tecnología. Ideal para quienes necesitan versatilidad: trabajo durante la semana y aventura el fin de semana. Estilo y potencia en cada camino.',
    features: [
      { icon: 'dumbbell', label: 'Fuerza real' },
      { icon: 'target', label: 'Versátil' },
      { icon: 'sunrise', label: 'Sin límites' }
    ],
    personality: ['Trabajador', 'Versátil', 'Práctico', 'Explorador'],
    scores: {
      vt_suv: 1, vt_pickup: 3, vt_coupe: 0, vt_compact: 0,
      terrain_city: 1, terrain_highway: 2, terrain_mountain: 2, terrain_offroad: 3,
      budget_value: 3, budget_balanced: 2, budget_premium: 1,
      mountain: 2, beach: 1, city: 1, countryside: 3, coast: 1,
      sunrise: 2, noon: 2, sunset: 1, night: 1, flexible: 2,
      rock: 2, urban: 1, electronic: 0, chill: 2, salsa: 1, silence: 2,
      solo: 1, couple: 1, family: 2, friends: 2, pets: 2,
      sport: 1, entertainment: 0, relax: 1, projects: 3, nature: 2, shopping: 0,
      casual: 3, gourmet: 0, healthy: 1, home: 3, streetfood: 2,
      adventurer: 2, analytical: 2, social: 1, creative: 1, leader: 1, calm: 2
    }
  },
  haval_h6: {
    name: 'HAVAL H6',
    brand: 'HAVAL',
    tagline: 'El equilibrio perfecto',
    mainImage: 'public/haval-h6-white-gwm-venezuela-nueva-version.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/haval-h6-white-gwm-venezuela-nueva-version.webp' },
      { name: 'Black', hex: '#1a1a1a', image: 'public/haval-h6-black-gwm-venezuela-nueva-version.webp' },
      { name: 'Grey', hex: '#808080', image: 'public/haval-h6-grey-gwm-venezuela-nueva-version.webp' },
      { name: 'Gold', hex: '#C5A55A', image: 'public/haval-h6-gold-gwm-venezuela-nueva-version.webp' }
    ],
    description: 'El HAVAL H6 es el SUV que lo tiene todo: diseño moderno, interior amplio y tecnología a bordo para el día a día. Un vehículo confiable y versátil que se adapta a cualquier estilo de vida.',
    features: [
      { icon: 'scale', label: 'Equilibrado' },
      { icon: 'home', label: 'Versátil' },
      { icon: 'bar-chart-3', label: 'Confiable' }
    ],
    personality: ['Equilibrado', 'Práctico', 'Confiable', 'Adaptable'],
    scores: {
      vt_suv: 3, vt_pickup: 0, vt_coupe: 1, vt_compact: 1,
      terrain_city: 2, terrain_highway: 2, terrain_mountain: 1, terrain_offroad: 1,
      budget_value: 3, budget_balanced: 3, budget_premium: 1,
      mountain: 1, beach: 2, city: 2, countryside: 1, coast: 2,
      sunrise: 1, noon: 2, sunset: 2, night: 1, flexible: 2,
      rock: 1, urban: 2, electronic: 1, chill: 2, salsa: 2, silence: 1,
      solo: 1, couple: 2, family: 3, friends: 1, pets: 1,
      sport: 1, entertainment: 2, relax: 2, projects: 1, nature: 1, shopping: 1,
      casual: 2, gourmet: 1, healthy: 1, home: 2, streetfood: 1,
      adventurer: 1, analytical: 2, social: 2, creative: 1, leader: 1, calm: 2
    }
  },
  haval_h9: {
    name: 'HAVAL H9',
    brand: 'HAVAL',
    tagline: 'Premium sin compromisos',
    mainImage: 'public/haval-h9-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/haval-h9-white-gwm-venezuela.webp' },
      { name: 'Black', hex: '#1a1a1a', image: 'public/haval-h9-black-gwm-venezuela.webp' },
      { name: 'KZ Gray', hex: '#707070', image: 'public/haval-h9-kz-gray-gwm-venezuela.webp' },
      { name: 'DX Gray', hex: '#505050', image: 'public/haval-h9-dx-gray-gwm-venezuela.webp' }
    ],
    description: 'El HAVAL H9 es el SUV premium grande que redefine el confort y la potencia. Con tracción integral avanzada, interior de lujo y tecnología de conducción asistida, es ideal para quienes exigen lo mejor en cada viaje. Espacio, elegancia y dominio en un solo vehículo.',
    features: [
      { icon: 'crown', label: 'Premium' },
      { icon: 'shield-check', label: 'Seguridad AWD' },
      { icon: 'armchair', label: 'Confort superior' }
    ],
    personality: ['Elegante', 'Líder', 'Exigente', 'Premium'],
    scores: {
      vt_suv: 3, vt_pickup: 1, vt_coupe: 0, vt_compact: 0,
      terrain_city: 1, terrain_highway: 2, terrain_mountain: 3, terrain_offroad: 3,
      budget_value: 0, budget_balanced: 1, budget_premium: 3,
      mountain: 2, beach: 1, city: 2, countryside: 2, coast: 2,
      sunrise: 2, noon: 2, sunset: 2, night: 1, flexible: 1,
      rock: 1, urban: 1, electronic: 1, chill: 3, salsa: 0, silence: 3,
      solo: 1, couple: 2, family: 3, friends: 1, pets: 1,
      sport: 1, entertainment: 1, relax: 3, projects: 2, nature: 2, shopping: 1,
      casual: 1, gourmet: 3, healthy: 2, home: 2, streetfood: 0,
      adventurer: 1, analytical: 3, social: 1, creative: 1, leader: 3, calm: 3
    }
  },
  haval_jolion: {
    name: 'HAVAL Jolion',
    brand: 'HAVAL',
    tagline: 'Compacto y lleno de vida',
    mainImage: 'public/haval-jolion-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/haval-jolion-white-gwm-venezuela.webp' },
      { name: 'Mars Red', hex: '#8B2500', image: 'public/haval-jolion-mars-red-gwm-venezuela.webp' },
      { name: 'Blue', hex: '#1a3a5c', image: 'public/haval-jolion-blue-gwm-venezuela.webp' },
      { name: 'Sun Black', hex: '#1a1a1a', image: 'public/haval-jolion-sun-black-gwm-venezuela.webp' },
      { name: 'Ayers Grey', hex: '#606060', image: 'public/haval-jolion-ayers-grey-gwm-venezuela.webp' }
    ],
    description: 'El HAVAL Jolion es el SUV compacto que encaja perfecto en la vida urbana. Ágil, tecnológico y con un diseño joven y dinámico, es ideal para quienes buscan un auto versátil que se adapte a la ciudad sin perder personalidad. Compacto por fuera, grande por dentro.',
    features: [
      { icon: 'zap', label: 'Ágil urbano' },
      { icon: 'smartphone', label: 'Conectado' },
      { icon: 'sparkles', label: 'Diseño joven' }
    ],
    personality: ['Joven', 'Dinámico', 'Urbano', 'Versátil'],
    scores: {
      vt_suv: 2, vt_pickup: 0, vt_coupe: 1, vt_compact: 3,
      terrain_city: 3, terrain_highway: 1, terrain_mountain: 0, terrain_offroad: 0,
      budget_value: 3, budget_balanced: 2, budget_premium: 1,
      mountain: 0, beach: 2, city: 3, countryside: 0, coast: 2,
      sunrise: 1, noon: 2, sunset: 2, night: 2, flexible: 3,
      rock: 2, urban: 3, electronic: 2, chill: 1, salsa: 2, silence: 1,
      solo: 2, couple: 2, family: 1, friends: 3, pets: 2,
      sport: 2, entertainment: 2, relax: 1, projects: 1, nature: 1, shopping: 2,
      casual: 2, gourmet: 1, healthy: 1, home: 1, streetfood: 3,
      adventurer: 1, analytical: 1, social: 3, creative: 2, leader: 0, calm: 1
    }
  },
  tank_500: {
    name: 'TANK 500',
    brand: 'TANK',
    tagline: 'Lujo off-road definitivo',
    mainImage: 'public/tank-500-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/tank-500-white-gwm-venezuela.webp' },
      { name: 'Black', hex: '#1a1a1a', image: 'public/black-tank500-gwm-venezuela.webp' },
      { name: 'Gold', hex: '#C5A55A', image: 'public/gold-tank500-gwm-venezuela.webp' }
    ],
    description: 'El TANK 500 es el SUV off-road de lujo que combina imponente presencia con refinamiento absoluto. Potencia V6, tracción integral avanzada y un interior que rivaliza con los mejores sedanes premium. Para quienes no aceptan compromisos entre lujo y aventura extrema.',
    features: [
      { icon: 'crown', label: 'Lujo extremo' },
      { icon: 'mountain', label: 'Off-road V6' },
      { icon: 'shield-check', label: 'AWD avanzado' }
    ],
    personality: ['Imponente', 'Premium', 'Poderoso', 'Exclusivo'],
    scores: {
      vt_suv: 3, vt_pickup: 2, vt_coupe: 0, vt_compact: 0,
      terrain_city: 0, terrain_highway: 2, terrain_mountain: 3, terrain_offroad: 3,
      budget_value: 0, budget_balanced: 1, budget_premium: 3,
      mountain: 3, beach: 1, city: 1, countryside: 3, coast: 1,
      sunrise: 2, noon: 1, sunset: 2, night: 2, flexible: 1,
      rock: 2, urban: 0, electronic: 1, chill: 2, salsa: 0, silence: 3,
      solo: 2, couple: 2, family: 2, friends: 1, pets: 1,
      sport: 2, entertainment: 1, relax: 2, projects: 2, nature: 3, shopping: 0,
      casual: 1, gourmet: 2, healthy: 2, home: 1, streetfood: 0,
      adventurer: 3, analytical: 2, social: 0, creative: 0, leader: 3, calm: 2
    }
  },
  tank_400: {
    name: 'TANK 400',
    brand: 'TANK',
    tagline: 'Aventura con carácter',
    mainImage: 'public/tank-400-black-gwm-venezuela.webp',
    colors: [
      { name: 'Black', hex: '#1a1a1a', image: 'public/tank-400-black-gwm-venezuela.webp' },
      { name: 'Gray', hex: '#808080', image: 'public/tank-400-gray-gwm-venezuela.webp' },
      { name: 'Green', hex: '#2d5016', image: 'public/tank-400-green-gwm-venezuela.webp' },
      { name: 'Silver', hex: '#C0C0C0', image: 'public/tank-400-silver-gwm-venezuela.webp' }
    ],
    description: 'El TANK 400 es el SUV off-road que combina presencia imponente con tecnología de última generación. Diseñado para quienes quieren salir de la ciudad sin renunciar al confort ni al estilo, es tu aliado para cada aventura.',
    features: [
      { icon: 'mountain', label: 'Off-road real' },
      { icon: 'shield-check', label: 'Seguridad ADAS' },
      { icon: 'crown', label: 'Confort premium' }
    ],
    personality: ['Aventurero', 'Audaz', 'Tecnológico', 'Independiente'],
    scores: {
      vt_suv: 3, vt_pickup: 2, vt_coupe: 0, vt_compact: 0, vt_hybrid: 2,
      terrain_city: 0, terrain_highway: 1, terrain_mountain: 3, terrain_offroad: 3, terrain_mixed: 3,
      budget_value: 0, budget_balanced: 2, budget_premium: 3, budget_tech: 3,
      mountain: 3, beach: 1, city: 0, countryside: 3, coast: 1, lake: 3,
      sunrise: 2, noon: 1, sunset: 2, night: 2, flexible: 1, dawn: 1,
      rock: 3, urban: 0, electronic: 1, chill: 1, salsa: 0, silence: 2, indie: 2,
      solo: 2, couple: 2, family: 2, friends: 2, pets: 2, coworkers: 0,
      sport: 3, entertainment: 0, relax: 1, projects: 2, nature: 3, shopping: 0, roadtrip: 3,
      casual: 2, gourmet: 1, healthy: 2, home: 1, streetfood: 1, bbq: 3,
      adventurer: 3, analytical: 1, social: 0, creative: 1, leader: 2, calm: 1, competitive: 2
    }
  },
  tank_700: {
    name: 'TANK 700',
    brand: 'TANK',
    tagline: 'La cima del lujo off-road',
    mainImage: 'public/tank-700-black-gwm-venezuela.webp',
    colors: [
      { name: 'Black', hex: '#1a1a1a', image: 'public/tank-700-black-gwm-venezuela.webp' },
      { name: 'Grey', hex: '#707070', image: 'public/tank-700-grey-gwm-venezuela.webp' },
      { name: 'Silver', hex: '#C0C0C0', image: 'public/tank-700-silver-gwm-venezuela.webp' }
    ],
    description: 'El TANK 700 es el máximo exponente del lujo off-road de GWM. Presencia monumental, tecnología de flagship y un refinamiento interior excepcional para quienes no aceptan concesiones entre aventura y elegancia.',
    features: [
      { icon: 'crown', label: 'Lujo flagship' },
      { icon: 'mountain', label: 'Capacidad total' },
      { icon: 'sparkles', label: 'Tecnología premium' }
    ],
    personality: ['Imponente', 'Exclusivo', 'Líder', 'Refinado'],
    scores: {
      vt_suv: 3, vt_pickup: 1, vt_coupe: 0, vt_compact: 0, vt_hybrid: 2,
      terrain_city: 0, terrain_highway: 2, terrain_mountain: 3, terrain_offroad: 3, terrain_mixed: 3,
      budget_value: 0, budget_balanced: 1, budget_premium: 3, budget_tech: 3,
      mountain: 3, beach: 1, city: 1, countryside: 3, coast: 1, lake: 3,
      sunrise: 2, noon: 1, sunset: 2, night: 2, flexible: 1, dawn: 1,
      rock: 2, urban: 1, electronic: 1, chill: 2, salsa: 0, silence: 3, indie: 1,
      solo: 1, couple: 3, family: 2, friends: 1, pets: 1, coworkers: 2,
      sport: 2, entertainment: 1, relax: 3, projects: 1, nature: 2, shopping: 1, roadtrip: 3,
      casual: 1, gourmet: 3, healthy: 2, home: 1, streetfood: 0, bbq: 2,
      adventurer: 2, analytical: 2, social: 0, creative: 0, leader: 3, calm: 3, competitive: 2
    }
  },
  poer_commercial: {
    name: 'POER COMMERCIAL',
    brand: 'POER',
    tagline: 'Trabajo sin descanso',
    mainImage: 'public/haval-poer-commercial-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/haval-poer-commercial-white-gwm-venezuela.webp' },
      { name: 'Silver', hex: '#C0C0C0', image: 'public/haval-poer-commercial-silver-gwm-venezuela.webp' }
    ],
    description: 'El POER COMMERCIAL es la pickup de trabajo que no se detiene. Caja amplia, chasis resistente y eficiencia comprobada para acompañarte en cada jornada, sin importar lo exigente que sea el terreno.',
    features: [
      { icon: 'dumbbell', label: 'Fuerza de trabajo' },
      { icon: 'target', label: 'Carga versátil' },
      { icon: 'bar-chart-3', label: 'Eficiencia real' }
    ],
    personality: ['Trabajador', 'Resistente', 'Práctico', 'Confiable'],
    scores: {
      vt_suv: 0, vt_pickup: 3, vt_coupe: 0, vt_compact: 0, vt_hybrid: 1,
      terrain_city: 1, terrain_highway: 2, terrain_mountain: 2, terrain_offroad: 3, terrain_mixed: 3,
      budget_value: 3, budget_balanced: 2, budget_premium: 0, budget_tech: 0,
      mountain: 2, beach: 1, city: 1, countryside: 3, coast: 1, lake: 2,
      sunrise: 3, noon: 2, sunset: 1, night: 1, flexible: 2, dawn: 3,
      rock: 2, urban: 1, electronic: 0, chill: 1, salsa: 1, silence: 2, indie: 1,
      solo: 2, couple: 1, family: 1, friends: 1, pets: 1, coworkers: 3,
      sport: 1, entertainment: 0, relax: 0, projects: 3, nature: 2, shopping: 0, roadtrip: 3,
      casual: 3, gourmet: 0, healthy: 1, home: 3, streetfood: 3, bbq: 3,
      adventurer: 2, analytical: 2, social: 0, creative: 1, leader: 1, calm: 2, competitive: 2
    }
  },
  poer_commercial_single_cab: {
    name: 'POER COMMERCIAL SINGLE CAB',
    brand: 'POER',
    tagline: 'Pura capacidad de carga',
    mainImage: 'public/poer-sb-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/poer-sb-white-gwm-venezuela.webp' }
    ],
    description: 'El POER COMMERCIAL SINGLE CAB maximiza cada centímetro para el trabajo. Su cabina simple deja espacio a una caja más grande y resistente, ideal para quienes viven de hacer que las cosas sucedan.',
    features: [
      { icon: 'dumbbell', label: 'Máxima carga' },
      { icon: 'target', label: 'Cabina simple' },
      { icon: 'bar-chart-3', label: 'Costo eficiente' }
    ],
    personality: ['Trabajador', 'Eficiente', 'Resistente', 'Directo'],
    scores: {
      vt_suv: 0, vt_pickup: 3, vt_coupe: 0, vt_compact: 0, vt_hybrid: 0,
      terrain_city: 1, terrain_highway: 2, terrain_mountain: 2, terrain_offroad: 3, terrain_mixed: 3,
      budget_value: 3, budget_balanced: 2, budget_premium: 0, budget_tech: 0,
      mountain: 2, beach: 1, city: 1, countryside: 3, coast: 1, lake: 2,
      sunrise: 3, noon: 3, sunset: 1, night: 1, flexible: 2, dawn: 3,
      rock: 2, urban: 0, electronic: 0, chill: 1, salsa: 0, silence: 2, indie: 0,
      solo: 3, couple: 1, family: 0, friends: 1, pets: 0, coworkers: 3,
      sport: 1, entertainment: 0, relax: 0, projects: 3, nature: 2, shopping: 0, roadtrip: 2,
      casual: 3, gourmet: 0, healthy: 1, home: 3, streetfood: 3, bbq: 3,
      adventurer: 1, analytical: 2, social: 0, creative: 1, leader: 1, calm: 2, competitive: 2
    }
  },
  wingle_5: {
    name: 'WINGLE 5',
    brand: 'WINGLE',
    tagline: 'Tu primera pickup',
    mainImage: 'public/haval-wingle-5-white-gwm-venezuela.webp',
    colors: [
      { name: 'White', hex: '#FFFFFF', image: 'public/haval-wingle-5-white-gwm-venezuela.webp' }
    ],
    description: 'La WINGLE 5 es la pickup accesible que lo hace todo: te lleva al trabajo, carga lo que necesites y no le teme al barro. Robusta, sencilla y rendidora, es la compañera perfecta para empezar tu propia historia.',
    features: [
      { icon: 'dumbbell', label: 'Robusta y simple' },
      { icon: 'piggy-bank', label: 'Precio accesible' },
      { icon: 'target', label: 'Todo uso' }
    ],
    personality: ['Práctico', 'Trabajador', 'Rendidor', 'Accesible'],
    scores: {
      vt_suv: 0, vt_pickup: 3, vt_coupe: 0, vt_compact: 0, vt_hybrid: 1,
      terrain_city: 1, terrain_highway: 2, terrain_mountain: 2, terrain_offroad: 3, terrain_mixed: 2,
      budget_value: 3, budget_balanced: 2, budget_premium: 0, budget_tech: 0,
      mountain: 2, beach: 1, city: 1, countryside: 3, coast: 1, lake: 2,
      sunrise: 3, noon: 2, sunset: 1, night: 1, flexible: 2, dawn: 2,
      rock: 2, urban: 1, electronic: 0, chill: 1, salsa: 1, silence: 1, indie: 1,
      solo: 2, couple: 1, family: 1, friends: 2, pets: 1, coworkers: 2,
      sport: 1, entertainment: 0, relax: 1, projects: 3, nature: 3, shopping: 0, roadtrip: 3,
      casual: 3, gourmet: 0, healthy: 1, home: 3, streetfood: 2, bbq: 3,
      adventurer: 2, analytical: 1, social: 1, creative: 1, leader: 1, calm: 2, competitive: 1
    }
  }
};

// New answer options added to the quiz: extend the original score sheets.
const EXTRA_SCORES = {
  haval_h7: { lake: 3, vt_hybrid: 1, dawn: 2, terrain_mixed: 3, indie: 2, coworkers: 1, roadtrip: 3, bbq: 2, budget_tech: 2, competitive: 2 },
  ora_5: { lake: 1, vt_hybrid: 3, dawn: 1, terrain_mixed: 1, indie: 2, coworkers: 2, roadtrip: 1, bbq: 1, budget_tech: 3, competitive: 1 },
  tank_300: { lake: 2, vt_hybrid: 0, dawn: 2, terrain_mixed: 3, indie: 1, coworkers: 0, roadtrip: 3, bbq: 3, budget_tech: 1, competitive: 3 },
  haval_h6gt: { lake: 1, vt_hybrid: 2, dawn: 2, terrain_mixed: 2, indie: 3, coworkers: 2, roadtrip: 2, bbq: 2, budget_tech: 3, competitive: 3 },
  poer_passenger: { lake: 2, vt_hybrid: 1, dawn: 3, terrain_mixed: 3, indie: 1, coworkers: 3, roadtrip: 3, bbq: 3, budget_tech: 1, competitive: 2 },
  haval_h6: { lake: 2, vt_hybrid: 2, dawn: 1, terrain_mixed: 2, indie: 2, coworkers: 2, roadtrip: 2, bbq: 2, budget_tech: 2, competitive: 1 },
  haval_h9: { lake: 3, vt_hybrid: 1, dawn: 1, terrain_mixed: 2, indie: 1, coworkers: 1, roadtrip: 3, bbq: 2, budget_tech: 3, competitive: 2 },
  haval_jolion: { lake: 1, vt_hybrid: 3, dawn: 1, terrain_mixed: 1, indie: 3, coworkers: 2, roadtrip: 3, bbq: 1, budget_tech: 3, competitive: 1 },
  tank_500: { lake: 3, vt_hybrid: 1, dawn: 2, terrain_mixed: 3, indie: 1, coworkers: 1, roadtrip: 3, bbq: 3, budget_tech: 2, competitive: 2 }
};

Object.entries(EXTRA_SCORES).forEach(([key, extra]) => {
  if (models[key]) Object.assign(models[key].scores, extra);
});

const MODEL_KEYS = Object.keys(models);

const TIE_BREAK_ORDER = ['vehicleType', 'terrain', 'budget'];
const STORAGE_KEY = 'gwm-quiz:session';
const MAX_REVEAL_WAIT = 1700;

// ============ STATE ============
let currentQuestion = 0;
let userName = '';
let answers = {};
let selectionLocked = false;
let navLocked = false;
let loadingActive = false;
let currentColorIndex = 0;
let currentResultData = null;
let swipeSetupDone = false;
let countFrame = null;
let wakeLock = null;

const timers = new Set();

function later(fn, ms) {
  const id = window.setTimeout(() => {
    timers.delete(id);
    fn();
  }, ms);
  timers.add(id);
  return id;
}

function clearTimers() {
  timers.forEach((id) => window.clearTimeout(id));
  timers.clear();
  if (countFrame) {
    cancelAnimationFrame(countFrame);
    countFrame = null;
  }
}

// ============ DOM ============
const $ = (id) => document.getElementById(id);

const welcomeScreen = $('welcomeScreen');
const questionScreen = $('questionScreen');
const loadingScreen = $('loadingScreen');
const resultScreen = $('resultScreen');

const stageLayerA = $('stageLayerA');
const stageLayerB = $('stageLayerB');

const nameInput = $('nameInput');
const startBtn = $('startBtn');
const charCounter = $('charCounter');
const progressContainer = $('progressContainer');
const progressBar = $('progressBar');
const questionCounter = $('questionCounter');
const questionDots = $('questionDots');
const questionEmoji = $('questionEmoji');
const questionText = $('questionText');
const questionHint = $('questionHint');
const optionsGrid = $('optionsGrid');
const prevBtn = $('prevBtn');
const nextBtn = $('nextBtn');
const loadingText = $('loadingText');
const loadingSteps = Array.from(document.querySelectorAll('.loading-step'));
const resultIntro = $('resultIntro');
const giantText = $('resultGiantText');
const resultTagline = $('resultTagline');
const carImg = $('resultCarImg');
const carHero = $('resultCarHero');
const swipeIndicator = $('resultSwipeIndicator');
const colorBar = $('resultColorBar');
const matchSection = $('resultMatchSection');
const matchPercent = $('resultMatchPercent');
const resultFeatures = $('resultFeatures');
const description = $('resultDescription');
const actions = $('resultActions');
const restartBtn = $('restartBtn');
const confettiContainer = $('confettiContainer');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// ============ SHARED CINEMATIC STAGE ============
const stageLayers = [stageLayerA, stageLayerB];
let stageActiveIndex = 0;
let stageCurrentSrc = '';
let stageCleanupTimer = null;

function preloadStageImage(src) {
  if (!src) return;
  const img = new Image();
  img.src = src;
}

function setStageVehicle(src, immediate) {
  if (!src || src === stageCurrentSrc) return;
  stageCurrentSrc = src;

  const active = stageLayers[stageActiveIndex];
  const nextIndex = stageActiveIndex === 0 ? 1 : 0;
  const next = stageLayers[nextIndex];

  preloadStageImage(src);
  next.style.backgroundImage = `url("${src}")`;

  if (stageCleanupTimer) {
    clearTimeout(stageCleanupTimer);
    stageCleanupTimer = null;
  }

  if (immediate || reducedMotion.matches) {
    next.style.transition = 'none';
    active.style.transition = 'none';
    active.classList.remove('is-visible');
    next.classList.add('is-visible');
    void next.offsetWidth;
    active.style.transition = '';
    next.style.transition = '';
    active.style.zIndex = '';
    next.style.zIndex = '';
  } else {
    // Dissolve the old frame away over a fully-opaque new frame. This is a
    // true linear crossfade: no double exposure, no brightness dip, and the
    // outgoing vehicle starts leaving immediately instead of lingering.
    next.style.transition = 'none';
    next.style.zIndex = '1';
    active.style.zIndex = '2';
    next.classList.add('is-visible');
    void next.offsetWidth;
    next.style.transition = '';

    active.classList.remove('is-visible');

    stageCleanupTimer = setTimeout(() => {
      // The old frame is fully transparent by now; only restore stacking.
      active.style.zIndex = '';
      next.style.zIndex = '';
      stageCleanupTimer = null;
    }, 1150);
  }

  stageActiveIndex = nextIndex;
}

// ============ CARACTERISTICAS DATA ============
let featuresByModel = {};

function normalizeModelName(name) {
  return String(name || '').toUpperCase().replace(/\s+/g, ' ').trim();
}

function caracteristicasKey(name) {
  const normalized = normalizeModelName(name);
  return normalized === 'TANK 500' ? 'TANK 500 HEV' : normalized;
}

async function loadCaracteristicas() {
  try {
    const response = await fetch('caracteristicas.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('fetch failed');
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('invalid data');
    data.forEach((model) => {
      if (!model || !model.modelo || !Array.isArray(model.versiones)) return;
      const version = model.versiones[model.versiones.length - 1];
      const list = version && Array.isArray(version.caracteristicas) ? version.caracteristicas : [];
      featuresByModel[normalizeModelName(model.modelo)] = list;
    });
  } catch (err) {
    featuresByModel = {};
  }
}

const FEATURE_PRIORITY = [
  [/airbag/i, 100],
  [/adas|asistencias al conductor/i, 96],
  [/360/i, 92],
  [/diferencial/i, 90],
  [/techo/i, 86],
  [/ventilaci[óo]n|calefacc/i, 82],
  [/hud|pantalla emergente/i, 78],
  [/el[ée]ctric/i, 72],
  [/carga inal[áa]mbrica/i, 68],
  [/pantalla/i, 62],
  [/parlante|audio/i, 56],
  [/aire acondicionado/i, 50],
  [/modos de conducci[óo]n/i, 46],
  [/crucero/i, 44],
  [/faros|luces|led/i, 40]
];

const FEATURE_ICON_RULES = [
  [/airbag/i, 'shield'],
  [/adas|asistencia|crucero|radar|somnolencia/i, 'shield-check'],
  [/360|c[áa]mara/i, 'camera'],
  [/techo/i, 'sun'],
  [/asiento/i, 'armchair'],
  [/hud|pantalla|cluster|instrumento|multimedia/i, 'monitor'],
  [/carga inal[áa]mbrica|celular|carplay|conectividad|bluetooth|wifi/i, 'smartphone'],
  [/diferencial|tracci[óo]n|4wd|off-road|todoterreno/i, 'mountain'],
  [/parlante|audio/i, 'volume-2'],
  [/aire acondicionado|clima/i, 'wind'],
  [/maletero|puerta/i, 'door-open'],
  [/luces|faros|led|ambiental/i, 'lightbulb'],
  [/volante/i, 'circle'],
  [/motor|hev|h[íi]brido|potencia/i, 'zap'],
  [/modo/i, 'settings'],
  [/llanta|rin/i, 'circle'],
  [/freno/i, 'disc'],
  [/suspensi[óo]n/i, 'waves'],
  [/espejo/i, 'square'],
  [/memoria/i, 'database'],
  [/sensor/i, 'scan']
];

function featurePriority(text) {
  for (const [pattern, weight] of FEATURE_PRIORITY) {
    if (pattern.test(text)) return weight;
  }
  return 10;
}

function featureIcon(text) {
  for (const [pattern, icon] of FEATURE_ICON_RULES) {
    if (pattern.test(text)) return icon;
  }
  return 'check';
}

function shortenFeature(text) {
  return String(text)
    .replace(/\([^)]*\)/g, ' ')
    .split(' + ')[0]
    .replace(/\s+/g, ' ')
    .replace(/[.,;:]$/, '')
    .trim()
    .slice(0, 40)
    .trim();
}

const FEATURE_LABELS = [
  [/airbag/i, () => 'Airbags'],
  [/adas|asistencias al conductor/i, () => 'Asistencias ADAS'],
  [/360/i, () => 'Cámara 360°'],
  [/diferencial/i, () => 'Bloqueo de diferencial'],
  [/techo panor/i, () => 'Techo panorámico'],
  [/techo/i, () => 'Techo corredizo'],
  [/ventilaci[óo]n|calefacc/i, () => 'Asientos climatizados'],
  [/hud|pantalla emergente/i, () => 'Head-up display'],
  [/carga inal[áa]mbrica/i, () => 'Carga inalámbrica'],
  [/pantalla/i, () => 'Pantalla multimedia'],
  [/parlante/i, () => 'Sistema de audio'],
  [/aire acondicionado/i, () => 'Clima bizona'],
  [/modos de conducci[óo]n/i, () => 'Modos de conducción'],
  [/crucero/i, () => 'Crucero adaptativo'],
  [/maletero|puerta elevadiza/i, () => 'Maletero eléctrico'],
  [/luces ambientales|luz ambiental/i, () => 'Luz ambiental'],
  [/faros/i, () => 'Faros LED'],
  [/espejo/i, () => 'Espejos abatibles'],
  [/sensor|radar/i, () => 'Sensores de radar'],
  [/conectividad|carplay|bluetooth/i, () => 'Conectividad total'],
  [/asiento/i, () => 'Asientos eléctricos']
];

function featureLabel(text) {
  for (const [pattern, makeLabel] of FEATURE_LABELS) {
    if (pattern.test(text)) return makeLabel(text);
  }
  return shortenFeature(text);
}

function getTopFeatures(model) {
  const list = featuresByModel[caracteristicasKey(model.name)];

  if (!Array.isArray(list) || !list.length) {
    return (model.features || []).map((feature) => ({
      text: feature.label,
      icon: feature.icon
    }));
  }

  return list
    .map((text, index) => ({ text, index, priority: featurePriority(text) }))
    .sort((a, b) => b.priority - a.priority || a.index - b.index)
    .slice(0, 6)
    .map((item) => ({
      text: featureLabel(item.text),
      icon: featureIcon(item.text)
    }));
}

function renderFeatures(model) {
  if (!resultFeatures) return;
  resultFeatures.innerHTML = '';

  getTopFeatures(model).forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'feature-card';

    const icon = document.createElement('span');
    icon.className = 'feature-icon';
    icon.innerHTML = `<i data-lucide="${item.icon}" aria-hidden="true"></i>`;

    const label = document.createElement('span');
    label.className = 'feature-text';
    label.textContent = item.text;

    card.append(icon, label);
    resultFeatures.appendChild(card);
  });

  refreshIcons();
}

// ============ HELPERS ============
function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function saveState() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
      userName,
      answers,
      currentQuestion
    }));
  } catch (err) {
    /* sessionStorage may be unavailable in private kiosk mode */
  }
}

function clearState() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    /* noop */
  }
}

function restoreState() {
  let saved;
  try {
    saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null');
  } catch (err) {
    clearState();
    return;
  }
  if (!saved || !saved.userName || !saved.answers) return;

  userName = saved.userName;
  answers = saved.answers;
  currentQuestion = Math.min(Math.max(saved.currentQuestion || 0, 0), questions.length - 1);
  nameInput.value = userName;
  updateNameState();

  progressContainer.classList.add('visible');
  switchScreen(welcomeScreen, questionScreen, renderQuestion);
}

function updateNameState() {
  const trimmed = nameInput.value.trim();
  const remaining = Math.max(0, (nameInput.maxLength || 30) - nameInput.value.length);
  startBtn.disabled = trimmed.length < 2;

  if (remaining === 0) {
    charCounter.textContent = 'Llegaste al límite';
  } else if (remaining <= 5) {
    charCounter.textContent = `Te quedan ${remaining} caracteres`;
  } else {
    charCounter.textContent = 'Máximo 30 caracteres';
  }
  charCounter.classList.toggle('limit', remaining <= 5);
}

function shakeNameInput() {
  nameInput.classList.remove('invalid');
  void nameInput.offsetWidth;
  nameInput.classList.add('invalid');
  nameInput.focus();
  later(() => nameInput.classList.remove('invalid'), 500);
}

function switchScreen(from, to, onDone) {
  if (!from || !to) return;
  to.scrollTop = 0;
  from.classList.add('exiting');
  later(() => {
    from.classList.remove('active', 'exiting');
    to.classList.add('active');
    to.scrollTop = 0;
    document.body.dataset.screen = to.id;
    if (onDone) onDone();
  }, 300);
}

// ============ WELCOME / START ============
nameInput.addEventListener('input', updateNameState);

nameInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter') return;
  if (nameInput.value.trim().length < 2) {
    shakeNameInput();
    return;
  }
  startQuiz();
});

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
  if (welcomeScreen.classList.contains('exiting')) return;
  userName = nameInput.value.trim();
  if (userName.length < 2) {
    shakeNameInput();
    return;
  }

  createSparkle(startBtn);
  requestWakeLock();

  progressContainer.classList.add('visible');
  switchScreen(welcomeScreen, questionScreen);
  currentQuestion = 0;
  answers = {};
  saveState();
  renderQuestion();
}

// ============ QUESTIONS ============
function renderQuestion() {
  const q = questions[currentQuestion];
  const total = questions.length;

  selectionLocked = false;
  navLocked = false;

  questionCounter.textContent = `Pregunta ${currentQuestion + 1} de ${total}`;
  questionEmoji.innerHTML = `<i data-lucide="${q.emoji}"></i>`;
  questionText.textContent = q.text;
  questionHint.textContent = q.hint;

  renderDots();

  const answeredCount = Object.keys(answers).length;
  progressBar.style.width = `${Math.round((answeredCount / total) * 100)}%`;

  optionsGrid.innerHTML = '';
  let gridClass = 'options-grid';
  if (q.singleCol) gridClass += ' single-col';
  else if (q.options.length >= 6) gridClass += ' three-col';
  if (q.options.length >= 7) gridClass += ' options-grid--dense';
  optionsGrid.className = gridClass;

  q.options.forEach((opt, idx) => {
    const isSelected = answers[q.id] === opt.value;
    const card = document.createElement('div');
    card.className = 'option-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    if (isSelected) card.classList.add('selected');

    card.innerHTML = `
      <span class="option-icon"><i data-lucide="${opt.icon}" aria-hidden="true"></i></span>
      <span class="option-label">${opt.label}</span>
      <span class="option-desc">${opt.desc}</span>
      <div class="option-check" aria-hidden="true">
        <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
    `;

    card.addEventListener('click', () => selectOption(q.id, opt.value, card, optionsGrid));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectOption(q.id, opt.value, card, optionsGrid);
      }
    });

    card.classList.add('enter');
    card.style.animationDelay = `${idx * 60}ms`;

    optionsGrid.appendChild(card);
  });

  const isLast = currentQuestion === total - 1;
  const navArrows = document.querySelector('.nav-arrows');
  navArrows.style.display = isLast ? 'none' : 'flex';
  prevBtn.disabled = currentQuestion === 0;
  nextBtn.disabled = !answers[q.id];

  const rotationModel = models[MODEL_KEYS[currentQuestion % MODEL_KEYS.length]];
  if (rotationModel) setStageVehicle(rotationModel.colors[0].image);

  refreshIcons();
}

function renderDots() {
  questionDots.innerHTML = '';
  questions.forEach((q, index) => {
    const dot = document.createElement('span');
    if (index === currentQuestion) dot.className = 'active';
    else if (answers[q.id]) dot.className = 'done';
    questionDots.appendChild(dot);
  });
}

function selectOption(questionId, value, card, grid) {
  if (selectionLocked) return;
  selectionLocked = true;

  grid.querySelectorAll('.option-card').forEach((el) => {
    el.classList.remove('selected', 'advancing');
    el.setAttribute('aria-pressed', 'false');
  });

  card.classList.add('selected', 'advancing');
  card.setAttribute('aria-pressed', 'true');

  createSparkle(card);

  answers[questionId] = value;
  nextBtn.disabled = false;
  saveState();
  renderDots();

  const answeredCount = Object.keys(answers).length;
  progressBar.style.width = `${Math.round((answeredCount / questions.length) * 100)}%`;

  later(() => card.classList.remove('advancing'), 650);

  later(() => {
    if (currentQuestion < questions.length - 1) {
      navigateQuestion(1);
    } else {
      showLoading();
    }
  }, 500);
}

function navigateQuestion(direction) {
  if (navLocked) return;
  if (direction < 0 && currentQuestion === 0) return;
  if (direction > 0 && currentQuestion >= questions.length - 1) return;

  navLocked = true;
  selectionLocked = true;
  const card = questionScreen.querySelector('.question-card');

  card.style.transition = 'all 0.22s ease';
  card.style.opacity = '0';
  card.style.transform = `translateX(${direction > 0 ? -40 : 40}px)`;

  later(() => {
    currentQuestion += direction;
    renderQuestion();
    saveState();

    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = `translateX(${direction > 0 ? 40 : -40}px)`;

    requestAnimationFrame(() => {
      card.style.transition = 'all 0.38s var(--spring)';
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
      later(() => {
        card.style.transition = '';
        navLocked = false;
        selectionLocked = false;
      }, 400);
    });
  }, 200);
}

prevBtn.addEventListener('click', () => navigateQuestion(-1));
nextBtn.addEventListener('click', () => {
  const q = questions[currentQuestion];
  if (!answers[q.id]) return;
  if (currentQuestion === questions.length - 1) showLoading();
  else navigateQuestion(1);
});

// ============ LOADING ============
const loadingTexts = [
  'Analizando tu estilo…',
  'Buscando tu GWM ideal…',
  'Calculando compatibilidad…',
  '¡Casi listo!'
];

function resetLoadingSteps() {
  loadingSteps.forEach((step) => {
    step.classList.remove('active', 'done');
    const icon = step.querySelector('.loading-step-icon');
    if (icon) icon.textContent = String(Number(step.dataset.step) + 1);
  });
}

function showLoading() {
  if (loadingActive) return;
  loadingActive = true;
  selectionLocked = true;

  clearTimers();
  resetLoadingSteps();
  progressBar.style.width = '100%';
  loadingText.textContent = loadingTexts[0];
  swipeIndicator.classList.remove('pop');

  switchScreen(questionScreen, loadingScreen);

  let loadingVehicleIndex = 0;
  const cycleLoadingVehicle = () => {
    const modelKey = MODEL_KEYS[loadingVehicleIndex % MODEL_KEYS.length];
    loadingVehicleIndex += 1;
    if (models[modelKey]) setStageVehicle(models[modelKey].colors[0].image);
    later(cycleLoadingVehicle, 2000);
  };
  cycleLoadingVehicle();

  loadingSteps.forEach((step, index) => {
    later(() => {
      step.classList.add('active');
      loadingText.textContent = loadingTexts[index];
    }, index * 800);

    later(() => {
      step.classList.remove('active');
      step.classList.add('done');
      const icon = step.querySelector('.loading-step-icon');
      if (icon) icon.textContent = '✓';
    }, (index + 1) * 800);
  });

  later(() => {
    showResult();
  }, 3600);
}

// ============ SCORING ============
function calculateResult() {
  let bestKey = null;
  let bestModel = null;
  let bestScore = -Infinity;
  let bestTie = [];

  for (const [key, model] of Object.entries(models)) {
    let score = 0;
    for (const [questionId, answer] of Object.entries(answers)) {
      if (!questions.some((q) => q.id === questionId)) continue;
      const value = model.scores[answer];
      if (typeof value === 'number') score += value;
    }

    const tie = TIE_BREAK_ORDER.map((questionId) => {
      const answer = answers[questionId];
      return answer && typeof model.scores[answer] === 'number' ? model.scores[answer] : 0;
    });

    if (score > bestScore || (score === bestScore && lexGreater(tie, bestTie))) {
      bestScore = score;
      bestTie = tie;
      bestKey = key;
      bestModel = model;
    }
  }

  if (!bestModel) {
    bestKey = 'haval_h6';
    bestModel = models.haval_h6;
  }

  const maxPossible = questions.length * 3;
  const matchPercentValue = Math.min(98, Math.round((bestScore / maxPossible) * 100) + 10);

  return { key: bestKey, ...bestModel, matchPercent: matchPercentValue };
}

function lexGreater(a, b) {
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return a[i] > b[i];
  }
  return false;
}

// ============ RESULT ============
function showResult() {
  clearTimers();
  loadingActive = false;

  const result = calculateResult();
  currentResultData = result;
  currentColorIndex = 0;
  swipeSetupDone = false;
  clearState();

  const activeColor = result.colors[0];

  resultIntro.textContent = userName ? `${userName}, tu modelo ideal es` : 'Tu modelo ideal es';
  giantText.textContent = result.name.toUpperCase();
  giantText.style.color = '';
  resultTagline.textContent = result.tagline || '';

  setStageVehicle(result.mainImage);

  carImg.src = result.mainImage;
  carImg.alt = `${result.name} en color ${activeColor.name}`;

  swipeIndicator.textContent = `Desliza · 1 / ${result.colors.length} · ${activeColor.name}`;

  matchPercent.textContent = '0%';
  description.textContent = result.description || '';
  renderFeatures(result);

  preloadImages(result.colors);
  buildColorBar(result.colors);
  setupSwipe();

  switchScreen(loadingScreen, resultScreen, () => {
    resultScreen.scrollTop = 0;
    revealResult(result);
  });
}

function preloadImages(colors) {
  if (!Array.isArray(colors)) return;
  colors.forEach((color) => {
    if (!color || !color.image) return;
    const img = new Image();
    img.src = color.image;
  });
}

function buildColorBar(colors) {
  colorBar.innerHTML = '';
  colors.forEach((color, index) => {
    const square = document.createElement('div');
    square.className = 'result-color-square' + (index === 0 ? ' active' : '');
    square.style.backgroundColor = color.hex;
    if (color.hex.toUpperCase() === '#FFFFFF' || color.hex.toUpperCase() === '#F5F5F5') {
      square.style.border = '2px solid #ccc';
    }
    square.setAttribute('role', 'button');
    square.setAttribute('tabindex', '0');
    square.setAttribute('aria-label', `Color ${color.name}`);
    square.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    square.title = color.name;

    square.addEventListener('click', () => selectColor(index, square));
    square.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectColor(index, square);
      }
    });

    colorBar.appendChild(square);
  });
}

function revealResult(result) {
  const elements = [resultIntro, giantText, resultTagline, carHero, colorBar, swipeIndicator, matchSection, description, actions, resultFeatures];
  const featureCards = resultFeatures ? Array.from(resultFeatures.querySelectorAll('.feature-card')) : [];
  elements.forEach((el) => {
    if (!el) return;
    el.classList.remove('reveal-fade-up', 'reveal-pop', 'counting');
    void el.offsetWidth;
  });
  featureCards.forEach((el) => {
    el.classList.remove('reveal-fade-up');
    void el.offsetWidth;
  });

  // Reduced motion: show the full result immediately, no stagger, no confetti.
  if (reducedMotion.matches) {
    elements.forEach((el) => {
      if (el) el.classList.add('reveal-fade-up');
    });
    featureCards.forEach((el) => el.classList.add('reveal-fade-up'));
    animateCount(matchPercent, result.matchPercent);
    refreshIcons();
    return;
  }

  later(() => resultIntro.classList.add('reveal-fade-up'), 0);
  later(() => giantText.classList.add('reveal-pop'), 160);
  later(() => resultTagline.classList.add('reveal-fade-up'), 320);
  later(() => carHero.classList.add('reveal-pop'), 380);

  featureCards.forEach((el, index) => {
    later(() => el.classList.add('reveal-fade-up'), 480 + index * 70);
  });

  later(() => {
    launchConfetti();
    swipeIndicator.classList.add('reveal-fade-up');
  }, 700);
  later(() => colorBar.classList.add('reveal-fade-up'), 820);
  later(() => {
    matchSection.classList.add('reveal-fade-up');
    animateCount(matchPercent, result.matchPercent);
  }, 980);
  later(() => description.classList.add('reveal-fade-up'), 1120);
  later(() => actions.classList.add('reveal-fade-up'), 1260);
  later(() => refreshIcons(), MAX_REVEAL_WAIT);
}

function animateCount(element, target) {
  if (reducedMotion.matches) {
    element.textContent = `${target}%`;
    return;
  }

  const duration = 900;
  const start = performance.now();
  element.classList.add('counting');

  function frame(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = `${Math.round(target * eased)}%`;
    if (progress < 1) {
      countFrame = requestAnimationFrame(frame);
    } else {
      element.classList.remove('counting');
      countFrame = null;
    }
  }

  countFrame = requestAnimationFrame(frame);
}

// ============ COLORS / SWIPE ============
function selectColor(index, element) {
  if (!currentResultData) return;
  const total = currentResultData.colors.length;
  const wrapped = ((index % total) + total) % total;
  const color = currentResultData.colors[wrapped];
  currentColorIndex = wrapped;

  if (element) createSparkle(element);

  carImg.style.opacity = '0';
  later(() => {
    if (currentColorIndex !== wrapped) return;
    carImg.src = color.image;
    carImg.alt = `${currentResultData.name} en color ${color.name}`;
    carImg.style.opacity = '1';
    setStageVehicle(color.image);
  }, 200);

  const squares = colorBar.querySelectorAll('.result-color-square');
  squares.forEach((square, idx) => {
    const active = idx === wrapped;
    square.classList.toggle('active', active);
    square.setAttribute('aria-pressed', active ? 'true' : 'false');
    if (active) scrollColorIntoView(square);
  });

  swipeIndicator.textContent = `${wrapped + 1} / ${total} · ${color.name}`;
  swipeIndicator.classList.remove('pop');
  void swipeIndicator.offsetWidth;
  swipeIndicator.classList.add('pop');
  later(() => swipeIndicator.classList.remove('pop'), 250);
}

function scrollColorIntoView(square) {
  if (!square || !colorBar) return;
  const maxScroll = Math.max(0, colorBar.scrollWidth - colorBar.clientWidth);
  const target = square.offsetLeft - (colorBar.clientWidth - square.offsetWidth) / 2;
  const left = Math.max(0, Math.min(target, maxScroll));
  if (Math.abs(colorBar.scrollLeft - left) < 2) return;
  colorBar.scrollTo({
    left,
    behavior: reducedMotion.matches ? 'auto' : 'smooth'
  });
}

function swipeColor(direction) {
  if (!currentResultData) return;
  selectColor(currentColorIndex + direction);
}

function setupSwipe() {
  if (swipeSetupDone) return;
  swipeSetupDone = true;

  // One pointer = one gesture. Pointer events avoid the duplicate touch +
  // compatibility-mouse sequence that made the color jump two at a time.
  let startX = 0;
  let startY = 0;
  let activePointer = null;
  let lastSwipeAt = 0;

  const cancel = (event) => {
    if (event.pointerId !== activePointer) return;
    activePointer = null;
  };

  carHero.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    activePointer = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    try { carHero.setPointerCapture(event.pointerId); } catch (_) {}
  });

  carHero.addEventListener('pointerup', (event) => {
    if (activePointer !== event.pointerId) return;
    activePointer = null;
    try { carHero.releasePointerCapture(event.pointerId); } catch (_) {}

    const diffX = event.clientX - startX;
    const diffY = event.clientY - startY;
    if (Math.abs(diffX) < 46) return;
    if (Math.abs(diffX) < Math.abs(diffY) * 1.4) return;

    // Guard only against an accidental second gesture fired in the same frame.
    const now = performance.now();
    if (now - lastSwipeAt < 350) return;
    lastSwipeAt = now;
    swipeColor(diffX > 0 ? -1 : 1);
  });

  carHero.addEventListener('pointercancel', cancel);
  carHero.addEventListener('lostpointercapture', cancel);
}

// ============ CONFETTI / SPARKLES ============
function launchConfetti() {
  if (reducedMotion.matches) return;
  const palette = ['#D6202A', '#ff4757', '#ffd700', '#ffffff', '#1a1a1a'];
  confettiContainer.innerHTML = '';

  for (let i = 0; i < 150; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const size = 4 + Math.random() * 8;
    const shape = Math.random();
    piece.style.width = `${size}px`;
    piece.style.height = shape < 0.34 ? `${size}px` : shape < 0.67 ? `${size * 0.45}px` : `${size * 0.3}px`;
    piece.style.borderRadius = shape < 0.34 ? '50%' : shape < 0.67 ? '2px' : '1px';
    piece.style.background = palette[Math.floor(Math.random() * palette.length)];
    piece.style.left = `${50 + (Math.random() - 0.5) * 34}%`;
    piece.style.setProperty('--dx', `${(Math.random() - 0.5) * 92}vw`);
    piece.style.setProperty('--up', `${32 + Math.random() * 44}vh`);
    piece.style.setProperty('--rot', `${(Math.random() - 0.5) * 900}deg`);
    piece.style.animationDuration = `${4 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.6}s`;

    confettiContainer.appendChild(piece);
  }

  later(() => {
    confettiContainer.innerHTML = '';
  }, 7000);
}

function createSparkle(element) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const palette = ['#D6202A', '#ff4757', '#ffa8a8', '#ffd700', '#ff6b81'];

  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
    sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
    sparkle.style.background = palette[i];
    document.body.appendChild(sparkle);
    window.setTimeout(() => sparkle.remove(), 650);
  }
}

// ============ WAKE LOCK (kiosk nicety) ============
async function requestWakeLock() {
  if (!('wakeLock' in navigator)) return;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
  } catch (err) {
    wakeLock = null;
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && !wakeLock) {
    requestWakeLock();
  }
});

// ============ RESTART ============
restartBtn.addEventListener('click', restartQuiz);

function restartQuiz() {
  if (resultScreen.classList.contains('exiting')) return;
  clearTimers();
  loadingActive = false;
  selectionLocked = false;
  navLocked = false;
  currentQuestion = 0;
  answers = {};
  userName = '';
  currentColorIndex = 0;
  currentResultData = null;
  nameInput.value = '';
  updateNameState();
  progressBar.style.width = '0%';
  progressContainer.classList.remove('visible');
  confettiContainer.innerHTML = '';

  resetLoadingSteps();
  loadingText.textContent = loadingTexts[0];

  [resultIntro, giantText, resultTagline, carHero, colorBar, swipeIndicator, matchSection, description, actions, resultFeatures]
    .forEach((el) => {
      if (el) el.classList.remove('reveal-fade-up', 'reveal-pop', 'counting');
    });
  if (resultFeatures) resultFeatures.innerHTML = '';

  matchPercent.textContent = '0%';
  clearState();

  setStageVehicle('public/haval-h7-hamilton-white.webp');

  switchScreen(resultScreen, welcomeScreen, () => {
    nameInput.focus();
  });
}

// ============ INIT ============
document.body.dataset.screen = 'welcomeScreen';
setStageVehicle('public/haval-h7-hamilton-white.webp', true);
loadCaracteristicas();
updateNameState();
refreshIcons();
restoreState();
