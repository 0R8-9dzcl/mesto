export default class Card {
    constructor({ name, link } , { handleCardClick }, сardSetting, cardSelector, 
        popupDelete) {
        this._image = link;
        this._caption = name;
        this._cardSelector = cardSelector;
        this._card = this._getTemplate();
        this._cardPhoto = this._card.querySelector(сardSetting.cardPhoto);
        this._cardLike = this._card.querySelector(сardSetting.like);
        this._cardTitle = this._card.querySelector(сardSetting.cardTitle);
        this._cardTrash = this._card.querySelector(сardSetting.trashButton);
        this._handleCardClick = handleCardClick;
        this._openPopupDelete = popupDelete;
    }
    _getTemplate() {
        const cardElement = this._cardSelector.content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    _handleLikeCard() {
        this._cardLike.classList.toggle('card__like_active');
    }
    _handleDeleteCard() {
        this._openPopupDelete();
        // this._card.remove();
    }
    _setEventListeners() {
        this._cardPhoto.addEventListener('click', () => this._handleCardClick(this._caption, this._image));
        this._cardLike.addEventListener('click', () => this._handleLikeCard());
        this._cardTrash.addEventListener('click', () => this._handleDeleteCard());
    }
    generateCard() {
        this._setEventListeners();
        this._cardPhoto.src = this._image;
        this._cardPhoto.alt = this._caption;
        this._cardTitle.textContent = this._caption;
        return this._card;
    }
}