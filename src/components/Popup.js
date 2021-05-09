export default class Popup {
	constructor(popupElement) {
		this._popup = popupElement;
		this._handleEscClose = this._handleEscClose.bind(this)
	}
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close(this._popup);
		}
	}
	setEventListeners() {
		this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close(this._popup);
            }
            if (evt.target.classList.contains('popup__close-button')) {
            	this.close(this._popup);
            }
        })
	}
	open() {
		this._popup.classList.add('popup_opened');
		window.addEventListener('keydown', this._handleEscClose);
	}
	close() {
		this._popup.classList.remove('popup_opened');
		window.removeEventListener('keydown', this._handleEscClose);
	}
}