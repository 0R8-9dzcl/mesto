function popupOpen(popupElement) {
    popupElement.classList.add('popup_opened');
}

function closeButtonHandler() {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
}

// Popup Edit
const editButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup__edit-profile');
const closeButtonEdit = document.querySelector('.popup__close-button_action_edit');
const formEdit = document.querySelector('.popup__form_action_edit');
const profileName = document.querySelector('.profile__name');
const profileNameInput = document.querySelector('.popup__input_name_name');
const profileCaption = document.querySelector('.profile__caption');
const profileCaptionInput = document.querySelector('.popup__input_name_caption');

function editButtonHandler() {
    profileNameInput.value = profileName.textContent;
    profileCaptionInput.value = profileCaption.textContent;
    popupOpen(popupEditProfile);
}    

function editSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = profileNameInput.value;
    profileCaption.textContent = profileCaptionInput.value;
    closeButtonHandler();
}

// шпионы
editButton.addEventListener('click', editButtonHandler);
closeButtonEdit.addEventListener('click', closeButtonHandler);
formEdit.addEventListener('submit', editSubmitHandler);

// Popup Add
const addButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup__add-card');
const closeButtonAdd = document.querySelector('.popup__close-button_action_add');
const formAdd = document.querySelector('.popup__form_action_add');



// шпионы
addButton.addEventListener('click', () => popupOpen(popupAddCard));
closeButtonAdd.addEventListener('click', closeButtonHandler);

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
	const target = evt.target;
	const currentCard = target.closest('.card');

	currentCard.remove();
}

function createDomNode(item) {
	const newCard = templateCard.querySelector('.card').cloneNode(true);
    const cardTitle = newCard.querySelector('.card__title');
    const cardPhoto = newCard.querySelector('.card__photo');
    const trashButton = newCard.querySelector('.card__delete');

	cardTitle.textContent = item.name;
	cardPhoto.src = item.link;
	cardPhoto.alt = item.name;
    trashButton.addEventListener('click', deleteCardHandler);
	return newCard;
}

function renderList() {
	const result = initialCards.map(item => {
		const newCard = createDomNode(item);
		return newCard;
	});
	photoContainer.append(...result);
}

renderList()

function addCardHandler(evt) {
    evt.preventDefault();
    const card = createDomNode({name: cardTitleInput.value, link: cardSourceInput.value});
    photoContainer.prepend(card);
    closeButtonHandler();
    cardTitleInput.value ='';
    cardSourceInput.value ='';
}
  
formAdd.addEventListener('submit', addCardHandler);