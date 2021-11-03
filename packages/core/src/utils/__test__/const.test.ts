import { getColor } from '../const';
describe('getColor', () => {
  it('should be defined', () => {
    const colors = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
    ];
    expect(getColor(colors, 5)).toEqual([1, 5, 10, 14, 19]);
  });
});
