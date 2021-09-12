
import ImageApiService from './js/apiService';
import galleryCardTps from './templates/gallery-card-tps.hbs';
import { alert } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import Pagination from 'tui-pagination';
// import { Pagination } from './js/pagination.js';
import './sass/main.scss';



const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    moreBtn: document.querySelector('#more'),
    gallery: document.querySelector('.gallery'),
    upBtn: document.querySelector('#up'),
    pagination: document.querySelector('#tui-pagination-container'),
    // pagBtnNext: document.querySelector('.tui-ico-next')
    
}

refs.form.addEventListener('submit', onFetchImages);
// refs.moreBtn.addEventListener('click', onLoadMore);
refs.upBtn.addEventListener('click', onScrollUp);
refs.pagination.addEventListener('click', onClickTuiPageBtn);
// refs.pagBtnNext.addEventListener('click', onNextPage);

// function onClickTuiPageBtn(e) {
//     console.log(e.target);
//     if (e.target.classList === '.tui-is-selected') {
//         return
//     }
//     if (e.target.classList === '.tui-ico-next') {
//         imageApiService.fetchGallery().then(renderImages);
//     }

// }


function onClickTuiPageBtn(e) {
//     if(e.target.nodeName === )
    console.log(e.target);
}






   
const imageApiService = new ImageApiService();
const hiddenElement = document.getElementById('more');
const container = document.getElementById('tui-pagination-container');
const myPagination = new Pagination(container, {
        totalItems: 500,
        itemsPerPage: 12,
        visiblePages: 5,
        // centerAlign: true
    });



//     // переходит на страницу x
// myPagination.movePageTo (targetPage);

// // сбрасывает пагинацию
// myPagination.reset (totalItems);

// // устанавливает количество элементов на странице
// myPagination.gsetItemsPerPage (itemCount);

// // устанавливает общее количество элементов
// myPagination.setTotalItems (itemCount);



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
    
    
    // myPagination.getCurrentPage(this.curretnPage);
    // console.log( myPagination.getCurrentPage);
    refs.pagination.classList.replace('pag-hidden', 'pag-open')  
   
    
    // refs.moreBtn.classList.replace('btn-hidden', 'btn-open');
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
    // refs.moreBtn.classList.replace('btn-open', 'btn-hidden');
    refs.pagination.classList.replace('pag-open', 'pag-hidden') 
}

// function onLoadMore() {
//     imageApiService.fetchGallery().then(renderImages);   
          
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
    console.log(e.target.nodeName);
    

    if (e.target.nodeName !== 'IMG') {
        return
    }
    const src = imageApiService.fetchGallery().then(this.largeImageURL);

    const instance = basicLightbox.create(`<img src=${src} width="1280" height="600" />`);
    instance.show()
}



    

    



    
   

   


















