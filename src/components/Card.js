export default class Card {
  constructor(cardData, eventHandlers, cardSetting, cardSelector, userId) {
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._caption = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector(cardSetting.cardPhoto);
    this._cardLike = this._card.querySelector(cardSetting.like);
    this._cardLikeActive = cardSetting.likeActive;
    this._cardTitle = this._card.querySelector(cardSetting.cardTitle);
    this._cardTrash = this._card.querySelector(cardSetting.trashButton);
    this._likeCounter = this._card.querySelector(cardSetting.likeCounter);
    this._handleCardClick = eventHandlers.handleCardClick;
    this._addLikeCard = eventHandlers.addLikeCard;
    this._removeLikeCard = eventHandlers.removeLikeCard;
    this._openDeleteCardPopup = eventHandlers.openDeleteCardPopup;
  }
  _getTemplate() {
    const cardElement = this._cardSelector.content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
  _handleLikeCard() {
    // this._cardLike.classList.toggle('card__like_active');
    if (!this.isLiked()) {
      this._addLikeCard(this, this._id);
    } else {
      this._removeLikeCard(this, this._id);
    }
  }
  _handleDeleteCard() {
    console.log(this._card);
    this._openDeleteCardPopup(this._card);
  }
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._caption, this._link));
    this._cardLike.addEventListener('click', () => this._handleLikeCard());
    this._cardTrash.addEventListener('click', () => this._handleDeleteCard());
  }
  setLikesInfo(likes) {
    this._likes = likes;
    this._updateLikes();
  }
  isLiked() {
    return this._likes.some(like => like._id === this._userId);
  }
  _updateLikes() {
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._cardLike.classList.add(this._cardLikeActive);
    } else {
      this._cardLike.classList.remove(this._cardLikeActive);
    }
  }
  generateCard() {
    this._setEventListeners();
    if (this._userId === this._ownerId) {
      this._cardTrash.classList.add('card__delete_style_active');
    };
    this._updateLikes();
    this._card.id = this._id;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._caption;
    this._cardTitle.textContent = this._caption;
    return this._card;
  }
}