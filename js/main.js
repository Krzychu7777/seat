const phoneBtn = document.querySelectorAll('.phone-button'),
    selectButtons = document.querySelectorAll('.selected-option'),
    itemListChoose = document.querySelectorAll('.dropdown-list-item'),
    clearBtn = document.querySelectorAll('.delete-btn'),
    findingItems = document.querySelectorAll('.find-element'),
    btnSearch  = document.querySelectorAll('.button-search'),
    carCount = document.getElementById('car-count'),
    main = document.querySelector('main'),
    sortListItem = document.querySelectorAll('.sort-item'),
    mobileFiltersBtn = document.getElementById('mobile-filters'),
    mobileSearchConsole = document.querySelector('.mobile-search-console'),
    mobileCloseBg = document.querySelector('.mobile-filter-bg'),
    searchConsole = document.querySelector('.search-console'),
    foundItems = document.getElementById('finded-elements');
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

//url search

const getUrlParam = window.location.search,
    urlParam = new URLSearchParams(getUrlParam),
    keysUrl = urlParam.entries();

function assignSearchResult() {
    for(const [key, values] of keysUrl) {
        filters[key] = changeCharacters(values);
    }

    console.log(filters);
}

function changeCharacters(character) {

    return character.replace(/ą/g, 'a').replace(/Ą/g, 'A')
    .replace(/ć/g, 'c').replace(/Ć/g, 'C')
    .replace(/ę/g, 'e').replace(/Ę/g, 'E')
    .replace(/ł/g, 'l').replace(/Ł/g, 'L')
    .replace(/ń/g, 'n').replace(/Ń/g, 'N')
    .replace(/ó/g, 'o').replace(/Ó/g, 'O')
    .replace(/ś/g, 's').replace(/Ś/g, 'S')
    .replace(/ż/g, 'z').replace(/Ż/g, 'Z')
    .replace(/ź/g, 'z').replace(/Ź/g, 'Z')
    .replace('+', '');
}

function capitalizeFirstLetter(string) {
    if(string != '') {
    return string[0].toUpperCase() + string.slice(1);
}
}

function chnageInputValueByUrl() {
    const selectValueInput = document.querySelectorAll('.select-value');
    const textchange = document.querySelectorAll('.text-change');

    selectValueInput.forEach((input, index) => {
        for(key in filters) {
            if(input.name == key)
                input.value = filters[key];
        }
        if(input.value != '')
        textchange[index].textContent = capitalizeFirstLetter(input.value);
    });
}

const init = () => {
    assignSearchResult();
    carFiltering();
    countActiveElement();
    chnageInputValueByUrl();
}

init();


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
    const parentTarget = currentItem.parentNode.parentNode,
        dropDownList = parentTarget.querySelector('.dropdown-list'),
        selectedBtn = parentTarget.querySelector('.selected-option'),
        selectValue = parentTarget.querySelector(selectClass),
        defaultValue = parentTarget.querySelector(defaultClass),
        allSelectValues = parentTarget.parentNode.querySelectorAll('.select-value'),
        currentDeleteBtn = parentTarget.parentNode.parentNode.querySelector('.delete-btn');
     selectText = currentItem.parentNode.parentNode.querySelector('.text-change');


    dropDownList.classList.remove('dropdown-list--active');
    selectedBtn.classList.toggle('selected-option--active');
    
    selectValue.value = currentItem.textContent;
    selectText.textContent = currentItem.textContent;

    if(!currentItem.classList.contains('sort-item')) {
        selectValue.value == defaultValue.value ? selectValue.value = "" : currentDeleteBtn.style.display = "flex";
        
        if(allSelectValues[0].value == "" && allSelectValues[1].value == "" && allSelectValues[2].value == "" && allSelectValues[3].value == "") {
            currentDeleteBtn.style.display = "none";
        }
    }
}

function chooseFilterValue(e) {
        const currentItem = e.currentTarget;
        const sortingItem = currentItem.parentNode;
        changeFilterValues(currentItem, '.select-value', '.default-text');

        if(!sortingItem.classList.contains('sort-options')) {
            selectText.classList.add('changed');
        }
}

function clearCategory(e) {
    const currentClearInput = e.target.parentNode.parentNode;
    const selectedTexts = currentClearInput.querySelectorAll('.text-change');
    const changedText = [...selectedTexts].filter((item) => item.classList.contains('changed'));
    const currentDelBtn = currentClearInput.querySelector('.delete-btn');

    changedText.forEach((item) => {
        const defaultText = item.parentNode.querySelector('.default-text');
        const selectValueReset = item.parentNode.querySelector('.select-value');
        item.textContent = defaultText.value;
        selectValueReset.value = "";

        if(item.classList.contains('changed')) {
            item.classList.remove('changed');
        }
    });

    findingItems.forEach((item) => {
        item.classList.add('find-element--active');
    });

    currentDelBtn.style.display = "none";
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
        dropDownSelects = mainTarget.parentNode.querySelector('.selected-option');


   if(!searchConsole.contains(mainTarget) && mainTarget != mobileFiltersBtn && mainTarget != dropDownSelects.contains(mainTarget) && mainTarget != dropDownSelects) {
    if(dropDownFilters) {
    dropDownFilters.classList.remove('dropdown-list--active');}

    if(searchConsole){
    searchConsole.classList.remove('search-console--active');
    consoleFixedBg.classList.remove('bg-filter--active');
    }

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

main.addEventListener('click', closeByMain);


//filters

function filterValue(e) {
    const curInput = e.currentTarget.parentNode.parentNode.querySelectorAll('.select-value');

    curInput.forEach((input) => {
        filters[input.name] = input.value;
    });
}

function carFiltering() {
    findingItems.forEach((item) => {
        item.classList.add('find-element--active');

        let carFilters = {
            model: item.dataset.model,
            gearbox: item.dataset.gearbox,
            gasoline: item.dataset.gasoline,
            location: item.dataset.location
        }

        for(key in filters) {
            if(changeCharacters(filters[key].toLowerCase()) !== changeCharacters(carFilters[key].toLowerCase()) && filters[key] !== "") {
                item.classList.remove('find-element--active');
            } 
        }
    });
}

function countActiveElement() {
    const elementsPagination = document.querySelector('.finded-elements-pagination');
    const nullOfferText = document.querySelector('.null-offer-text');

    const activeItems = [...findingItems].filter((item) => item.classList.contains('find-element--active'));
    carCount.innerHTML = activeItems.length;

    if(activeItems.length == 0) {
        elementsPagination.style.display ="none"
        nullOfferText.style.display ="block"
    } else {
        elementsPagination.style.display ="flex";
        nullOfferText.style.display ="none";
    }
}

function changeUrlValue() {
    const url = new URL(window.location.href);
    const param = new URLSearchParams(url.search);
    const selectValueInput = document.querySelectorAll('.select-value');
    
        for(key in filters) {
            if(filters[key] != '') {
            url.searchParams.set(key, changeCharacters(filters[key].toLowerCase()));
            }
            
            window.history.pushState(null, null, url);
        }

        console.log(filters);

    window.scrollTo(0, foundItems.offsetTop);
}

btnSearch.forEach((button) => {
    button.addEventListener('click', (e) => {
        filterValue(e);
        carFiltering();
        countActiveElement();
        changeUrlValue();

         if(searchConsole){
            searchConsole.classList.remove('search-console--active');
            consoleFixedBg.classList.remove('bg-filter--active');
        }
    });
});

clearBtn.forEach((button) => {
    button.addEventListener('click', (e) => {
        clearCategory(e);
        countActiveElement();

        if(searchConsole){
            searchConsole.classList.remove('search-console--active');
            consoleFixedBg.classList.remove('bg-filter--active');
        }

        window.history.pushState({}, document.title, '/?');
        window.scrollTo(0, foundItems.offsetTop);
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

const consoleFixedBg = document.querySelector('.bg-filter');

mobileFiltersBtn.addEventListener('click', (e) => {
    searchConsole.classList.toggle('search-console--active');
    consoleFixedBg.classList.toggle('bg-filter--active');
    searchConsole.classList.add('search-console--display');
});

// mobileSearchConsole.addEventListener('click', (e) => {
//     const target = e.target,
//         searchMobileButton = target.parentNode.querySelector('.button-search'),
//         clearMobileButton = target.parentNode.querySelector('.delete-btn');

//     if(target === searchMobileButton || target === clearMobileButton) {
//         mobileSearchConsole.classList.remove('mobile-search-console--active');
//     }
// });

// mobileCloseBg.addEventListener('click', () => {
//     mobileSearchConsole.classList.remove('mobile-search-console--active');
// });
