import './index.css';
import {
  validateConfig, popupUpdAvatar, popupEditConfig, addCardConfig,
  cardDeletePopup, cardSetting, popupPhoto, errorConfig
} from '../utils/config.js';
import FormValidator from '../components/FormValidator'
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupDeleteCard from '../components/PopupDeleteCard';
import UserInfo from '../components/UserInfo';
import Api from '../components/Api';
import spam from '../utils/spam.js';

// ошибки 

let errorTimer;
const showApiError = (errTxt) => {
  errorConfig.alert.classList.add(errorConfig.alertVisible);
  errorTimer = setTimeout(hideApiError, 3000);
  errorConfig.alertError.textContent = errTxt;
}

const hideApiError = () => {
  errorConfig.alert.classList.remove(errorConfig.alertVisible);
  clearTimeout(errorTimer);
  errorConfig.alertError.textContent = '';
}
// Данные пользователя
const userInfo = new UserInfo(popupUpdAvatar.avatarImg, popupEditConfig.profileName, popupEditConfig.profileCaption);



// api   ---------------
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-61/',
  headers: {
    authorization: 'dd0285f4-2ea6-4188-b21f-695fee7d6f60',
    'Content-Type': 'application/json'
  }
})
// Токен: dd0285f4-2ea6-4188-b21f-695fee7d6f60
// Идентификатор группы: cohort-61
// const api = new Api({
//   url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
//   headers: {
//     authorization: '577b546f-6478-4029-92a1-5665bab78a44',
//     'Content-Type': 'application/json'
//   }
// })
Promise.all([api.getUserInfo(), api.getCards()])
  .then(result => {    //попадаем сюда, когда оба промиса будут выполнены
    const [uerInfo, cardList] = result;
    userInfo.setUserInfo(uerInfo.name, uerInfo.about, uerInfo._id);
    userInfo.setUserAvatar(uerInfo.avatar);
    renderCard.renderItems(cardList);
    hideApiError();
    return renderCard;
  })
  .catch((err) => {     //попадаем сюда если один из промисов завершится ошибкой
    console.log(`Загрузкка данных... Ошибка: ${err}`);
    showApiError('Загрузкка данных... Ошибка');
  });

// сабмиты форм ---------------------------------------------------------------------------------------------------------
const popupAvatarUpdSubmit = ({ avatar }) => {
  const button = popupUpdAvatar.popupAvatar.querySelector('.popup__submit');
  button.textContent = 'Сохранение...';
  api.updAvatar(avatar)
    .then(result => {
      userInfo.setUserAvatar(result.avatar);
      popupAvatarUpd.close();
      hideApiError();
    })
    .catch(err => {
      console.log(`Сохранение аватара... Ошибка: ${err}`);
      showApiError('Сохранение аватара... Ошибка');
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}
const popupAvatarUpd = new PopupWithForm(popupUpdAvatar.popupAvatar, popupAvatarUpdSubmit);

const popupEditSubmit = (userData) => {
  const button = popupEditConfig.popupEditProfile.querySelector('.popup__submit');
  button.textContent = 'Сохранение...';
  api.setUserInfo(userData.name, userData.caption)
    .then(result => {
      userInfo.setUserInfo(result.name, result.about);
      popupEdit.close();
      hideApiError();
    })
    .catch(err => {
      console.log(`Сохранение данных пользователя... Ошибка: ${err}`);
      showApiError('Сохранение данных пользователя... Ошибка');
    })
    .finally(() => {
      button.textContent = 'Сохранить';
    });
}
const popupAddSubmit = ({ place, source }) => {
  const button = addCardConfig.popupAddCard.querySelector('.popup__submit');
  button.textContent = 'Добавление...';
  api.postCards(place, source)
    .then(result => {
      const cardElement = createCard(result);
      renderCard.addItem(cardElement,);
      popupAdd.close();
      hideApiError();
    })
    .catch(err => {
      console.log(`Сохранение новой карточки...... Ошибка: ${err}`);
      showApiError('Сохранение новой карточки... Ошибка');
    })
    .finally(() => {
      button.textContent = 'Создать';
    });
}

const deleteCardSubmit = (deletingCard) => {
  popupDelete.setSubmitButtonText('Удаление...');
  api.deleteCard(deletingCard._id)
    .then(() => {
      deletingCard.deleteCard();
      popupDelete.close();
      hideApiError();
    })
    .catch(err => {
      console.log(`Удаление карточки...... Ошибка: ${err}`);
      showApiError('Удаление карточки...... Ошибка');
    })
    .finally(() => popupDelete.setSubmitButtonText('Да')
    );
}
// попапы ------------------------------------------------------------------------------------------------
const popupEdit = new PopupWithForm(popupEditConfig.popupEditProfile, popupEditSubmit);

const popupAdd = new PopupWithForm(addCardConfig.popupAddCard, popupAddSubmit);


const popupDelete = new PopupDeleteCard(cardDeletePopup.confirmSelector, deleteCardSubmit);
const popupImage = new PopupWithImage(popupPhoto);

//валидация--------------------------------------------------------------

const formAvatarValidator = new FormValidator(validateConfig, popupUpdAvatar.avatarForm);
formAvatarValidator.enableValidation();
const formEditValidator = new FormValidator(validateConfig, popupEditConfig.formEdit);
formEditValidator.enableValidation();
const formCardValidator = new FormValidator(validateConfig, addCardConfig.formAdd);
formCardValidator.enableValidation();

//Avatar update  --------------------------------------

const updButtonHandler = () => {
  formAvatarValidator.clearValidation();
  popupAvatarUpd.open();
};

// Popup Edit -----------------------------------------------------------------------------------

const editButtonHandler = () => {
  const profileData = userInfo.getUserInfo()
  popupEditConfig.profileNameInput.value = profileData.name;
  popupEditConfig.profileCaptionInput.value = profileData.caption;
  formEditValidator.clearValidation();
  popupEdit.open();
};


// Popup Add -----------------------------------------------------------------------
const handleCardClick = (name, link) => {
  popupImage.open(name, link);
};
const openDeleteCardPopup = (card) => {
  popupDelete.open(card);
};
const addCardLike = (card, cardId) => {
  api.addCardLike(cardId)
    .then((result) => {
      card.setLikesInfo(result.likes);
      hideApiError();
    })
    .catch(err => {
      console.log(`Лайк карточки...... Ошибка: ${err}`);
      showApiError('Лайк карточки... Ошибка');
    });
}
const removeCardLike = (card, cardId) => {
  api.removeCardLike(cardId)
    .then((result) => {
      card.setLikesInfo(result.likes);
      hideApiError();
    })
    .catch(err => {
      console.log(`Удаление лайка карточки... Ошибка: ${err}`);
      showApiError('Удаление лайка карточки... Ошибка');
    });
}

//  Создание карточки
const createCard = (item) => {
  const userId = userInfo.userId();
  const card = new Card(
    item, { handleCardClick, addCardLike, removeCardLike, openDeleteCardPopup },
    cardSetting,
    addCardConfig.cardTemplateSelector,
    userId
  );
  const cardElement = card.generateCard();
  return cardElement;
};

//  Отрисовка карточек
const renderCard = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      renderCard.addItem(cardElement);
    },
  },
  addCardConfig.photoContainer
);

// Установка слушателей попапов
popupAvatarUpd.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupImage.setEventListeners();

// слушатели кнопок откррытия попапа
popupUpdAvatar.avatarButtun.addEventListener('click', updButtonHandler);
popupEditConfig.editButton.addEventListener('click', editButtonHandler);

addCardConfig.addButton.addEventListener('click', () => {
  formCardValidator.clearValidation();
  popupAdd.open();

});
