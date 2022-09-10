import icons from '../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _errorMessage = 'Something wrong with pages';

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goTo = +btn.dataset.goto;
      handler(goTo);
    });
  }
  _generateMarkup() {
    const currentPage = this._data.currentPage;
    const pagesAmount = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(pagesAmount);
    // If it is Page 1 and there are others pages:
    if (currentPage === 1 && pagesAmount > 1) {
      return `
          <span class="pages__amount pages__amount--first">PAGES: ${pagesAmount}</span>
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }

    // If it's last Page and there are more than 1 pages
    if (currentPage === pagesAmount && pagesAmount > 1) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          `;
    }

    // If it's others page
    if (currentPage > 1 && currentPage < pagesAmount) {
      return `
          <button data-goto="${
            currentPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
          <span class="pages__amount">PAGES: ${pagesAmount}</span>
          <button data-goto="${
            currentPage + 1
          }" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          `;
    }

    // If it is Page 1 and there are no more pages
    return '';
  }
}
export default new PaginationView();
