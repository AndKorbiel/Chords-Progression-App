export const SPACE_CHORD = 'Line Break';

export const CHORDS = [
  'C',
  'Cm',
  'C#',
  'C#m',
  'D',
  'Dm',
  'D#',
  'D#m',
  'E',
  'Em',
  'F',
  'Fm',
  'F#',
  'F#m',
  'G',
  'Gm',
  'G#',
  'G#m',
  'A',
  'Am',
  'A#',
  'A#m',
  'B',
  'Bm',
  SPACE_CHORD,
];

export const DEFAULT_STRUMMING_PATTERN = [
  { id: '1', value: 'down' },
  { id: '1and', value: 'down' },
  { id: '2', value: 'down' },
  { id: '2and', value: 'down' },
  { id: '3', value: 'down' },
  { id: '3and', value: 'down' },
  { id: '4', value: 'down' },
  { id: '4and', value: 'down' },
];
export const BPM_OPTIONS = [80, 90, 110, 120, 140, 160];
export const kickSound =
  'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/14[kb]analogbd.aif.mp3';
export const hatSound =
  'https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/16[kb]ec-hat081.wav.mp3';

export const kick = new Audio(kickSound);
export const hat = new Audio(hatSound);
