const phoneBtn = document.querySelectorAll('.phone-button'),
    selectButtons = document.querySelectorAll('.selected-option'),
    itemListChoose = document.querySelectorAll('.dropdown-list-item'),
    deleteBtn = document.querySelectorAll('.delete-btn'),
    findingItems = document.querySelectorAll('.find-element'),
    btnSearch  = document.querySelectorAll('.button-search'),
    carCount = document.getElementById('car-count'),
    main = document.querySelector('main'),
    sortListItem = document.querySelectorAll('.sort-item'),
    mobileFiltersBtn = document.getElementById('mobile-filters'),
    mobileSearchConsole = document.querySelector('.mobile-search-console'),
    mobileCloseBg = document.querySelector('.mobile-filter-bg');
let phoneChange = 0;
let selectText;
let dropDownFilters;
let selectButton;
let isOpenMobileFilter = false;
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

function clearCategory(e) {
    const currentClearInput = e.target.parentNode.parentNode;
    const selectedTexts = currentClearInput.querySelectorAll('.text-change');
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
    const dropDownLists = document.querySelectorAll('.dropdown-list');
    selectButton = e.currentTarget;
    dropDownFilters = selectButton.parentNode.querySelector('.dropdown-list');

    selectButtons.forEach((item, index) => {
        if(item != selectButton) {
        item.classList.remove('selected-option--active');
        dropDownLists[index].classList.remove('dropdown-list--active');
    }
    });

    dropDownFilters.classList.toggle('dropdown-list--active');
    selectButton.classList.toggle('selected-option--active');
    
}

function closeByMain(e) {
    const mainTarget = e.target,
        dropDownSelects = mainTarget.parentNode.querySelector('.selected-option'),
        selectedText = mainTarget.parentNode.querySelector('.selected-option p'),
        selectedArrow = mainTarget.parentNode.querySelector('.selected-option svg');

   if(mainTarget != dropDownSelects && mainTarget != selectedText && mainTarget != selectedArrow) {
    if(dropDownFilters) {
    dropDownFilters.classList.remove('dropdown-list--active');}

    if(selectButton) {
    selectButton.classList.remove('selected-option--active'); }
   }
}

selectButtons.forEach((item) => {
    item.addEventListener('click', openDropDownList);
});

itemListChoose.forEach((item) => {
    item.addEventListener('click', chooseFilterValue);
});

deleteBtn.forEach((button) => {
    button.addEventListener('click', clearCategory);
});

main.addEventListener('click', closeByMain);


//filters

function filterValue(e) {
    const curInput = e.currentTarget.parentNode.parentNode.querySelectorAll('.select-value');

    curInput.forEach((input) => {
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

btnSearch.forEach((button) => {
    button.addEventListener('click', (e) => {
        filterValue(e);
        carFiltering();
        changeActiveElementNumber();
        location.href = "#finded-elements"
    });
});

// sort

function sortToLower(array, dataset) {
    array.sort(function(a, b) {
        return b.getAttribute(`data-${dataset}`) - a.getAttribute(`data-${dataset}`);
    });
}

function sortToUpper(array, dataset) {
    array.sort(function(a, b) {
        return a.getAttribute(`data-${dataset}`) - b.getAttribute(`data-${dataset}`);
    });
}

function sortItems(e) {
    const currentSortItem = e.target;
    const valueSort = document.querySelector('.select-value-sort');
    const itemsArray = [...findingItems];

    changeFilterValues(currentSortItem, '.select-value-sort', '.default-text-sort');

        if(valueSort.value.toLowerCase() === "") {
            itemsArray.forEach((item) => {
                item.style.order = "";
            });
        }

        if(valueSort.value.toLowerCase() === "najtańsze") {
            sortToUpper(itemsArray, 'prize');
        }

        if(valueSort.value.toLowerCase() === "najdroższe") {
            sortToLower(itemsArray, 'prize');
        }

        if(valueSort.value.toLowerCase() === "najmłodszy rocznik") {
            sortToLower(itemsArray, 'year');
        }

        if(valueSort.value.toLowerCase() === "najstarszy rocznik") {
            sortToUpper(itemsArray, 'year');
        }

        if(valueSort.value.toLowerCase() === "najmniejszy przebieg") {
            sortToUpper(itemsArray, 'mileage');
        }

        if(valueSort.value.toLowerCase() === "największy przebieg") {
            sortToLower(itemsArray, 'mileage');
        }

        if(valueSort.value.toLowerCase() === "najnowsze ogłoszenie") {
            sortToLower(itemsArray, 'date');
        }

        if(valueSort.value.toLowerCase() === "najstarsze ogłoszenie") {
            sortToUpper(itemsArray, 'date');
        }
        


    itemsArray.forEach((item, index) => {
        item.style.order = index;

    });
}

sortListItem.forEach((item) => {
    item.addEventListener('click', sortItems);
});


//scroll arrow

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const scrollArrow = document.querySelector('.scroll-container');

    if(800 < currentScroll) {
       scrollArrow.classList.add('scroll-container--active');
    } else {
        scrollArrow.classList.remove('scroll-container--active');
    }
});


//open mobile search console and close

mobileFiltersBtn.addEventListener('click', (e) => {
    mobileSearchConsole.classList.add('mobile-search-console--active');
    isOpenMobileFilter = true;
});

mobileSearchConsole.addEventListener('click', (e) => {
    const siema = e.target,
        searchMobileButton = siema.parentNode.querySelector('.button-search');

    if(siema === searchMobileButton) {
        mobileSearchConsole.classList.remove('mobile-search-console--active');
    }
});

mobileCloseBg.addEventListener('click', () => {
    mobileSearchConsole.classList.remove('mobile-search-console--active');
});
