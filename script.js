const calculators = document.querySelectorAll('.calculator');
const buttons = document.querySelectorAll('.toggle-button');

buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const id = this.getAttribute('data-id');
        calculators.forEach(calc => {
            if (calc.id === id) {
                calc.classList.add('show');
            } else {
                calc.classList.remove('show');
            }
        });
    });
});

// B3 profit type buttons (se existir)
const btnGroup = document.getElementById('typeBtnGroup');
if (btnGroup) {
    const typeBtns = btnGroup.querySelectorAll('.type-btn');
    typeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            typeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    typeBtns[0].classList.add('active');
}

// Tax Deducted button (se existir)
let taxDeductedActive = false;
const taxBtn = document.getElementById('taxDeductedBtn');
if (taxBtn) {
    taxBtn.addEventListener('click', function () {
        taxDeductedActive = !taxDeductedActive;
        if (taxDeductedActive) {
            this.classList.add('active');
        } else {
            this.classList.remove('active');
        }
    });
}
