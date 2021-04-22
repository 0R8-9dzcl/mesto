import './index.css';
import FormValidator from '../components/FormValidator'
import { validateConfig, popupEditConfig, addCardConfig, сardSetting, popupImgSetting } from '../utils/config.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import { initialCards } from '../components/initial-cards.js';
import { clickPopupListener, openPopup, closePopup } from '../utils/utils.js';



//валидация

const formEditValidator = new FormValidator(validateConfig, popupEditConfig.formEdit);
formEditValidator.enableValidation();
const formCardValidator = new FormValidator(validateConfig, addCardConfig.formAdd);
formCardValidator.enableValidation();

// Popup Edit ------------------------------------------------------------------

const editButtonHandler = () => {
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

// Popup Add -----------------------------------------------------------------------

const handleCardClick = (name, link) => {
    popupImgSetting.popupImg.src = link; 
    popupImgSetting.popupImg.alt = name; 
    popupImgSetting.popupImgCaption.textContent = name;
    openPopup(popupImgSetting.popupPhoto);
};

const addCardSubmit = evt => {
    evt.preventDefault();
    const cardElement = createCard({
        name: addCardConfig.cardTitleInput.value,
        link: addCardConfig.cardSourceInput.value
    });
    renderCard.addItem(cardElement);
    closePopup(addCardConfig.popupAddCard);
};

//  Отрисовка карточек
const createCard  = (item) => {
    const card = new Card(item, handleCardClick, сardSetting, '.template-card');
    const cardElement = card.generateCard();
    return cardElement;
};

const renderCard = new Section({
    items: initialCards,
    renderer: (item) => {
		const cardElement = createCard(item);
		renderCard.addItem(cardElement);
    },
},
	addCardConfig.photoContainer
);

renderCard.renderItems();

// шпионы
clickPopupListener();

popupEditConfig.editButton.addEventListener('click', editButtonHandler);
popupEditConfig.formEdit.addEventListener('submit', editSubmitHandler);

addCardConfig.addButton.addEventListener('click', () => {
    addCardConfig.formAdd.reset();
    formCardValidator.clearValidation();
    openPopup(addCardConfig.popupAddCard)
});
addCardConfig.formAdd.addEventListener('submit', addCardSubmit);