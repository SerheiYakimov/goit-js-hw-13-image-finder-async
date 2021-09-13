
import ImageApiService from './js/apiService';
import galleryCardTps from './templates/gallery-card-tps.hbs';
import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
// import Pagination from 'tui-pagination';
import Pagination from './js/pagination.js';
import './sass/main.scss';



const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    // moreBtn: document.querySelector('#more'),
    gallery: document.querySelector('.gallery'),
    upBtn: document.querySelector('#up'),
    pagination: document.querySelector('#tui-pagination-container'),
    pagBtnNext: document.querySelector('.tui-ico-next')
    
}

refs.form.addEventListener('submit', onFetchImages);
// refs.moreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', onScrollUp);
refs.pagination.addEventListener('click', onLoadPage);





function onLoadPage(e) {

    options.page = imageApiService.currentPage;
    console.log(options.page)
    if (e.target === options.page) {
        return
       
    }
    if (e.target !== options.page) {
        clearGallery();
        imageApiService.fetchGallery().then(renderImages);
        
    }
    
    console.log(e.target);
    console.log(getCurrentPage());
    
}








   
const imageApiService = new ImageApiService();
const hiddenElement = document.getElementById('more');
// const pagination = new Pagination(container, options);
// const container = document.getElementById('tui-pagination-container');

// const container = document.getElementById('tui-pagination-container');
// const options = { // below default value of options
//      totalItems: 500,
//      itemsPerPage: 12,
//      visiblePages: 5,
//      page: 1,
//      centerAlign: false
    //  firstItemClassName: 'tui-first-child',
    //  lastItemClassName: 'tui-last-child',
    //  template: {
    //      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    //      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    //      moveButton:
    //          '<a href="#" class="tui-page-btn tui-{{type}}">' +
    //              '<span class="tui-ico-{{type}}">{{type}}</span>' +
    //          '</a>',
    //      disabledMoveButton:
    //          '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
    //              '<span class="tui-ico-{{type}}">{{type}}</span>' +
    //          '</span>',
    //      moreButton:
    //          '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
    //              '<span class="tui-ico-ellip">...</span>' +
    //          '</a>'
            // }
    
// };








function onFetchImages(e) {
    e.preventDefault();
    clearGallery();
        
    imageApiService.value = e.currentTarget.elements.query.value;
    

    if (imageApiService.value === '' || imageApiService.value.length < 3) {
        alert({
            title: 'Alert!',
            text: 'Enter more letter for search!'
        });
        return;
    }
    else {
        imageApiService.resetPage();
        imageApiService.fetchGallery().then(totalHits).then(renderImages);
        
        refs.gallery.addEventListener('click', onShowFullImage);
        
        
        refs.pagination.classList.replace('pag-hidden', 'pag-open'); 
        myPagination(container, options);
        
        
        // refs.moreBtn.classList.replace('btn-hidden', 'btn-open');
    } 
}

function buttonHide() {
    // refs.moreBtn.classList.replace('btn-open', 'btn-hidden');
    refs.upBtn.classList.replace('btn-open', 'btn-hidden');
}


function renderImages(result) {
    const markUpImages = galleryCardTps(result.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markUpImages);    
}

function clearGallery() {
    refs.gallery.innerHTML = '';
    buttonHide();    
}


// function onLoadMore() {
//     imageApiService.fetchGallery().then(renderImages).then(showScroll);
//     refs.upBtn.classList.replace('btn-hidden', 'btn-open');          
// }


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
    if (e.target.nodeName !== 'IMG') {
        return
    }
    const src = e.target.dataset.source;
    const instance = basicLightbox.create(`<img src=${src} width="1280" height="600" />`);
    instance.show();
}


function totalHits(result) {
    if (result.total === 0) {
        clearGallery();
        error({
                title: 'Nothing is found.',
                text: 'Please check if the input is correct'
        });
       
        return result;
       
    }
    if (result.total <= 12) {
        clearGallery();
        alert ({
                title: 'Success',
                text: `Found ${result.total} matches`
        })
        return result;
       
    }
    if (result.total > 12) {
        refs.upBtn.classList.replace('btn-hidden', 'btn-open');
        alert ({
                title: 'Success',
                text: `Found ${result.total} matches`
        })
        return result; 
    }        
        
}



// const container = document.getElementById('tui-pagination-container');
// const options = { // below default value of options
//      totalItems: 10,
//      itemsPerPage: 10,
//      visiblePages: 10,
//      page: 1,
//      centerAlign: false,
//      firstItemClassName: 'tui-first-child',
//      lastItemClassName: 'tui-last-child',
//      template: {
//          page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//          currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//          moveButton:
//              '<a href="#" class="tui-page-btn tui-{{type}}">' +
//                  '<span class="tui-ico-{{type}}">{{type}}</span>' +
//              '</a>',
//          disabledMoveButton:
//              '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//                  '<span class="tui-ico-{{type}}">{{type}}</span>' +
//              '</span>',
//          moreButton:
//              '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//                  '<span class="tui-ico-ellip">...</span>' +
//              '</a>'
//      }
// };
// const pagination = new Pagination(container, options);

    



    
   

   


















