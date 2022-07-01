const phoneBtn = document.querySelectorAll('.phone-button');
const selectButtons = document.querySelectorAll('.selected-option');
const itemListChoose = document.querySelectorAll('.dropdown-list-item');
const deleteBtn = document.querySelector('.delete-btn');
const selectedTexts = document.querySelectorAll('.text-change');
let phoneChange = 0;
let selectText;




//phone button change

function changePhoneText(item) {
    if(phoneChange === 0) {
        item.style.display = "none";
        phoneBtn[1].style.display = "";
        phoneChange++;
    } else if(phoneChange === 1) {
        item.style.display = "none";
        phoneBtn[0].style.display = "";
        phoneChange--;
    }
}

phoneBtn.forEach((item) => {
    item.addEventListener('click', () => {
        changePhoneText(item);
    });
});



//select options 

selectButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
        const selectButton = e.currentTarget;
        const dropDownList = selectButton.parentNode.querySelector('.dropdown-list');

        dropDownList.classList.toggle('dropdown-list--active');
        selectButton.classList.toggle('selected-option--active');
        
    });
});

itemListChoose.forEach((item) => {
    item.addEventListener('click', (e) => {
        const curentItem = e.currentTarget;
        selectText = curentItem.parentNode.parentNode.querySelector('.text-change');
        const dropDownList = curentItem.parentNode.parentNode.querySelector('.dropdown-list');
        const selectedBtn = curentItem.parentNode.parentNode.querySelector('.selected-option');

        dropDownList.classList.remove('dropdown-list--active');
        selectedBtn.classList.toggle('selected-option--active');
        

        selectText.textContent = curentItem.textContent;
        selectText.classList.add('changed');
    });
});

deleteBtn.addEventListener('click', () => { 
    const changedText = [...selectedTexts].filter((item) => item.classList.contains('changed'));

    changedText.forEach((item) => {
        const defaultText = item.parentNode.querySelector('.default-text');
        item.textContent = defaultText.value;

        if(item.classList.contains('changed')) {
            item.classList.remove('changed');
        }
    });
});


