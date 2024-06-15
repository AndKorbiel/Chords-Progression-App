export const getBPM = (value) => {
  switch (value) {
    case '80':
      return 3000;

    case '90':
      return 2668;

    case '110':
      return 2180;

    case '120':
      return 2000;

    case '140':
      return 1716;

    case '160':
      return 1500;

    default:
      return 3000;
  }
};

export const getArrowAnimationSpeed = (BPM) => {
  switch (BPM) {
    case 1500:
      return 'one';

    case 1716:
      return 'two';

    case 2000:
      return 'three';

    case 2180:
      return 'four';

    case 2668:
      return 'five';

    default:
      return 'six';
  }
};
