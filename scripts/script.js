function popupOpen(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closeButtonHandler() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

// Popup Edit
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = document.querySelector('.popup__close-button_action_edit');
const formElement = document.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileNameInput = document.querySelector('.popup__input_name_name');
const profileCaption = document.querySelector('.profile__caption');
const profileCaptionInput = document.querySelector('.popup__input_name_caption');
const popupEditProfile = document.querySelector('.popup__edit-profile');

function editButtonHandler() {
    profileNameInput.value = profileName.textContent;
    profileCaptionInput.value = profileCaption.textContent;
    popupOpen(popupEditProfile);
}    

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileCaption.textContent = profileCaptionInput.value;
    closeButtonHandler();
}

// шпионы
editButton.addEventListener('click', editButtonHandler);
closeButtonEdit.addEventListener('click', closeButtonHandler);
formElement.addEventListener('submit', formSubmitHandler);

// Popup Add
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup__add-card');
const closeButtonAdd = document.querySelector('.popup__close-button_action_add');


function addButtonHandler() {
    popupOpen(popupAddCard);
}

// шпионы
addButton.addEventListener('click', addButtonHandler);
closeButtonAdd.addEventListener('click', closeButtonHandler);