export const ScatterColorScale = [
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
  '#5B8FF9',
];

export const SingleSequentialColorScale: { [key: string]: string[] } = {
  Blue: [
    '#D6EAFF',
    '#B3D9FF',
    '#80BFFF',
    '#4DA6FF',
    '#1A8CFF',
    '#0072E5',
    '#0059B2',
    '#004C99',
    '#003F7F',
    '#00264C',
  ],
  Green: [
    '#05B54F',
    '#169442',
    '#1B7536',
    '#1B572A',
    '#173B1F',
    '#DFF4E1',
    '#BFE8C3',
    '#9EDCA6',
    '#7ACF89',
    '#52C26C',
  ],
  Cyan: [
    '#E5F4FF',
    '#C9E9FF',
    '#ABDFFF',
    '#8AD4FF',
    '#61C9FF',
    '#22BAED',
    '#1B9CD0',
    '#227BA2',
    '#215B77',
    '#1D3D4E',
  ],
  Yellow: [
    '#FFF4DB',
    '#FFE9B8',
    '#FFDE94',
    '#FFD470',
    '#FFC741',
    '#EDB40A',
    '#D09C10',
    '#A37B16',
    '#795B16',
    '#503D14',
  ],
  Orange: [
    '#FFEAD8',
    '#FFD5B1',
    '#FFC08C',
    '#FFAB66',
    '#FF963E',
    '#F17F0B',
    '#D16A0C',
    '#A45411',
    '#794012',
    '#512C10',
  ],
  Red: [
    '#FFE2D5',
    '#FFC5AC',
    '#FFA884',
    '#FF895D',
    '#FF6836',
    '#F3470D',
    '#D13808',
    '#A4300C',
    '#7A270E',
    '#521E0D',
  ],
};
export const BipolarColorScale: { [key: string]: string[] } = {
  CyanRed: [
    '#215B77',
    '#227BA2',
    '#1B9CD0',
    '#22BAED',
    '#61C9FF',
    '#8AD4FF',
    '#ABDFFF',
    '#C9E9FF',
    '#F2EAEA',
    '#C9E9FF',
    '#ABDFFF',
    '#8AD4FF',
    '#61C9FF',
    '#22BAED',
    '#1B9CD0',
    '#227BA2',
    '#215B77',
  ],
  Classic: [
    '#661900',
    '#B22C00',
    '#E6450F',
    '#FF6500',
    '#FF8C00',
    '#FFB200',
    '#FFCB33',
    '#FFDF80',
    '#FFE2DC',
    '#EAACFF',
    '#DD78FF',
    '#C53FFF',
    '#A700FF',
    '#8500FF',
    '#4C00FF',
    '#3900E5',
    '#2C00B2',
  ],
};

export const PartialSpectraColorScale = {
  SunsetOrange: [
    '#FFF2CC',
    '#FFDF80',
    '#FFCB33',
    '#FFB200',
    '#FF8C00',
    '#FF6500',
    '#E6450F',
    '#B22C00',
    '#661900',
    '#330C00',
  ],
};

export function getColor(color: Array<string>, bandNum: number) {
  if (color.length <= bandNum || bandNum < 1 || !Array.isArray(color)) {
    return color;
  }

  const step = (color.length - 2) / (bandNum - 1);
  const result: Array<string> = [];
  result[0] = color[0];
  for (let i = 1; i < bandNum - 1; i += 1) {
    result[i] = color[Math.round(i * step)];
  }
  result[bandNum - 1] = color[color.length - 1];
  return result;
}
