
import ImageApiService from './js/apiService';
import galleryCardTps from './templates/gallery-card-tps.hbs';
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import { Pagination } from 'tui-pagination';
// import { Pagination } from './js/pagination.js';
import './sass/main.scss';



const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    moreBtn: document.querySelector('#more'),
    gallery: document.querySelector('.gallery'),
    upBtn: document.querySelector('#up')
    
}

refs.form.addEventListener('submit', onFetchImages);
refs.moreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', onScrollUp);

// myPagination.on('afterMove', (event) => {
//         const currentPage = event.page;
//         console.log(currentPage);
//     }
//     );

// myPagination.on('beforeMove', (event) => {
//         const currentPage = event.page;

//         if (currentPage === 10) {
//             return false;
//             // return true;
//         }
//     });



   
const imageApiService = new ImageApiService();
const hiddenElement = document.getElementById('more');
const container = document.getElementById('tui-pagination-container');
const options = { // below default value of options
    totalItems: 10,
    itemsPerPage: 10,
    visiblePages: 10,
    page: 1,
    centerAlign: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
        page: '<a href="#" class="tui-page-btn">{{page}}</a>',
        currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
        moveButton:
            '<a href="#" class="tui-page-btn tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</a>',
        disabledMoveButton:
            '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
            '<span class="tui-ico-{{type}}">{{type}}</span>' +
            '</span>',
        moreButton:
            '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
            '<span class="tui-ico-ellip">...</span>' +
            '</a>'
    }
};

const myPagination = new Pagination(container, options);


function onFetchImages(e) {
    e.preventDefault();
    clearGallery();
    
    
    imageApiService.value = e.currentTarget.elements.query.value;
    console.log(imageApiService.value);

    if (imageApiService.value === '' || imageApiService.value.length < 3) {
        alert({
            text: 'Enter more letter for search!'
        });
    }
    else {
    imageApiService.resetPage();
    imageApiService.fetchGallery().then(renderImages);
        
    refs.gallery.addEventListener('click', onShowFullImage);
        
    ShowPagination();
    
    refs.moreBtn.classList.replace('btn-hidden', 'btn-open');
    refs.upBtn.classList.replace('btn-hidden', 'btn-open');
    }
    
    
}


function renderImages(hits) {
    const markUpImages = galleryCardTps(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markUpImages);
    showScroll();
    
    
}

function clearGallery() {
    refs.gallery.innerHTML = '';
    refs.moreBtn.classList.replace('btn-open', 'btn-hidden');
}

function onLoadMore() {
    imageApiService.fetchGallery().then(renderImages);
          
}


function showScroll() {
    hiddenElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
}

function onScrollUp() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    refs.upBtn.classList.replace('btn-open', 'btn-hidden');
}




function onShowFullImage(e) {
    e.preventDefault();
    console.log(e.target.nodeName);
    

    if (e.target.nodeName !== 'IMG') {
        return
    }
    const src = imageApiService.fetchGallery().then(this.largeImageURL);

    const instance = basicLightbox.create(`<img src=${src} width="1280" height="600" />`);
    instance.show()
}


function ShowPagination() {
    // const Pagination = tui.Pagination;
    // const myPagination = new Pagination(container, {
    //         totalItems: 500,
    //         itemsPerPage: 10,
    //         visiblePages: 5,
    //         centerAlign: true
    // });

    

    



    
   

        // gets the current page
    myPagination.getCurrentPage();

    // goes to page x
    myPagination.movePageTo(targetPage);

    // resets the pagination
    myPagination.reset(totalItems);

    // sets the number of items per page
    myPagination.gsetItemsPerPage(itemCount);

    // sets the total number of items
    myPagination.setTotalItems(itemCount);




};


















