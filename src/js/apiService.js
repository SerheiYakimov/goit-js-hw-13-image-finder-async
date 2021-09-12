export default class ImageApiService {
    constructor() {
        this.currentPage = 1;
        this.value = '';
    }

    fetchGallery() {
      return fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.value}&page=${this.currentPage}&per_page=12&key=23141272-55f7853bfecadbbcd9800c5ad`)
    .then(response => response.json())
    .then(result => {
        this.incrementPage();
        console.log(this);    
        return result.hits;    
    })
   
    }

    incrementPage() {
        this.currentPage++;
    }

    // decrementPage() {
    //     this.currentPage--;
    // }

    resetPage() {
        this.currentPage = 1;
    }
}