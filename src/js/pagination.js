import Pagination from 'tui-pagination';


const container = document.getElementById('tui-pagination-container');
const options = { // below default value of options
            totalItems: 500,
            itemsPerPage: 10,
            visiblePages: 5,
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



    



