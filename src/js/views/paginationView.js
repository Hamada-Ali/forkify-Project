// pagination View page

import View from './View.js';

// import icons from '../img/icons.svg'; // Parcel 1
import icons from 'url:../../img/icons.svg'; // Parcel 2
import { Fraction } from 'fractional';

class Pagination extends View {
    _parentElement = document.querySelector('.pagination')

    _generateMarkup() {
        const numpages = Math.ceil(this._data.results.length /this._data.resultsPerPage);
        console.log(numpages)

    // page 1 and there is no other pages
    if(this._data.page === 1 && numpages > 1) {
        return `
             <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
                 <span>Page ${this._data.page + 1}</span>
                 <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                 </svg>
          </button> 
        `
    }

    // last page
    if(this._data.page === numpages && numpages > 1) {
        return `
            <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${this._data.page - 1}</span>
            </button>
        `
    }

    // other page
    if(this._data.page < numpages) {
        return `
        <button data-goto="${this._data.page - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
        <button data-goto="${this._data.page + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button> 
        `
    }

    // page 1 and there is no other pages
    return ''

    }

    addHandlerBtn(handler) {
        this._parentElement.addEventListener('click', e => {
            e.preventDefault();
            const btn = e.target.closest('.btn--inline')
            if(!btn) return;
            // console.log()
            handler(+btn.dataset.goto)
        })
    }
}

export default new Pagination()