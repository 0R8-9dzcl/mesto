export default class UserInfo {
	constructor(avatar, name, caption) {
		this._avatar = avatar;
		this._name = name;
		this._caption = caption;
		this._userId = null;
	}
	getUserInfo() {
		return {
			name: this._name.textContent,
			caption: this._caption.textContent
		}
	}
	setUserInfo(name, caption, userId) {
		this._name.textContent = name;
		this._caption.textContent = caption;
		this._userId = userId;
	}
	setUserAvatar(avatar){
		this._avatar.src = avatar;
	}
	userId() {
		return this._userId;
	}
}