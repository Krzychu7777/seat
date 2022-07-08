const phoneBtn = document.querySelectorAll('.phone-button');
const selectButtons = document.querySelectorAll('.selected-option');
const itemListChoose = document.querySelectorAll('.dropdown-list-item');
const deleteBtn = document.querySelector('.delete-btn');
const selectedTexts = document.querySelectorAll('.text-change');
const findingItems = document.querySelectorAll('.find-element');
const btnSearch  = document.querySelector('.button-search');
const carCount = document.getElementById('car-count');
const main = document.querySelector('main');
let phoneChange = 0;
let selectText;
let dropDownFilters;
let selectButton;
let filters = {
    model: "",
    gearbox: "",
    gasoline: "",
    location: ""
};


//phone button change

function changePhoneText(item) {
    if(phoneChange === 0) {
        item.style.display = "none";
        phoneBtn[1].style.display = "";
    }
}

phoneBtn.forEach((item) => {
    item.addEventListener('click', () => {
        changePhoneText(item);
    });
});

//select options

function changeFilterValues(currentItem, selectClass, defaultClass) {
    const dropDownList = currentItem.parentNode.parentNode.querySelector('.dropdown-list');
    const selectedBtn = currentItem.parentNode.parentNode.querySelector('.selected-option');
    const selectValue = currentItem.parentNode.parentNode.querySelector(selectClass);
    const defaultValue = currentItem.parentNode.parentNode.querySelector(defaultClass);
    selectText = currentItem.parentNode.parentNode.querySelector('.text-change');

    dropDownList.classList.remove('dropdown-list--active');
    selectedBtn.classList.toggle('selected-option--active');
    
    selectValue.value = currentItem.textContent;
    selectText.textContent = currentItem.textContent;

    if(selectValue.value == defaultValue.value) {
        selectValue.value = "";
    }
}

function chooseFilterValue(e) {
        const currentItem = e.currentTarget;
        const sortingItem = currentItem.parentNode;
        changeFilterValues(currentItem, '.select-value', '.default-text')

        if(!sortingItem.classList.contains('sort-options')) {
            selectText.classList.add('changed');
        }
}

function clearCategory() {
    const changedText = [...selectedTexts].filter((item) => item.classList.contains('changed'));

    changedText.forEach((item) => {
        const defaultText = item.parentNode.querySelector('.default-text');
        const selectValueReset = item.parentNode.querySelector('.select-value');
        item.textContent = defaultText.value;
        selectValueReset.value = "";

        if(item.classList.contains('changed')) {
            item.classList.remove('changed');
        }
    });
}

function openDropDownList(e) {
    selectButton = e.currentTarget;
    dropDownFilters = selectButton.parentNode.querySelector('.dropdown-list');
        
    dropDownFilters.classList.toggle('dropdown-list--active');
    selectButton.classList.toggle('selected-option--active');
}

selectButtons.forEach((item) => {
    item.addEventListener('click', openDropDownList);
});

itemListChoose.forEach((item) => {
    item.addEventListener('click', chooseFilterValue);
});

deleteBtn.addEventListener('click', clearCategory);

main.addEventListener('click', (e) => {
    const mainTarget = e.target;
    // const dropDownSelect = mainTarget.querySelector('.selected-option');
    // const dropDownSelectText = mainTarget.querySelector('.selected-option p');

    // console.log(dropDownSelect);
    // if(mainTarget != dropDownSelect && mainTarget != dropDownSelectText) {
    //     dropDownFilters.classList.remove('dropdown-list--active');
    //     selectButton.classList.remove('selected-option--active');
    // }

});


//filters

function filterValue() {
    const selectValues = document.querySelectorAll('.select-value');

    selectValues.forEach((input) => {
        filters[input.name] = input.value;
    });
}

function carFiltering() {
    const findingItems = document.querySelectorAll('.find-element');

    findingItems.forEach((item) => {
        item.classList.add('find-element--active');

        let carFilters = {
            model: item.dataset.model,
            gearbox: item.dataset.gearbox,
            gasoline: item.dataset.gasoline,
            location: item.dataset.location
        }

        for(key in filters) {
            if(filters[key].toLowerCase() !== carFilters[key].toLowerCase() && filters[key] !== "") {
                item.classList.remove('find-element--active');
            } 
            
        }
    });
}

function changeActiveElementNumber() {
    const activeItems = [...findingItems].filter((item) => item.classList.contains('find-element--active'));
    carCount.innerHTML = activeItems.length;
}

btnSearch.addEventListener('click', () => {
    filterValue();
    carFiltering();
    changeActiveElementNumber();
    //location.href = "#finded-elements"
});

// sort

const sortListItem = document.querySelectorAll('.sort-item');

sortListItem.forEach((item) => {
    item.addEventListener('click', (e) => {
        const currentSortItem = e.target;
        changeFilterValues(currentSortItem, '.select-value-sort', '.default-text-sort');
    });
});

