import Popup from "./Popup";

export default class PopupWithImage extends Popup {
	constructor(popupElement) {
		super(popupElement);
		this._popupImg = this._popup.querySelector('.popup__img');
		this._popupImgCaption = this._popup.querySelector('.popup__img-caption');
	}
	open(name, link) {
		super.open();
		this._popupImg.src = link;
		this._popupImg.alt = name;
		this._popupImgCaption.textContent = name;
	}
}