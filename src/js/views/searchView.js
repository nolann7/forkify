class SearchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const query = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }
  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    // this.#parentEl.querySelector('.search__btn').addEventListener('click', handler);
    // можно и так как выше, но лучше использовать submit на родительский элемент - тогда действие будет не только на клик по кнопке, но и например на нажатие enter, правда нужно помнить что когда используем submit нужно вссегда делать e.preventDefault(), иначе страница будет перезагружаться по умолчанию
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
