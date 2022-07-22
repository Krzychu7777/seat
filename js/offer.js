const menuBar = document.querySelector('header'),
    phoneBtnInf = document.querySelectorAll('.phone-button-inf'),
    infoBarItems = document.querySelectorAll('.info-bar-item'),
    infLinks = document.querySelectorAll('.info-bar-item a'),
    infBorders = document.querySelectorAll('.info-border');
let phoneChangeInf = 0;

window.addEventListener('scroll', (e) => {
 const currentScroll = window.pageYOffset;
 const scrollArrowOffer = document.querySelector('.scroll-container');

    200 < currentScroll ? menuBar.classList.add('header-box-shadow') : menuBar.classList.remove('header-box-shadow');

    if(800 < currentScroll) {
        scrollArrowOffer.classList.add('scroll-container--active');
        infoBarItems.forEach((item, index) => {
            infLinks[index].classList.remove('link-active');
            infBorders[index].classList.remove('info-border--active');

            infLinks[0].classList.add('link-active');
            infBorders[0].classList.add('info-border--active');
        });
    } else {
        scrollArrowOffer.classList.remove('scroll-container--active');
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
        changePhoneTextInf(item);
    });
});


infoBarItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        const currentItem = e.target;
        const linkInf = currentItem.parentNode.querySelector('.info-bar-item a');
        const borderInf = currentItem.parentNode.querySelector('.info-border');

        for(let i=0; i<infoBarItems.length; i++) {
            infLinks[i].classList.remove('link-active');
            infBorders[i].classList.remove('info-border--active');
        }

        linkInf.classList.add('link-active');
        borderInf.classList.add('info-border--active');
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