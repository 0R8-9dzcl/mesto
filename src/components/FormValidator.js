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
    this._submitButton.disabled = this._hasInvalidInput()
  }
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
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
    this._setInputListeners();
  }
  clearValidation() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}