export const getBPM = (value) => {
  let nextBPM;

  switch (value) {
    case 80:
      nextBPM = 3000;
      break;
    case 90:
      nextBPM = 2668;
      break;
    case 110:
      nextBPM = 2180;
      break;
    case 120:
      nextBPM = 2000;
      break;
    case 140:
      nextBPM = 1716;
      break;
    case 160:
      nextBPM = 1500;
      break;
    default:
      nextBPM = 3000;
      break;
  }

  return { nextBPM };
};
