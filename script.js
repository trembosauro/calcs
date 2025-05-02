// Utility functions
function clearResult(selector) {
    document.getElementById(selector).innerText = "";
}
function showError(selector, msg) {
    document.getElementById(selector).innerText = "Error: " + msg;
}

// Tab/button logic for showing calculators
function showCalculator(calculatorId) {
    document.querySelectorAll('.calculator').forEach(calc => calc.classList.remove('show'));
    document.getElementById(calculatorId).classList.add('show');
    document.querySelectorAll('.toggle-button').forEach(btn => {
        if (btn.getAttribute('data-id') === calculatorId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
// Attach event listener to calculator tab buttons
document.querySelectorAll('.toggle-button').forEach(btn => {
    btn.addEventListener('click', e => showCalculator(btn.getAttribute('data-id')));
});

// Normal calculator (math expression)
document.getElementById('calculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('normalResultText');
    const expression = document.getElementById('operationInput').value;
    if (!expression.trim()) {
        showError('normalResultText', "Input required");
        return;
    }
    try {
        // Use math.js for secure calculation!
        const result = math.evaluate(expression.replace(',', '.'));
        document.getElementById('normalResultText').innerText = `Result: ${result}`;
    } catch (err) {
        showError('normalResultText', "Invalid expression");
    }
});

// Rule of Three calculator
document.getElementById('ruleOfThreeCalculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('ruleOfThreeResultText');
    const A = Number(document.getElementById('inputA').value.replace(',', '.'));
    const B = Number(document.getElementById('inputB').value.replace(',', '.'));
    const C = Number(document.getElementById('inputC').value.replace(',', '.'));
    if (!A || !B || !C) {
        showError('ruleOfThreeResultText', "Fill all fields.");
        document.getElementById('inputX').value = '';
        return;
    }
    const X = (B * C) / A;
    document.getElementById('inputX').value = X.toFixed(2).replace('.', ',');
    document.getElementById('ruleOfThreeResultText').innerText = `X = ${X.toFixed(2).replace('.', ',')}`;
});


// Leverage calculator
document.getElementById('leverageCalculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('leveragedProfitResultText');
    const leverage = Number(document.getElementById('leverage').value.replace(',', '.'));
    const percentage = Number(document.getElementById('percentage').value.replace(',', '.'));
    if (!leverage || !percentage) {
        showError('leveragedProfitResultText', "All fields required");
        return;
    }
    const leveragedProfit = leverage * percentage;
    document.getElementById('leveragedProfitResultText').innerText = `Leverage Profit: ${leveragedProfit.toFixed(2)}%`;
});

// Profit percentage calculator
document.getElementById('profitCalculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('profitResultText');
    const lotSize = Number(document.getElementById('lotSize').value.replace(',', '.'));
    const profit = Number(document.getElementById('profit').value.replace(',', '.'));
    if (!lotSize || !profit) {
        showError('profitResultText', "All fields required");
        return;
    }
    document.getElementById('profitResultText').innerText = `Profit: ${(profit / lotSize * 100).toFixed(2)}%`;
});

// Compound Interest calculator
document.getElementById('compoundInterestCalculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('compoundInterestResultText');
    const initialInvestment = Number(document.getElementById('initialInvestment').value.replace(',', '.'));
    const contribution = Number(document.getElementById('contribution').value.replace(',', '.')) || 0;
    const rate = Number(document.getElementById('rate').value.replace(',', '.')) / 100;
    const period = Number(document.getElementById('period').value.replace(',', '.'));
    const freq = document.getElementById('compoundFrequency').value;
    if (!initialInvestment || !rate || !period) {
        showError('compoundInterestResultText', "Main fields required");
        return;
    }
    let total = initialInvestment;
    if (freq === 'daily' || freq === 'monthly') {
        for (let i = 0; i < period; i++) {
            total = (total + contribution) * (1 + rate);
        }
    }
    document.getElementById('compoundInterestResultText').innerText = `Total Value: ${total.toFixed(2)}`;
});

// B3 Profit calculator
document.getElementById('b3ProfitCalculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('b3ProfitResultText');
    const contracts = Number(document.getElementById('contracts').value);
    const points = Number(document.getElementById('points').value.replace(',', '.'));
    const type = document.getElementById('type').value;
    const taxDeducted = document.getElementById('taxDeducted').checked;
    // Contract values map
    let contractValues = { miniIndice: 0.2, indice: 1, miniDolar: 10, dolar: 50 };
    let contractValue = contractValues[type];
    if (!contracts || !points) {
        showError('b3ProfitResultText', "All fields required");
        return;
    }
    if ((type === 'dolar' || type === 'indice') && contracts % 5 !== 0) {
        showError('b3ProfitResultText', 'Contracts must be multiples of 5 for Dollar and Index.');
        return;
    }
    let total = contracts * contractValue * points;
    if (taxDeducted) total *= 0.8;
    document.getElementById('b3ProfitResultText').innerText = `Total Profit: ${total.toFixed(2)}`;
});

// Initialization and fade-in effect
document.addEventListener('DOMContentLoaded', () => {
    // Executes fade-in on page load for main container
    setTimeout(() => {
        document.querySelector('main').classList.add('loaded');
    }, 60);
    // Show the first calculator by default when page loads
    showCalculator('calculator');
    // Clear results when any input/select is changed
    document.querySelectorAll('.calculator input, .calculator select').forEach(input => {
        input.addEventListener('input', e => {
            const form = input.closest('form');
            form.querySelectorAll('.result').forEach(res => res.innerText = '');
            if (form.id === 'ruleOfThreeCalculator') form.querySelector('#result').value = '';
        });
    });
    // Pressing Enter in any input triggers the form submit
    document.querySelectorAll('.calculator input').forEach(input => {
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.closest('form').dispatchEvent(new Event('submit'));
            }
        });
    });
});
