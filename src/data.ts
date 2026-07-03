export interface Character {
  id: string;
  name: string;
  role: string;
  quote: string;
  description: string;
  stats: {
    velocidad: number;
    fuerza: number;
    tecnica: number;
    vision: number;
    mentalidad: number;
  };
}

export interface PreviewPage {
  pageNumber: number;
  title: string;
  sceneDescription: string;
  dialogueJapanese: string;
  dialogueSpanish: string;
  panelStyle: string;
  panels: Array<{
    id: string;
    subTitle: string;
    text: string;
    isKeyFrame: boolean;
    bgGradient: string;
  }>;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  comment: string;
  avatarInitials: string;
}

export const HOTMART_URL = "https://go.hotmart.com/U106596990V?dp=1&redirectionUrl=https%3A%2F%2Fhotmart.com%2Fes%2Fmarketplace%2Fproductos%2Fhagsxd-el-emperador-de-loky-biuu0%2FU106596990V";

export const MANGA_DETAILS = {
  title: "LOKY EL JUGADOR",
  subTitle: "El Emperador de Loky",
  author: "Francisco Javier Alvarez",
  format: "Digital (PDF de Alta Definición / Compatible con e-readers y móviles)",
  pages: "Más de 120 páginas de arte espectacular y narrativa de alto impacto",
  language: "Español",
  ageRating: "Recomendado para mayores de 12 años (Shonen Deportivo / Acción)",
  publisher: "Publicación Independiente de Élite",
  releaseDate: "Julio, 2026",
  priceOriginal: "USD 6.00",
  priceDiscount: "USD 3.00",
  tagline: "Su talento no tiene límites. Su reinado apenas comienza.",
  synopsis: `En el implacable submundo del fútbol clandestino, donde solo los más fuertes sobreviven y los registros estadísticos no significan nada frente a la supremacía absoluta, surge un jugador sin precedentes. Su nombre es LOKY, y no ha venido a jugar, ha venido a reinar. 

Equipado con un "Ojo de Emperador" capaz de prever y destrozar cualquier estrategia defensiva en milésimas de segundo, y un instinto competitivo devastador, Loky se abre paso por los estadios más brutales de la liga secreta. El trono del fútbol mundial lo espera, pero antes deberá aplastar la voluntad de los reyes caídos y demostrar que el verdadero talento es una fuerza de la naturaleza. No es un jugador común: es el Emperador absoluto.`
};

export const CHARACTERS: Character[] = [
  {
    id: "loky",
    name: "LOKY (#11)",
    role: "El Emperador / Delantero de Élite",
    quote: "俺は記録じゃない。伝説だ。(No soy un récord. Soy una leyenda.)",
    description: "Un genio indomable dotado de una visión espacial divina y un remate letal. Se rehúsa a encajar en esquemas tradicionales; para él, el campo es su tablero y los rivales, sus piezas.",
    stats: { velocidad: 98, fuerza: 89, tecnica: 97, vision: 99, mentalidad: 99 }
  },
  {
    id: "kaiser",
    name: "RYUJI 'EL SECTOR'",
    role: "Mediocampista Defensivo / El Muro de Hierro",
    quote: "Nadie cruza mi cuadrante sin pagar el precio.",
    description: "Famoso por su implacable dominio físico y un sistema de interceptación táctica milimétrica que asfixia a los delanteros más ágiles. Es el primer obstáculo hacia el trono de Loky.",
    stats: { velocidad: 84, fuerza: 96, tecnica: 88, vision: 92, mentalidad: 94 }
  },
  {
    id: "shin",
    name: "SHIN KAZUMA",
    role: "Extremo Veloz / El Relámpago Gris",
    quote: "Si pestañeas, ya habré celebrado el gol.",
    description: "Un velocista puro capaz de acelerar de 0 a 100 en un instante. Su velocidad punta de regate crea una estela de desconcierto en las defensas, desafiando incluso al Ojo del Emperador.",
    stats: { velocidad: 99, fuerza: 74, tecnica: 91, vision: 80, mentalidad: 88 }
  }
];

export const PREVIEW_PAGES: PreviewPage[] = [
  {
    pageNumber: 1,
    title: "El Desafío en la Lluvia",
    sceneDescription: "El campo clandestino tiembla bajo el agua helada. Loky se encuentra rodeado de tres defensores. La tensión es absoluta.",
    dialogueJapanese: "「お前の防衛線など、俺の目には止まって見える。」",
    dialogueSpanish: "\"Su línea defensiva... se ve inmóvil ante mis ojos.\"",
    panelStyle: "grid grid-cols-1 md:grid-cols-2 gap-4",
    panels: [
      {
        id: "p1_1",
        subTitle: "PANEL 1: El Asedio",
        text: "Tres gigantes con armaduras tácticas cierran el paso. La lluvia azota el césped. No hay espacio libre.",
        isKeyFrame: false,
        bgGradient: "from-zinc-900 to-black border-zinc-800"
      },
      {
        id: "p1_2",
        subTitle: "PANEL 2: El Ojo de Oro",
        text: "Primer plano de los ojos de Loky. Sus pupilas destellan un patrón geométrico áureo. El flujo del tiempo parece ralentizarse.",
        isKeyFrame: true,
        bgGradient: "from-zinc-900 via-gold-950 to-black border-gold-600/30"
      }
    ]
  },
  {
    pageNumber: 2,
    title: "La Ruptura del Espacio",
    sceneDescription: "Con un sutil toque de balón con el talón exterior, Loky realiza una trayectoria imposible que pasa por la rendija del bloqueo.",
    dialogueJapanese: "「王の歩みに、凡人は触れることすらできぬ。」",
    dialogueSpanish: "\"En el andar del rey, la gente común ni siquiera puede tocar el suelo.\"",
    panelStyle: "grid grid-cols-1 md:grid-cols-3 gap-4",
    panels: [
      {
        id: "p2_1",
        subTitle: "PANEL 1: Finta Explosiva",
        text: "Un movimiento lateral de hombros hace que el defensor central de Ryuji pierda el equilibrio completamente.",
        isKeyFrame: false,
        bgGradient: "from-zinc-900 to-black border-zinc-800"
      },
      {
        id: "p2_2",
        subTitle: "PANEL 2: La Rendija",
        text: "La pelota pasa a milímetros de la bota defensiva. Una estela de viento dorado rasga el suelo empapado.",
        isKeyFrame: true,
        bgGradient: "from-zinc-950 via-zinc-900 to-black border-gold-500/20"
      },
      {
        id: "p2_3",
        subTitle: "PANEL 3: Humillación",
        text: "Los tres defensores giran sus cabezas en cámara lenta, congelados en pánico. Loky ya está detrás de ellos.",
        isKeyFrame: false,
        bgGradient: "from-zinc-900 to-black border-zinc-800"
      }
    ]
  },
  {
    pageNumber: 3,
    title: "El Tiro del Soberano",
    sceneDescription: "Frente al portero gigante. Loky se eleva con el balón, suspendido en el aire, preparando un disparo con un efecto devastador.",
    dialogueJapanese: "「これが王の判決だ。」",
    dialogueSpanish: "\"Esta es la sentencia del rey.\"",
    panelStyle: "grid grid-cols-1 md:grid-cols-2 gap-4",
    panels: [
      {
        id: "p3_1",
        subTitle: "PANEL 1: Carga Absoluta",
        text: "Loky carga su pierna derecha. Su aura de fútbol se concentra en un vórtice dorado cegador alrededor de su bota.",
        isKeyFrame: true,
        bgGradient: "from-zinc-950 via-gold-950 to-black border-gold-500/40"
      },
      {
        id: "p3_2",
        subTitle: "PANEL 2: Destrucción de la Red",
        text: "El balón es disparado a velocidades de huracán. El portero vuela pero la pelota quema el aire y desgarra la red del arco en un estallido de energía.",
        isKeyFrame: true,
        bgGradient: "from-black via-zinc-900 to-zinc-950 border-gold-400/40"
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Marcos G.",
    role: "Coleccionista de Manga & Crítico",
    rating: 5,
    comment: "El estilo artístico es brutal, me recuerda a la adrenalina de Blue Lock pero con un tono mucho más oscuro y maduro. La historia de Loky te atrapa desde la primera página.",
    avatarInitials: "MG"
  },
  {
    id: "t2",
    name: "Valentina S.",
    role: "Ilustradora Profesional",
    rating: 5,
    comment: "Técnicamente el dibujo es impecable. El uso del contraste en tinta negra con los destellos y el dinamismo en los partidos es pura cátedra de cómo dibujar manga deportivo de élite.",
    avatarInitials: "VS"
  },
  {
    id: "t3",
    name: "Alex K.",
    role: "Lector Apasionado",
    rating: 5,
    comment: "¡No soy un récord, soy una leyenda! Esa frase se me quedó grabada. Los personajes tienen un diseño de primer nivel y la compra en Hotmart fue instantánea e interactiva. ¡Recomendado 100%!",
    avatarInitials: "AK"
  }
];
