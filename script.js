// Utils
function clearResult(selector) {
    document.getElementById(selector).innerText = "";
}
function showError(selector, msg) {
    document.getElementById(selector).innerText = "Error: " + msg;
}

// Troca visual das calculadoras (tabs/buttons)
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

// Eventos nos botões de calculadora
document.querySelectorAll('.toggle-button').forEach(btn => {
    btn.addEventListener('click', e => showCalculator(btn.getAttribute('data-id')));
});

// --- Normal Calculator ---
document.getElementById('calculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('normalResultText');
    const expression = document.getElementById('operationInput').value;
    if (!expression.trim()) {
        showError('normalResultText', "Input required");
        return;
    }
    try {
        // Use math.js para segurança!
        const result = math.evaluate(expression.replace(',', '.'));
        document.getElementById('normalResultText').innerText = `Result: ${result}`;
    } catch (err) {
        showError('normalResultText', "Invalid expression");
    }
});

// --- Rule of Three ---
document.getElementById('ruleOfThreeCalculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('ruleOfThreeResultText');
    const input1 = Number(document.getElementById('input1').value.replace(',', '.'));
    const input2 = Number(document.getElementById('input2').value.replace(',', '.'));
    if (!input1 || !input2) {
        showError('ruleOfThreeResultText', "All fields required");
        document.getElementById('result').value = '';
        return;
    }
    const result = (input2 * 100) / input1;
    document.getElementById('result').value = result.toFixed(2).replace('.', ',');
    document.getElementById('ruleOfThreeResultText').innerText = `Percentage: ${result.toFixed(2).replace('.', ',')}%`;
});

// --- Leverage Calculator ---
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

// --- Profit Percentage Calculator ---
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

// --- Compound Interest Calculator ---
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

// --- B3 Profit Calculator ---
document.getElementById('b3ProfitCalculator').addEventListener('submit', e => {
    e.preventDefault();
    clearResult('b3ProfitResultText');
    const contracts = Number(document.getElementById('contracts').value);
    const points = Number(document.getElementById('points').value.replace(',', '.'));
    const type = document.getElementById('type').value;
    const taxDeducted = document.getElementById('taxDeducted').checked;

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

// Inicialização + efeito de transição/fade-in
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('main').classList.add('loaded');
    }, 60);

    showCalculator('calculator');

    // Limpa resultado ao mudar inputs/selects
    document.querySelectorAll('.calculator input, .calculator select').forEach(input => {
        input.addEventListener('input', e => {
            const form = input.closest('form');
            form.querySelectorAll('.result').forEach(res => res.innerText = '');
            if (form.id === 'ruleOfThreeCalculator') form.querySelector('#result').value = '';
        });
    });

    // Enter aciona submit nos inputs
    document.querySelectorAll('.calculator input').forEach(input => {
        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                input.closest('form').dispatchEvent(new Event('submit'));
            }
        });
    });
});
