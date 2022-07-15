
// let objectUrl = {
//     model: '',
//     gearbox: '',
//     gasoline: '',
//     location: ''
// };
// const getUrlParam = window.location.search;

// const urlParam = new URLSearchParams(getUrlParam);

// const keysUrl = urlParam.entries()

// function siema() {
//     for(const [key, value] of keysUrl) {
//         objectUrl[key] = value;
//     }
// }

// siema();


// function carFiltering1() {
//     findingItems.forEach((item) => {
//         item.classList.add('find-element--active');

//         let carFilters = {
//             model: item.dataset.model,
//             gearbox: item.dataset.gearbox,
//             gasoline: item.dataset.gasoline,
//             location: item.dataset.location
//         }

//         for(key in objectUrl) {
//             if(objectUrl[key].toLowerCase() !== carFilters[key].toLowerCase() && objectUrl[key] !== "") {
//                 item.classList.remove('find-element--active');
//             } 
            
//         }
//     });
// }
// carFiltering1();

let url = new URL('https://example.com?foo=1&bar=2&foo=3');
let params = new URLSearchParams(url.search);


params.delete('foo'); 

console.log(params.toString());
