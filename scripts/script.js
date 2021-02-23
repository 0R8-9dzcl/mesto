let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let popupOpen = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let profileName = document.querySelector('.profile__name');
let profileNameInput = document.querySelector('.popup__input_name_name');
let profileCaption = document.querySelector('.profile__caption');
let profileCaptionInput = document.querySelector('.popup__input_name_caption');
let likeButton = document.querySelectorAll('.card__like');
// Popup
function editButtonHandler() {
    profileNameInput.value = profileName.textContent;
    profileCaptionInput.value = profileCaption.textContent;
    popupOpen.classList.toggle('popup_opened');
}

function closeButtonHandler() {
    popupOpen.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileCaption.textContent = profileCaptionInput.value;
    closeButtonHandler();
}

// шпионы
editButton.addEventListener('click', editButtonHandler);
closeButton.addEventListener('click', closeButtonHandler);
formElement.addEventListener('submit', formSubmitHandler);

// Likes
likeButton.forEach((likeButton) => likeButton.addEventListener('click', function() {
    likeButton.classList.toggle('card__like_active');
}));