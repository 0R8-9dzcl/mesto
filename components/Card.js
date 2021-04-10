export default class Card {
    constructor(data, handleCardClick, сardSetting, cardSelector) {
        this._image = data.link;
        this._caption = data.name;
        this._cardSelector = document.querySelector(cardSelector);
        this._cardPhoto = сardSetting.cardPhoto;
        this._cardTitle = сardSetting.cardTitle;
        this._cardLike = сardSetting.like;
        this._cardTrash = сardSetting.trashButton;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = this._cardSelector.content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    _handleLikeCard() {
        this._card.querySelector(this._cardLike).classList.toggle('card__like_active');
    }
    _handleDeleteCard() {
        this._card.remove();
    }
    _setEventListeners() {
        this._card.querySelector(this._cardPhoto).addEventListener('click', () => this._handleCardClick(this._caption, this._image));
        this._card.querySelector(this._cardLike).addEventListener('click', () => this._handleLikeCard());
        this._card.querySelector(this._cardTrash).addEventListener('click', () => this._handleDeleteCard());
    }
    generateCard() {
        this._card = this._getTemplate();
        this._setEventListeners();
        this._card.querySelector(this._cardPhoto).src = this._image;
        this._card.querySelector(this._cardPhoto).alt = this.title;
        this._card.querySelector(this._cardTitle).textContent = this._caption;
        return this._card;
    }
}