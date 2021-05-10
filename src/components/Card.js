export default class Card {
    constructor({ likes, _id, name, link, owner } , { handleCardClick , popupDelete, likeToggle }, cardSetting, cardSelector, userId) {
        this._likes = likes;
        this._id = _id;
        this._caption = name;
        this._image = link;
        this._cardSelector = cardSelector;
        this._card = this._getTemplate();
        this._cardPhoto = this._card.querySelector(cardSetting.cardPhoto);
        this._cardLike = this._card.querySelector(cardSetting.like);
        this._cardLikeActive = cardSetting.likeActive;
        this._cardTitle = this._card.querySelector(cardSetting.cardTitle);
        this._cardTrash = this._card.querySelector(cardSetting.trashButton);
        this._likeCounter = this._card.querySelector(cardSetting.likeCounter);
        this._handleCardClick = handleCardClick;
        this._openPopupDelete = popupDelete;
        this._likeToggle = likeToggle;
        this._ownerId = owner._id;
        this._userId = userId;

    }
    _getTemplate() {
        const cardElement = this._cardSelector.content.querySelector('.card').cloneNode(true);
        return cardElement;
    }
    _handleLikeCard() {
        // this._cardLike.classList.toggle('card__like_active');
        this._likeToggle(this._card);
    }
    _handleDeleteCard() {
        this._openPopupDelete(this._card);
    }
    _setEventListeners() {
        this._cardPhoto.addEventListener('click', () => this._handleCardClick(this._caption, this._image));
        this._cardLike.addEventListener('click', () => this._handleLikeCard());
        this._cardTrash.addEventListener('click', () => this._handleDeleteCard());
    }
    _activateLike() {
        this._likes.forEach(like => {
            if (like._id === this._userId) {
              this._cardLike.classList.add(this._cardLikeActive);
            };
        });  
    }
    generateCard() {
        this._setEventListeners();
        if( this._userId === this._ownerId) {
            this._cardTrash.classList.add('card__delete_style_active');
        };
        this._likeCounter.textContent = this._likes.length;
        this._activateLike();
        this._card.id = this._id;
        this._cardPhoto.src = this._image;
        this._cardPhoto.alt = this._caption;
        this._cardTitle.textContent = this._caption;
        return this._card;
    }
}