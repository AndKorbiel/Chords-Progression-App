import { getArrowAnimationSpeed } from './utils';

describe('getArrowAnimationSpeed function', () => {
  test('returns default value if no BPM is given', () => {
    expect(getArrowAnimationSpeed()).toBe('six');
  });

  test('returns correct value for given BPM', () => {
    expect(getArrowAnimationSpeed(2000)).toBe('three');
  });
});
