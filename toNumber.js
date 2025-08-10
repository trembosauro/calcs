function toNumber(value) {
  if (value === '') return null;
  const num = Number(value.replace(',', '.'));
  return isNaN(num) ? null : num;
}

if (typeof module !== 'undefined') {
  module.exports = { toNumber };
}
