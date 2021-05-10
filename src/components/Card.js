export default class Card {
    constructor({ likes, _id, name, link, owner } , { handleCardClick }, сardSetting, cardSelector, 
        popupDelete, userId) {
        this._likes = likes;
        this._image = link;
        this._caption = name;
        this._cardSelector = cardSelector;
        this._card = this._getTemplate();
        this._cardPhoto = this._card.querySelector(сardSetting.cardPhoto);
        this._cardLike = this._card.querySelector(сardSetting.like);
        this._cardTitle = this._card.querySelector(сardSetting.cardTitle);
        this._cardTrash = this._card.querySelector(сardSetting.trashButton);
        this._likeCounter = this._card.querySelector(сardSetting.likeCounter);
        this._handleCardClick = handleCardClick;
        this._openPopupDelete = popupDelete;
        this._id = _id;
        this._ownerId = owner._id;
        this._userId = userId;

    }
    _getTemplate() {
        const cardElement = this._cardSelector.content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    _handleLikeCard() {
        this._cardLike.classList.toggle('card__like_active');
    }
    _handleDeleteCard() {
        this._openPopupDelete(this._card);
    }
    _setEventListeners() {
        this._cardPhoto.addEventListener('click', () => this._handleCardClick(this._caption, this._image));
        this._cardLike.addEventListener('click', this._handleLikeCard);
        this._cardTrash.addEventListener('click', () => this._handleDeleteCard());
    }
    generateCard() {
        this._setEventListeners();
        if( this._userId === this._ownerId) {
            this._cardTrash.classList.add('card__delete_style_active');
        };
        // this._likes.forEach(like => {
        //     if (like._id === this._userId) {
        //       this._cardLike.classList.add('card__like_active');
        //     };
        // });
        this._card.id = this._id;
        this._cardPhoto.src = this._image;
        this._cardPhoto.alt = this._caption;
        this._cardTitle.textContent = this._caption;
        return this._card;
    }
}