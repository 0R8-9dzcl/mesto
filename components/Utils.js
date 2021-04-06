const clickPopupListener = () => {
    const popups = document.querySelectorAll('.popup'); 
    popups.forEach((popup) => {
        popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                closePopup(popup);
            }
            if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup);
            }
        })
    })
};

const handleEscapeButton = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
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

export { clickPopupListener, openPopup, closePopup };