import './index.css';
import { validateConfig, popupEditConfig, addCardConfig, сardSetting, popupPhoto } from '../utils/config.js';
import FormValidator from '../components/FormValidator'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import { initialCards } from '../components/initial-cards.js';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

// Данные пользователя
const userInfo = new UserInfo(popupEditConfig.profileName, popupEditConfig.profileCaption);

// попапы
const popupEdit = new PopupWithForm(popupEditConfig.popupEditProfile,
    {
        submitForm: (data) => {
            userInfo.setUserInfo(data);
            popupEdit.close();
        }
    }
);

const popupAdd = new PopupWithForm(addCardConfig.popupAddCard, 
    {
        submitForm: (data) => {
            const cardElement = createCard({
                name: data.place,
                link: data.source
            });
            renderCard.addItem(cardElement);
            popupAdd.close();
        }
    }
);
const popupImage = new PopupWithImage(popupPhoto);

//валидация

const formEditValidator = new FormValidator(validateConfig, popupEditConfig.formEdit);
formEditValidator.enableValidation();
const formCardValidator = new FormValidator(validateConfig, addCardConfig.formAdd);
formCardValidator.enableValidation();

// Popup Edit ------------------------------------------------------------------

const editButtonHandler = () => {
    const profileData = userInfo.getUserInfo()
    popupEditConfig.profileNameInput.value = profileData.name;
    popupEditConfig.profileCaptionInput.value = profileData.caption;
    formEditValidator.clearValidation();
    popupEdit.open();
};


// Popup Add -----------------------------------------------------------------------

//  Отрисовка карточек
const createCard  = (item) => {
    const card = new Card(
        item,
        {
            handleCardClick: (name, link) => {
                popupImage.open({ name, link });
            }
        },
        сardSetting, '.template-card');
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

popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupImage.setEventListeners();

// шпионы
popupEditConfig.editButton.addEventListener('click', editButtonHandler);

addCardConfig.addButton.addEventListener('click', () => {
    formCardValidator.clearValidation();
    popupAdd.open();
});