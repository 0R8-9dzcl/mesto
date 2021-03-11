// общие функции
function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closeButtonHandler(popupElement) {
    popupElement.classList.remove('popup_opened');
}

// Popup Edit ------------------------------------------------------------------
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const closeButtonEdit = document.querySelector('.popup__close-button_action_edit');
const formEdit = document.querySelector('.popup__form_action_edit');
const profileName = document.querySelector('.profile__name');
const profileNameInput = document.querySelector('.popup__input_name_name');
const profileCaption = document.querySelector('.profile__caption');
const profileCaptionInput = document.querySelector('.popup__input_name_caption');

function editButtonHandler() {
    profileNameInput.value = profileName.textContent;
    profileCaptionInput.value = profileCaption.textContent;
    openPopup(popupEditProfile);
}    

function editSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileCaption.textContent = profileCaptionInput.value;
    closeButtonHandler(popupEditProfile);
}

// шпионы
editButton.addEventListener('click', editButtonHandler);
closeButtonEdit.addEventListener('click',() => closeButtonHandler(popupEditProfile));
formEdit.addEventListener('submit', editSubmitHandler);

// Popup Add ------------------------------------------------------------------------
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const closeButtonAdd = document.querySelector('.popup__close-button_action_add');
const formAdd = document.querySelector('.popup__form_action_add');

// выбор шаблона
const photoContainer = document.querySelector('.cards__list');
const templateCard = document.querySelector('.template-card').content;
const cardTitleInput = document.querySelector('.popup__input_name_place');
const cardSourceInput = document.querySelector('.popup__input_name_source');

const initialCards = [
    {
        name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function deleteCardHandler(evt) {
    evt.target.closest('.card').remove();
}

function likeCardHandler(evt) {
    evt.target.classList.toggle('card__like_active');
}

function createDomNode(item) {
    const newCard = templateCard.querySelector('.card').cloneNode(true);
    const cardTitle = newCard.querySelector('.card__title');
    const cardPhoto = newCard.querySelector('.card__photo');
    const trashButton = newCard.querySelector('.card__delete');
    const like = newCard.querySelector('.card__like');

    cardTitle.textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    // шпионы
    trashButton.addEventListener('click', deleteCardHandler);
    like.addEventListener('click', likeCardHandler);

    cardPhoto.addEventListener('click', () => handleCardClick(item.link, item.name));
    return newCard;
}

function renderList() {
    const result = initialCards.map(item => {
        const newCard = createDomNode(item);
		return newCard;
	});
	photoContainer.append(...result);
}

function addCardHandler(evt) {
    evt.preventDefault();
    const card = createDomNode({name: cardTitleInput.value, link: cardSourceInput.value});
    photoContainer.prepend(card);
    closeButtonHandler(popupEditProfile);
    cardTitleInput.value ='';
    cardSourceInput.value ='';
}

renderList()

// шпионы
addButton.addEventListener('click', () => openPopup(popupAddCard));
closeButtonAdd.addEventListener('click',() => closeButtonHandler(popupAddCard));
formAdd.addEventListener('submit', addCardHandler);

// Popup Photo ---------------------------------------------------------------------
const popupPhoto = document.querySelector('.popup_photo');
const closeButtonPhoto = document.querySelector('.popup__close-button_action_image');

function handleCardClick(link, title) {
    const popupImg = document.querySelector('.popup__img');
    const popupImgCaption = document.querySelector('.popup__img-caption');
    popupImg.src = link; 
    popupImg.alt = title; 
    popupImgCaption.textContent = title;
    openPopup(popupPhoto);
}

closeButtonPhoto.addEventListener('click',() => closeButtonHandler(popupPhoto));