import icons from '../../img/icons.svg';
import View from './View.js';
import previewView from './previewView.js';

class ListView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = 'Recipe was successfully uploaded :)';
  _errorMessage = 'Something went wrong :( Please try again!';

  // TODO заменить все классы на кнопках открытия закрытия и создать список
  // _window = document.querySelector('.add-recipe-window');
  // _overlay = document.querySelector('.overlay');
  // _btnOpen = document.querySelector('.nav__btn--add-recipe');
  // _btnClose = document.querySelector('.btn--close-modal');
  // _plusIng = document.querySelector('.add-ing');
  // _ingColumn = document.querySelector('.upload__column--ing')

  // constructor() {
  //   super();
  //   this._addHandlerShowWindow();
  //   this._addHandlerHideWindow();
  //   this._addIngredientRaw();
  // }

  // toggleWindow() {
  //   this._overlay.classList.toggle('hidden');
  //   this._window.classList.toggle('hidden');
  // }

  // _addHandlerShowWindow() {
  //   this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  // }
  // _addHandlerHideWindow() {
  //   this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
  //   this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  // }

  // addRecipeUpload(handler) {
  //   this._parentElement.addEventListener('submit', function (e) {
  //     e.preventDefault();
  //     // this in eventlistener == _parentElement
  //     const dataArray = [...new FormData(this)];
  //     console.log(dataArray);
  //     // method takes an array of entries and converts it to an object
  //     const data = Object.fromEntries(dataArray);
  //     console.log(data);
  //     handler(data);
  //   });
  // }
 
  // _renderMarkupIng(){
  //  const markup = `
  //   <label>Ingredient ${this.counter}:</label>
  //   <input
  //     value="Rice"
  //     type="text"
  //     required
  //     name="ingredient-${this.counter}-description"
  //     placeholder="Food description (e.g. rice)"
  //   />
  //   <input
  //     value="0.5"
  //     type="number" 
  //     step="0.01"
  //     name="ingredient-${this.counter}-quantity"
  //     placeholder="quantity"
  //   />
  //   <input
  //     value="kg"
  //     type="text"
  //     name="ingredient-${this.counter++}-unit"
  //     placeholder="unit (e.g. kg)"
  //   />
  //  `
  //  this._ingColumn.insertAdjacentHTML('beforeend', markup);
  // }
  // _addIngredientRaw() {
  //   this._plusIng.addEventListener('click', this._renderMarkupIng.bind(this));
  // }
 
  // _generateMarkup() {
  // }
}
export default new ListView();
