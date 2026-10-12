/**
 * Internationalization (i18n) module based on macOS system configuration
 */

export function getSystemLocale(): string {
  if (typeof navigator !== 'undefined') {
    const first = navigator.languages?.[0];
    if (first) {
      return first;
    }
    if (navigator.language) {
      return navigator.language;
    }
  }
  return 'en-US';
}

export function isSpanishLocale(): boolean {
  const loc = getSystemLocale().toLowerCase();
  return loc.startsWith('es');
}

export interface Translations {
  common: {
    garden: string;
    sweetTime: string;
    calendar: string;
    dragHint: string;
  };
  weather: {
    feelsLike: string;
    rainChance: string;
    conditions: Record<string, string>;
  };
  calendar: {
    weekdays: string[]; // 7 days starting on Sunday
    eventCount: (count: number) => string;
    lovelyDay: string;
    todayNote: string;
  };
  teddy: {
    tagLabel: string;
    quotes: string[];
  };
  diary: {
    title: string;
    subtitle: string;
    empty: string;
    thoughtLabel: string;
    defaultTasks: { text: string; done: boolean }[];
    thought: string;
  };
  blushSystem: {
    title: string;
    subtitle: string;
    cpu: string;
    memory: string;
    battery: string;
    storage: string;
    charging: string;
    plugged: string;
    discharging: string;
    free: string;
    used: string;
  };
}

export const translations: Record<'es' | 'en', Translations> = {
  en: {
    common: {
      garden: 'Garden',
      sweetTime: 'Sweet Time',
      calendar: 'My Calendar',
      dragHint: 'Drag to move • Double-click to reset position',
    },
    weather: {
      feelsLike: 'Feels like',
      rainChance: 'rain',
      conditions: {
        sunny: 'Sunny in the garden',
        partlyCloudy: 'Soft cloudy sky',
        cloudy: 'Cozy and overcast',
        rainy: 'Gentle rain on the flowers',
        stormy: 'Garden thunderstorm',
        snowy: 'Pastel snowflake day',
        night: 'Serene starry night',
      },
    },
    calendar: {
      weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      eventCount: (n) => `${n} event${n > 1 ? 's' : ''} this month`,
      lovelyDay: 'Lovely day in the garden',
      todayNote: "Today's Note",
    },
    teddy: {
      tagLabel: 'Cozy Corner',
      quotes: [
        'You are wonderful, do not forget',
        'Take a soft pause and breathe',
        'Sweet days with a happy heart',
        'Everything will turn out lovely today',
        'Remember to drink fresh water',
        'A peaceful moment to daydream',
        'Do things gently with love and calm',
      ],
    },
    diary: {
      title: 'Strawberry Diary',
      subtitle: 'Notes & Tasks',
      empty: 'Create ~/.strawberry-diary.txt for notes',
      thoughtLabel: 'Thought of the day',
      defaultTasks: [
        { text: 'Sweet breakfast with fresh berries', done: true },
        { text: 'Drink water and stretch gently', done: false },
        { text: 'Focus on lovely creative work', done: false },
        { text: 'Rest your eyes and breathe softly', done: false },
      ],
      thought: 'Doing things with tenderness brightens everything',
    },
    blushSystem: {
      title: 'Blush System',
      subtitle: 'Mac System Status',
      cpu: 'Processor',
      memory: 'Memory RAM',
      battery: 'Battery',
      storage: 'Storage',
      charging: 'Charging',
      plugged: 'Plugged in',
      discharging: 'On battery',
      free: 'free',
      used: 'used',
    },
  },
  es: {
    common: {
      garden: 'Jardín',
      sweetTime: 'Sweet Time',
      calendar: 'Mi Calendario',
      dragHint: 'Arrastra para mover • Doble clic para restablecer posición',
    },
    weather: {
      feelsLike: 'Sensación',
      rainChance: 'lluvia',
      conditions: {
        sunny: 'Soleado en el jardín',
        partlyCloudy: 'Cielo suave con nubes',
        cloudy: 'Nublado y acogedor',
        rainy: 'Lluvia fresca en las flores',
        stormy: 'Tormenta en el jardín',
        snowy: 'Copos de nieve pastel',
        night: 'Noche serena y estrellada',
      },
    },
    calendar: {
      weekdays: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      eventCount: (n) => `${n} evento${n > 1 ? 's' : ''} este mes`,
      lovelyDay: 'Día hermoso en el jardín',
      todayNote: 'Nota de hoy',
    },
    teddy: {
      tagLabel: 'Rincón de Cariño',
      quotes: [
        'Eres maravillosa, no lo olvides',
        'Toma una pausa y respira suave',
        'Días dulces con corazón contento',
        'Todo va a salir bonito hoy',
        'Recuerda tomar agua fresca',
        'Un ratito para soñar despierta',
        'Haz las cosas con calma y cariño',
      ],
    },
    diary: {
      title: 'Strawberry Diary',
      subtitle: 'Notas & Pendientes',
      empty: 'Crea ~/.strawberry-diary.txt para tus notas',
      thoughtLabel: 'Pensamiento del día',
      defaultTasks: [
        { text: 'Desayunar rico con fresitas', done: true },
        { text: 'Tomar agua y estirar la espalda', done: false },
        { text: 'Avanzar en los proyectos bonitos', done: false },
        { text: 'Descansar la vista y sonreír', done: false },
      ],
      thought: 'Hacer las cosas con ternura cambia todo el día',
    },
    blushSystem: {
      title: 'Blush System',
      subtitle: 'Estado de la Mac',
      cpu: 'Procesador',
      memory: 'Memoria RAM',
      battery: 'Batería',
      storage: 'Almacenamiento',
      charging: 'Cargando',
      plugged: 'Conectado',
      discharging: 'En batería',
      free: 'libre',
      used: 'usado',
    },
  },
};

/**
 * Returns the active translation package adhering strictly to the Sxnnyside English standard
 */
export function getI18n(): Translations {
  return translations.en;
}

/**
 * Formats a date using canonical English locale adhering to Sxnnyside standard
 */
export function formatSystemDate(date: Date, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
