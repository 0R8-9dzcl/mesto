import Popup from "./Popup";


export default class PopupDeleteCard extends Popup {
	constructor(popupElement, submitForm)  {
		super(popupElement);
		this._submitForm = submitForm;
		this._form = this._popup.querySelector('.popup__form');
		this.submitButton = this._form.querySelector('.popup__submit');
	}
	setSubmitButtonText(text) {
		this.submitButton.textContent = text;
	}
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', evt => {
			evt.preventDefault();
			this._submitForm(this._card);
		});
	}
	open(card) {
		super.open();
		this._card = card;
	}
}