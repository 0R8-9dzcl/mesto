import Popup from "./Popup";

export default class PopupWithForm extends Popup {
	constructor(popupElement, { submitForm }) {
		super(popupElement);
		this._submitForm = submitForm;
		this._form = this._popup.querySelector('.popup__form');
	}
	_getInputValues() {
		this._inputList = this._form.querySelectorAll('.popup__input');
		this._inpValues = {};
		this._inputList.forEach(input => {
			this._inpValues[input.name] = input.value;
		});
		return this._inpValues;
	}
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm(this._getInputValues());
		});
	}
	close() {
		super.close();
		this._form.reset();
	}
}