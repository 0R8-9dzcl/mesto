import Popup from "./Popup";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
	}
	open({ name, link }) {
		const popupImg = this._popup.querySelector('.popup__img');
		const popupImgCaption = this._popup.querySelector('.popup__img-caption');
		popupImg.src = link;
		popupImg.alt = name;
		popupImgCaption.textContent = name;
		super.open();
	}
}