import './index.css';
import { validateConfig, popupUpdAvatar, popupEditConfig, addCardConfig, cardDeletePopup, сardSetting, popupPhoto } from '../utils/config.js';
import FormValidator from '../components/FormValidator'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
// import { initialCards } from '../utils/initial-cards.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupDeleteCard from '../components/PopupDeleteCard';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';

// Данные пользователя
const userInfo = new UserInfo(popupUpdAvatar.avatarImg, popupEditConfig.profileName, popupEditConfig.profileCaption);

// попапы -------------------------------
const popupAvatarUpd = new PopupWithForm(popupUpdAvatar.popupAvatar,
    {
        submitForm: (data) => {
            api.updAvatar(data.avatar)
            .then(result => {
                userInfo.setUserAvatar(result.avatar);
                popupAvatarUpd.close();
            })
        }
    }
);


const popupEdit = new PopupWithForm(popupEditConfig.popupEditProfile,
    {
        submitForm: (data) => {
            api.setUserInfo(data.name, data.caption)
            .then(result => {
                userInfo.setUserInfo(result.name, result.about);
                popupEdit.close();
            })
        }
    }
);

const popupAdd = new PopupWithForm(addCardConfig.popupAddCard, 
    {
        submitForm: (data) => {
            api.postCards(data.place, data.source)
            .then(result => {
                const cardElement = createCard({
                    name: result.name,
                    link: result.link
                });
                renderCard.addItem(cardElement, 'prepend');
                popupAdd.close();
            })
        }
    }
);

const popupDelete = new PopupDeleteCard(cardDeletePopup.confirmSelector, 
    {
        submitForm: (data) => {
            
            console.log('done')
        }
    }
);

const popupImage = new PopupWithImage(popupPhoto);

//валидация

const formAvatarValidator = new FormValidator(validateConfig, popupUpdAvatar.avatarForm);
formAvatarValidator.enableValidation();
const formEditValidator = new FormValidator(validateConfig, popupEditConfig.formEdit);
formEditValidator.enableValidation();
const formCardValidator = new FormValidator(validateConfig, addCardConfig.formAdd);
formCardValidator.enableValidation();

//Avatar update  ---------

const updButtonHandler = () => {
    formAvatarValidator.clearValidation();
    popupAvatarUpd.open();
};

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
        сardSetting,
        addCardConfig.cardTemplate,
        openConfirmPopup
    );
    const cardElement = card.generateCard();
    return cardElement;
};

function openConfirmPopup() {
    popupDelete.open();
}

const renderCard = new Section(
    {
        renderer: (item) => {
            const cardElement = createCard(item);
            renderCard.addItem(cardElement, 'append');
        },
    },
    addCardConfig.photoContainer
);

popupAvatarUpd.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupImage.setEventListeners();

// шпионы
popupUpdAvatar.avatarButtun.addEventListener('click', updButtonHandler);
popupEditConfig.editButton.addEventListener('click', editButtonHandler);

addCardConfig.addButton.addEventListener('click', () => {
    formCardValidator.clearValidation();
    popupAdd.open();
    
});

// api   ---------------
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
    headers: {
        authorization: '577b546f-6478-4029-92a1-5665bab78a44',
        'Content-Type': 'application/json'
    }
})
api.getCards()
.then(data => {
    renderCard.renderItems(data);
    return renderCard;
})

api.getUserInfo()
.then(result => {
    userInfo.setUserInfo(result.name, result.about);
    userInfo.setUserAvatar(result.avatar);
})
.catch(err => {
    console.log(`Загрузка данных пользователя... Ошибка: ${err}`)
})


// e90605067d5eb37834f26764