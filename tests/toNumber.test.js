const { toNumber } = require('../toNumber');

describe('toNumber', () => {
  test('empty string returns null', () => {
    expect(toNumber('')).toBeNull();
  });

  test('strings with commas convert correctly', () => {
    expect(toNumber('1,23')).toBeCloseTo(1.23);
  });

  test('handles thousand separators and spaces', () => {
    expect(toNumber('1.234,56')).toBeCloseTo(1234.56);
    expect(toNumber('1,234.56')).toBeCloseTo(1234.56);
    expect(toNumber('1 234,56')).toBeCloseTo(1234.56);
  });

  test('non-numeric strings return null', () => {
    expect(toNumber('abc')).toBeNull();
  });
});
