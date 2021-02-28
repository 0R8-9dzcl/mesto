let editButton = document.querySelector('.profile__edit-button');
let addButton = document.querySelector('.profile__add-button');
let closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
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
    document.querySelector('.popup__edit-profile').classList.add('popup_opened');
}

function addButtonHandler() {
    profileNameInput.value = profileName.textContent;
    profileCaptionInput.value = profileCaption.textContent;
    document.querySelector('.popup__add-card').classList.add('popup_opened');
}

function closeButtonHandler() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileCaption.textContent = profileCaptionInput.value;
    closeButtonHandler();
}



// шпионы
editButton.addEventListener('click', editButtonHandler);
addButton.addEventListener('click', addButtonHandler);
closeButton.addEventListener('click', closeButtonHandler);
formElement.addEventListener('submit', formSubmitHandler);