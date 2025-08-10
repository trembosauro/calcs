function clearResult(form) {
  form.querySelectorAll('.result').forEach(r => r.innerText = '');
}

function showError(form, msg) {
  clearResult(form);
  form.querySelector('.result').innerText = "Error: " + msg;
}

function showCalculator(calculatorId) {
  document.querySelectorAll('.calculator').forEach(calc => calc.classList.remove('show'));
  document.getElementById(calculatorId).classList.add('show');
  document.querySelectorAll('.toggle-button').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-id') === calculatorId);
  });
}

document.querySelectorAll('.toggle-button').forEach(btn => {
  btn.addEventListener('click', () => showCalculator(btn.getAttribute('data-id')));
});

document.querySelectorAll('.calculator input, .calculator select').forEach(input => {
  input.addEventListener('input', e => {
    clearResult(e.target.closest('form'));
    if (e.target.closest('form').id === 'ruleOfThreeCalculator') {
      e.target.closest('form').querySelector('#inputX').value = '';
    }
  });
});

document.querySelectorAll('.calculator input').forEach(input => {
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      input.closest('form').dispatchEvent(new Event('submit'));
    }
  });
});

document.querySelectorAll('.calculator form').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    clearResult(form);

    switch(form.id) {
      case 'calculator': {
        const expr = form.querySelector('#operationInput').value.trim();
        if (!expr) return showError(form, "Input required");
        try {
          const result = math.evaluate(expr.replace(',', '.'));
          form.querySelector('.result').innerText = `Result: ${result}`;
        } catch {
          showError(form, "Invalid expression");
        }
        break;
      }
      case 'ruleOfThreeCalculator': {
        const A = toNumber(form.querySelector('#inputA').value);
        const B = toNumber(form.querySelector('#inputB').value);
        const C = toNumber(form.querySelector('#inputC').value);
        if (A === null || B === null || C === null) {
          form.querySelector('#inputX').value = '';
          return showError(form, "Fill all fields.");
        }
        const X = (B * C) / A;
        form.querySelector('#inputX').value = X.toFixed(2).replace('.', ',');
        form.querySelector('.result').innerText = `X = ${X.toFixed(2).replace('.', ',')}`;
        break;
      }
      case 'leverageCalculator': {
        const leverage = toNumber(form.querySelector('#leverage').value);
        const percentage = toNumber(form.querySelector('#percentage').value);
        if (leverage === null || percentage === null) return showError(form, "All fields required");
        const leveragedProfit = leverage * percentage;
        form.querySelector('.result').innerText = `Leveraged Profit: ${leveragedProfit.toFixed(2)}%`;
        break;
      }
      case 'profitCalculator': {
        const lotSize = toNumber(form.querySelector('#lotSize').value);
        const profit = toNumber(form.querySelector('#profit').value);
        if (lotSize === null || profit === null) return showError(form, "All fields required");
        const profitPercent = (profit / lotSize) * 100;
        form.querySelector('.result').innerText = `Profit: ${profitPercent.toFixed(2)}%`;
        break;
      }
      case 'compoundInterestCalculator': {
        const initialInvestment = toNumber(form.querySelector('#initialInvestment').value);
        const contribution = toNumber(form.querySelector('#contribution').value) || 0;
        const rate = toNumber(form.querySelector('#rate').value);
        const period = toNumber(form.querySelector('#period').value);
        const freq = form.querySelector('#compoundFrequency').value;
        if (initialInvestment === null || rate === null || period === null) return showError(form, "Main fields required");
        let total = initialInvestment;
        if (freq === 'daily' || freq === 'monthly') {
          for (let i = 0; i < period; i++) {
            total = (total + contribution) * (1 + rate / 100);
          }
        }
        form.querySelector('.result').innerText = `Total Value: ${total.toFixed(2)}`;
        break;
      }
      case 'b3ProfitCalculator': {
        const contracts = toNumber(form.querySelector('#contracts').value);
        const points = toNumber(form.querySelector('#points').value);
        const type = form.querySelector('#type').value;
        const taxDeducted = form.querySelector('#taxDeducted').checked;
        const contractValues = { miniIndice: 0.2, indice: 1, miniDolar: 10, dolar: 50 };
        if (contracts === null || points === null) return showError(form, "All fields required");
        if ((type === 'dolar' || type === 'indice') && contracts % 5 !== 0)
          return showError(form, 'Contracts must be multiples of 5 for Dollar and Index.');
        let total = contracts * contractValues[type] * points;
        if (taxDeducted) total *= 0.8;
        form.querySelector('.result').innerText = `Total Profit: ${total.toFixed(2)}`;
        break;
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector('main').classList.add('loaded');
  }, 60);
  showCalculator('calculator');
});
