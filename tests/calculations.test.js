const { compoundInterestCalc, b3ProfitCalc } = require('../script');

describe('compoundInterestCalc', () => {
  test('calculates compound interest with contributions', () => {
    const total = compoundInterestCalc(1000, 100, 12, 1, 'monthly');
    const r = 0.12 / 12;
    const n = 12;
    const expected = 1000 * Math.pow(1 + r, n) + 100 * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    expect(total).toBeCloseTo(expected);
  });
});

describe('b3ProfitCalc', () => {
  test('computes profit with tax', () => {
    const total = b3ProfitCalc(10, 5, 'miniIndice', true);
    expect(total).toBeCloseTo(10 * 0.2 * 5 * 0.8);
  });
});

