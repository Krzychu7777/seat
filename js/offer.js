const menuBar = document.querySelector('header'),
    phoneBtnInf = document.querySelectorAll('.phone-button-inf');
let phoneChangeInf = 0;

window.addEventListener('scroll', (e) => {
 const currentScroll = window.pageYOffset;

 if(200 < currentScroll) {
    menuBar.classList.add('header-box-shadow');
 } else if ( currentScroll < 200) {
    menuBar.classList.remove('header-box-shadow');
 }
});

function changePhoneTextInf(item) {
    if(phoneChangeInf === 0) {
        item.style.display = "none";
        phoneBtnInf[1].style.display = "";
    }
}

phoneBtnInf.forEach((item) => {
    item.addEventListener('click', (e) => {

        const siema = e.currentTarget;
        changePhoneTextInf(item);

        console.log(item);
    });
});


const infoBarItems = document.querySelectorAll('.info-bar-item');

infoBarItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        const currentItem = e.target;
    });
})








// slider
var splide = new Splide( '#offer-gallery', {
    type: 'loop',
    perPage: 4,
    gap: 16,
    speed: 1000,
    perMove: 1,
    pagination: false,
    breakpoints: {
        1920: {
            perPage: 3,
        },
        1360: {
            perPage: 2,
        },

        670: {
            perPage: 1,
            
        },
    }
} );
var bar = splide.root.querySelector( '.my-slider-progress-bar' );

splide.on( 'mounted move', function () {
var end = splide.Components.Controller.getEnd() + 1;
bar.style.width = String( 100 * ( splide.index + 1 ) / end ) + '%';
} );

splide.mount();