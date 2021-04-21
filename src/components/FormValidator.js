export default class FormValidator {
    constructor(validateConfig, formElement) {
        this._form = formElement;
        this._inputList = Array.from(this._form.querySelectorAll(validateConfig.inputSelector));
        this._submitButton = this._form.querySelector(validateConfig.submitButtonSelector);
        this._submitButtonInactive = validateConfig.submitButtonInactive;
        this._inputErrorClass = validateConfig.inputErrorClass;
        this._errorClass = validateConfig.errorClass;
    }
    _hasInvalidInput() { 
        return this._inputList.some(inputElement => !inputElement.validity.valid);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._submitButtonInactive);
        } else {
            this._submitButton.classList.remove(this._submitButtonInactive);
            this._submitButton.removeAttribute('disabled');
        }
    }
    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = "";
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    }
    _showInputError(inputElement) {
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
        errorElement.textContent = inputElement.validationMessage;
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    }
    _checkInput(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }
    _setInputListeners() {
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInput(inputElement);
                this._toggleButtonState();
            });
        });
    }
    enableValidation() {
        // this._form.addEventListener('submit', evt => evt.preventDefault());
        if (this._hasInvalidInput()) {
            this._inputList.forEach(inputElement => this._hideInputError(inputElement));
        }
        this._setInputListeners();
    }
    clearValidation() {
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement);
        });
        this._toggleButtonState();
    }
}