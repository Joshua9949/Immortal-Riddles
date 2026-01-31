export interface God {
  id: string;
  name: string;
  pantheon: 'Greek' | 'Norse' | 'Egyptian' | 'Hindu' | 'Roman' | 'Japanese';
  domain: string;
  hints: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export const gods: God[] = [
  // Greek
  {
    id: 'zeus',
    name: 'Zeus',
    pantheon: 'Greek',
    domain: 'King of Gods, Sky & Thunder',
    hints: [
      'Rules from Mount Olympus',
      'Wields thunderbolts as weapons',
      'Father of many heroes and gods',
    ],
    difficulty: 'easy',
  },
  {
    id: 'poseidon',
    name: 'Poseidon',
    pantheon: 'Greek',
    domain: 'Sea, Storms & Earthquakes',
    hints: [
      'Brother of Zeus',
      'Carries a mighty trident',
      'Protector of sailors',
    ],
    difficulty: 'easy',
  },
  {
    id: 'athena',
    name: 'Athena',
    pantheon: 'Greek',
    domain: 'Wisdom & Strategic Warfare',
    hints: [
      'Born from the head of Zeus',
      'Her symbol is the owl',
      'Patron of Athens',
    ],
    difficulty: 'medium',
  },
  {
    id: 'hades',
    name: 'Hades',
    pantheon: 'Greek',
    domain: 'Underworld & The Dead',
    hints: [
      'Rules the realm of the deceased',
      'Owns a helm of invisibility',
      'Kidnapped Persephone',
    ],
    difficulty: 'medium',
  },
  
  // Norse
  {
    id: 'odin',
    name: 'Odin',
    pantheon: 'Norse',
    domain: 'Wisdom, War & Death',
    hints: [
      'Sacrificed an eye for wisdom',
      'Rides an eight-legged horse named Sleipnir',
      'Father of Thor and ruler of Asgard',
    ],
    difficulty: 'easy',
  },
  {
    id: 'thor',
    name: 'Thor',
    pantheon: 'Norse',
    domain: 'Thunder, Lightning & Storms',
    hints: [
      'Wields a hammer called Mjolnir',
      'Protector of mankind',
      'Son of Odin',
    ],
    difficulty: 'easy',
  },
  {
    id: 'loki',
    name: 'Loki',
    pantheon: 'Norse',
    domain: 'Mischief & Trickery',
    hints: [
      'A shapeshifter and master of deception',
      'Father of Fenrir and the Midgard Serpent',
      'Causes Ragnarök',
    ],
    difficulty: 'medium',
  },
  {
    id: 'freya',
    name: 'Freya',
    pantheon: 'Norse',
    domain: 'Love, Beauty & War',
    hints: [
      'Rides a chariot pulled by cats',
      'Possesses a feathered cloak',
      'Leader of the Valkyries',
    ],
    difficulty: 'hard',
  },

  // Egyptian
  {
    id: 'anubis',
    name: 'Anubis',
    pantheon: 'Egyptian',
    domain: 'Mummification & Afterlife',
    hints: [
      'Has the head of a jackal',
      'Guides souls to the underworld',
      'Weighs hearts against a feather',
    ],
    difficulty: 'easy',
  },
  {
    id: 'ra',
    name: 'Ra',
    pantheon: 'Egyptian',
    domain: 'Sun & Creation',
    hints: [
      'Travels across the sky in a solar boat',
      'Has a falcon head with a sun disk',
      'Supreme deity of ancient Egypt',
    ],
    difficulty: 'easy',
  },
  {
    id: 'osiris',
    name: 'Osiris',
    pantheon: 'Egyptian',
    domain: 'Resurrection & Fertility',
    hints: [
      'Murdered by his brother Set',
      'Judge of the dead',
      'Depicted with green skin',
    ],
    difficulty: 'medium',
  },
  {
    id: 'isis',
    name: 'Isis',
    pantheon: 'Egyptian',
    domain: 'Magic & Motherhood',
    hints: [
      'Wife and sister of Osiris',
      'Mother of Horus',
      'Wears a throne-shaped headdress',
    ],
    difficulty: 'medium',
  },

  // Hindu
  {
    id: 'vishnu',
    name: 'Vishnu',
    pantheon: 'Hindu',
    domain: 'Preservation & Protection',
    hints: [
      'Has ten avatars including Krishna and Rama',
      'Holds a discus called Sudarshana Chakra',
      'Rests on a cosmic serpent',
    ],
    difficulty: 'easy',
  },
  {
    id: 'shiva',
    name: 'Shiva',
    pantheon: 'Hindu',
    domain: 'Destruction & Transformation',
    hints: [
      'Known as the cosmic dancer',
      'Has a third eye on the forehead',
      'Wears a crescent moon in his hair',
    ],
    difficulty: 'easy',
  },
  {
    id: 'ganesha',
    name: 'Ganesha',
    pantheon: 'Hindu',
    domain: 'Beginnings & Obstacle Removal',
    hints: [
      'Has the head of an elephant',
      'Son of Shiva and Parvati',
      'Rides a mouse as his vehicle',
    ],
    difficulty: 'medium',
  },
  {
    id: 'kali',
    name: 'Kali',
    pantheon: 'Hindu',
    domain: 'Time, Death & Doomsday',
    hints: [
      'Has a dark or blue complexion',
      'Wears a garland of skulls',
      'Fierce goddess who destroys evil',
    ],
    difficulty: 'hard',
  },

  // Roman
  {
    id: 'mars',
    name: 'Mars',
    pantheon: 'Roman',
    domain: 'War & Agriculture',
    hints: [
      'Father of Romulus and Remus',
      'Second most important god after Jupiter',
      'A month is named after him',
    ],
    difficulty: 'medium',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    pantheon: 'Roman',
    domain: 'Sky, Thunder & King of Gods',
    hints: [
      'Roman equivalent of Zeus',
      'A planet is named after him',
      'Chief deity of the Roman state',
    ],
    difficulty: 'medium',
  },

  // Japanese
  {
    id: 'amaterasu',
    name: 'Amaterasu',
    pantheon: 'Japanese',
    domain: 'Sun & Universe',
    hints: [
      'Hid in a cave causing darkness',
      'Ancestor of the Japanese imperial line',
      'Born from the left eye of Izanagi',
    ],
    difficulty: 'hard',
  },
  {
    id: 'susanoo',
    name: 'Susanoo',
    pantheon: 'Japanese',
    domain: 'Sea & Storms',
    hints: [
      'Brother of Amaterasu',
      'Slew the eight-headed serpent Yamata no Orochi',
      'Found the legendary sword Kusanagi',
    ],
    difficulty: 'hard',
  },
];

export function getRandomGod(exclude: string[] = []): God {
  const available = gods.filter(g => !exclude.includes(g.id));
  if (available.length === 0) {
    return gods[Math.floor(Math.random() * gods.length)];
  }
  return available[Math.floor(Math.random() * available.length)];
}

export function checkGuess(guess: string, godName: string): boolean {
  return guess.toLowerCase().trim() === godName.toLowerCase();
}

export function getScoreForDifficulty(difficulty: God['difficulty']): number {
  switch (difficulty) {
    case 'easy': return 10;
    case 'medium': return 25;
    case 'hard': return 50;
  }
}

export function getPantheonColor(pantheon: God['pantheon']): string {
  switch (pantheon) {
    case 'Greek': return 'from-blue-500 to-cyan-400';
    case 'Norse': return 'from-violet-500 to-purple-400';
    case 'Egyptian': return 'from-amber-500 to-yellow-400';
    case 'Hindu': return 'from-orange-500 to-red-400';
    case 'Roman': return 'from-red-500 to-rose-400';
    case 'Japanese': return 'from-pink-500 to-fuchsia-400';
  }
}

export function getPantheonIcon(pantheon: God['pantheon']): string {
  switch (pantheon) {
    case 'Greek': return '⚡';
    case 'Norse': return '🪓';
    case 'Egyptian': return '☥';
    case 'Hindu': return '🕉️';
    case 'Roman': return '🏛️';
    case 'Japanese': return '🌸';
  }
}
