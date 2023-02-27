export default class Popup {
	constructor(popupElement) {
		this._popup = popupElement;
		this._handleEscClose = this._handleEscClose.bind(this);
		this._closePopupByClick = this._closePopupByClick.bind(this);
	}
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}
	_closePopupByClick(evt) {
		if (evt.target.classList.contains('popup_opened')) {
			this.close();
		}
		if (evt.target.classList.contains('popup__close-button')) {
			this.close();
		}
	}
	setEventListeners() {
		this._popup.addEventListener('click', this._closePopupByClick)
	}
	open() {
		window.addEventListener('keydown', this._handleEscClose);
		this._popup.classList.add('popup_opened');
	}
	close() {
		this._popup.classList.remove('popup_opened');
		window.removeEventListener('keydown', this._handleEscClose);
	}
}