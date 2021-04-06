// Параметры валидации
const validateConfig = {
    // formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    submitButtonInactive: 'popup__submit_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_active'
};

// Параметры папапа редактирования
const popupEditConfig = {
    editButton: document.querySelector('.profile__edit-button'),
    popupEditProfile: document.querySelector('.popup_edit-profile'),
    closeButtonEdit: document.querySelector('.popup__close-button_action_edit'),
    formEdit: document.querySelector('.popup__form_action_edit'),
    profileName: document.querySelector('.profile__name'),
    profileNameInput: document.querySelector('.popup__input_name_name'),
    profileCaption: document.querySelector('.profile__caption'),
    profileCaptionInput: document.querySelector('.popup__input_name_caption')
};

// Параметры папапа добавления картинок
const addCardConfig = {
    addButton: document.querySelector('.profile__add-button'),
    popupAddCard: document.querySelector('.popup_add-card'),
    formAdd: document.querySelector('.popup__form_action_add'),
    photoContainer: document.querySelector('.cards__list'),
    closeButtonAdd: document.querySelector('.popup__close-button_action_add'),
    cardTitleInput: document.querySelector('.popup__input_name_place'),
    cardSourceInput: document.querySelector('.popup__input_name_source')
};


// Параметры карточек
const сardSetting = {
    cardTitle: ('.card__title'),
    cardPhoto: ('.card__photo'),
    trashButton: ('.card__delete'),
    like: ('.card__like')
};

// Параметры папапа картинок
const popupImgSetting = {
    popupImg: document.querySelector('.popup__img'),
    popupPhoto: document.querySelector('.popup_photo'),
    closeButtonPhoto: document.querySelector('.popup__close-button_action_image'),
    popupImgCaption: document.querySelector('.popup__img-caption')
};

export { validateConfig, popupEditConfig, addCardConfig, сardSetting, popupImgSetting };