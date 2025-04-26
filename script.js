const btnGroup = document.getElementById('typeBtnGroup');
const typeBtns = btnGroup.querySelectorAll('.type-btn');

typeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        typeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});
typeBtns[0].classList.add('active');

let taxDeductedActive = false;
const taxBtn = document.getElementById('taxDeductedBtn');
taxBtn.addEventListener('click', function () {
    taxDeductedActive = !taxDeductedActive;
    if (taxDeductedActive) {
        this.classList.add('active');
    } else {
        this.classList.remove('active');
    }
});
