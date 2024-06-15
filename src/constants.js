import kickSound from './assets/kick.mp3';
import hatSound from './assets/hat.mp3';

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

export const kick = new Audio(kickSound);
export const hat = new Audio(hatSound);

export const arrowsList = [
  'arrow1',
  'arrow2',
  'arrow3',
  'arrow4',
  'arrow5',
  'arrow6',
  'arrow7',
  'arrow8',
];
