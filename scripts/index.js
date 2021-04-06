import FormValidator from '../components/FormValidator.js'
import { validateConfig, popupEditConfig, addCardConfig, сardSetting, popupImgSetting } from '../components/config.js';

import Card from '../components/Card.js';
import { initialCards } from '../components/initial-cards.js';
import { clickPopupListener, openPopup, closePopup } from '../components/utils.js';


clickPopupListener();

// Popup Edit ------------------------------------------------------------------

//валидация
const formEditValidator = new FormValidator(validateConfig, popupEditConfig.formEdit);
formEditValidator.enableValidation();

const editButtonHandler =() => {
    popupEditConfig.profileNameInput.value = popupEditConfig.profileName.textContent;
    popupEditConfig.profileCaptionInput.value = popupEditConfig.profileCaption.textContent;
    formEditValidator.clearValidation();
    openPopup(popupEditConfig.popupEditProfile);
};

const editSubmitHandler = evt => {
    evt.preventDefault();
    popupEditConfig.profileName.textContent = popupEditConfig.profileNameInput.value;
    popupEditConfig.profileCaption.textContent = popupEditConfig.profileCaptionInput.value;
    closePopup(popupEditConfig.popupEditProfile);
};

// шпионы
popupEditConfig.editButton.addEventListener('click', () => {
    editButtonHandler();
});
popupEditConfig.formEdit.addEventListener('submit', editSubmitHandler);

// Popup Add -----------------------------------------------------------------------
// открытие попапа картинки
const handleCardClick = (name, link) => {
    popupImgSetting.popupImg.src = link; 
    popupImgSetting.popupImg.alt = name; 
    popupImgSetting.popupImgCaption.textContent = name;
    openPopup(popupImgSetting.popupPhoto);
};

const addCard = (cardElement, toEnd) => {
    const method = toEnd ? 'append' : 'prepend';
    addCardConfig.photoContainer[method](cardElement);
}

const createCard  = (item, toEnd) => {
    const card = new Card(item, handleCardClick, сardSetting, '.template-card');
    const cardElement = card.generateCard();
    addCard(cardElement, toEnd);
};

//  Отрисовка карточек
const renderList = () =>{
    initialCards.forEach(item => {
        createCard(item, true);
    });
};

renderList();
// создание новой карточки
const addCardSubmit = evt => {
    evt.preventDefault();
    createCard({
        name: addCardConfig.cardTitleInput.value,
        link: addCardConfig.cardSourceInput.value
    });
    closePopup(addCardConfig.popupAddCard);
};

// валидация

const formCardValidator = new FormValidator(validateConfig, addCardConfig.formAdd);
formCardValidator.enableValidation();

// // шпионы
addCardConfig.addButton.addEventListener('click', () => {
    addCardConfig.formAdd.reset();
    // часть кода в прощлый раз я забыл удалить, но здесь прошу обратить внимание на то,
    // что этот метод удаляет ошибки
    formCardValidator.clearValidation();
    openPopup(addCardConfig.popupAddCard)
});
addCardConfig.formAdd.addEventListener('submit', addCardSubmit);