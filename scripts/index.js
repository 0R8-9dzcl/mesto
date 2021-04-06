import FormValidator from '../components/FormValidator.js'
import { validateConfig, popupEditConfig, addCardConfig } from '../components/config.js';

import Card from '../components/Card.js';
import { initialCards } from '../components/initial-cards.js';
import { handleClickOverlay, openPopup, closePopup } from '../components/Utils.js';


document.addEventListener('click', handleClickOverlay);

// Popup Edit ------------------------------------------------------------------


const editButtonHandler =() => {
    popupEditConfig.profileNameInput.value = popupEditConfig.profileName.textContent;
    popupEditConfig.profileCaptionInput.value = popupEditConfig.profileCaption.textContent;
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
    const formValidator = new FormValidator(validateConfig, popupEditConfig.formEdit);
    formValidator.clearValidation();
    formValidator.enableValidation();
});
popupEditConfig.closeButtonEdit.addEventListener('click',() => closePopup(popupEditConfig.popupEditProfile));
popupEditConfig.formEdit.addEventListener('submit', editSubmitHandler);

// Popup Add -----------------------------------------------------------------------
//  Отрисовка карточек
const renderList = () =>{
    initialCards.forEach(item => {
        const card = new Card(item, '.template-card');
        const cardElement = card.generateCard();
        addCardConfig.photoContainer.append(cardElement);
    });
};

renderList()
// создание новой карточки
const addCardSubmit = evt => {
    evt.preventDefault();
    const card = new Card({name: addCardConfig.cardTitleInput.value, link: addCardConfig.cardSourceInput.value}, '.template-card');
    const cardElement = card.generateCard();
    addCardConfig.photoContainer.prepend(cardElement);
    closePopup(addCardConfig.popupAddCard);
};

// // шпионы
addCardConfig.addButton.addEventListener('click', () => {
    addCardConfig.formAdd.reset();
    const formValidator = new FormValidator(validateConfig, addCardConfig.formAdd);
    formValidator.clearValidation();
    formValidator.enableValidation();
    openPopup(addCardConfig.popupAddCard)
});
addCardConfig.closeButtonAdd.addEventListener('click',() => closePopup(addCardConfig.popupAddCard));
addCardConfig.formAdd.addEventListener('submit', addCardSubmit);