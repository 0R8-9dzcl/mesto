import Popup from "./Popup";


export default class PopupDeleteCard extends Popup {
	constructor(popupElement, { submitForm }) {
		super(popupElement);
		this._submitForm = submitForm;
		this._form = this._popup.querySelector('.popup__form');
	}
	setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', evt => {
			evt.preventDefault();
			this._submitForm();
		});
    }
	open() {
		super.open();
		
	}
}