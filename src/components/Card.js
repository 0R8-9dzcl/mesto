export default class Card {
  constructor(cardData, eventHandlers, cardSetting, cardSelector, userId) {
    // забираю данные карточки
    this._likes = cardData.likes;
    this._id = cardData._id;
    this._caption = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._userId = userId; // сохраняю id пользователя
    this._cardSelector = cardSelector; // 
    this._card = this._cloneTemplate(); // получаю заготовку карточки
    this._cardLikeButtonActive = cardSetting.likeActive; // класс активного лайка
    // нахожу необходимые поля
    this._cardImage = this._card.querySelector(cardSetting.cardPhoto);
    this._cardLikeButton = this._card.querySelector(cardSetting.like);
    this._cardTitle = this._card.querySelector(cardSetting.cardTitle);
    this._cardTrashButton = this._card.querySelector(cardSetting.trashButton);
    this._likesCounter = this._card.querySelector(cardSetting.likeCounter);
    // записываю переданные функуии обработчики
    this._handleCardClick = eventHandlers.handleCardClick;
    this._addLikeCard = eventHandlers.addCardLike;
    this._removeLikeCard = eventHandlers.removeCardLike;
    this._openDeleteCardPopup = eventHandlers.openDeleteCardPopup;
    // привязка контекста
    this._handleLikeCard = this._handleLikeCard.bind(this);
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
  }
  _cloneTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }
  _handleLikeCard() {
    // this._cardLikeButton.classList.toggle('card__like_active');
    if (!this._isLiked()) {
      this._addLikeCard(this, this._id);
    } else {
      this._removeLikeCard(this, this._id);
    }
  }
  deleteCard() {
    this._card.remove();
  }
  _handleDeleteCard() {
    this._openDeleteCardPopup(this);
  }
  _setEventListeners() {
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._caption, this._link));
    this._cardLikeButton.addEventListener('click', this._handleLikeCard);
    this._cardTrashButton.addEventListener('click', this._handleDeleteCard);
  }
  _isLiked() {
    return this._likes.some(like => like._id === this._userId);
  }
  _isOwner() {
    return this._userId !== this._ownerId;
  }
  _updateLikes() {
    this._likesCounter.textContent = this._likes.length;
    // this._cardLikeButton.classList[this._isLiked() ? 'add' : 'remove'](this._cardLikeButtonActive);
    if (this._isLiked()) {
      this._cardLikeButton.classList.add(this._cardLikeButtonActive);
    } else {
      this._cardLikeButton.classList.remove(this._cardLikeButtonActive);
    }
  }
  _deleteTrashButton() {
    this._cardTrashButton.remove();
  }
  _setCardData() {
    if (this._isOwner()) this._deleteTrashButton();
    this._updateLikes();
    this._card.id = this._id;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._caption;
    this._cardTitle.textContent = this._caption;
  }
  setLikesInfo(likes) {
    this._likes = likes;
    this._updateLikes();
  }
  generateCard() {
    this._setCardData();
    this._setEventListeners();
    return this._card;
  }
}