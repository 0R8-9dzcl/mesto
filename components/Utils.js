const handleEscapeButton = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
};

const handleClickOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
};


const openPopup = popupElement => {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscapeButton);
};

const closePopup = popupElement => {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscapeButton);
};

export { handleClickOverlay, openPopup, closePopup };