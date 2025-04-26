const typeInput = document.createElement('input');
typeInput.type = "hidden";
typeInput.id = "type";
typeInput.value = "miniIndice";
document.getElementById('typeBtnGroup').appendChild(typeInput);

const btnGroup = document.getElementById('typeBtnGroup');
btnGroup.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        btnGroup.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        typeInput.value = this.dataset.type;
    });
});
btnGroup.querySelector('.type-btn[data-type="miniIndice"]').classList.add('active');
typeInput.value = "miniIndice";

let taxDeducted = false;
const taxBtn = document.getElementById('taxDeductedBtn');
taxBtn.addEventListener('click', function() {
    taxDeducted = !taxDeducted;
    if (taxDeducted) {
        this.classList.add('active');
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
        }, 200); // Demo: só para visual demo rápido do disabled
    } else {
        this.classList.remove('active');
    }
});
