// Параметры валидации
const validateConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    submitButtonInactive: 'popup__submit_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
};

// Попап Аватара
const popupUpdAvatar = {
    avatarButtun: document.querySelector('.profile__avatar-edit'),
    avatarImg: document.querySelector('.profile__avatar'),
    popupAvatar: document.querySelector('.popup_upd-avatar'),
    avatarForm: document.querySelector('.popup__form_action_upd'),
}

// Параметры папапа редактирования
const popupEditConfig = {
    editButton: document.querySelector('.profile__edit-button'),
    popupEditProfile: document.querySelector('.popup_edit-profile'),
    formEdit: document.querySelector('.popup__form_action_edit'),

    profileName: document.querySelector('.profile__name'),
    profileNameInput: document.querySelector('.popup__input_name_name'),
    profileCaption: document.querySelector('.profile__caption'),
    profileCaptionInput: document.querySelector('.popup__input_name_caption')
};

// Параметры папапа добавления картинок
const addCardConfig = {
    addButton: document.querySelector('.profile__add-button'),
    cardTemplate: document.querySelector('.template-card'),
    popupAddCard: document.querySelector('.popup_add-card'),
    formAdd: document.querySelector('.popup__form_action_add'),
    photoContainer: document.querySelector('.cards__list'),
    cardTitleInput: document.querySelector('.popup__input_name_place'),
    cardSourceInput: document.querySelector('.popup__input_name_source')
};

const cardDeletePopup = {
    confirmSelector: document.querySelector('.popup_confirm'),
    deleteForm: document.querySelector('.popup__form_action_conf')
}

// Параметры карточек
const сardSetting = {
    cardTitle: ('.card__title'),
    cardPhoto: ('.card__photo'),
    trashButton: ('.card__delete'),
    like: ('.card__like')
};

// Параметры папапа картинок
const popupPhoto = document.querySelector('.popup_photo');

export { validateConfig, popupUpdAvatar, popupEditConfig, addCardConfig, cardDeletePopup, сardSetting, popupPhoto };