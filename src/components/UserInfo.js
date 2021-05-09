export default class UserInfo {
	constructor(avatar, name, caption) {
		this._avatar = avatar;
		this._name = name;
		this._caption = caption;
	}
	getUserInfo() {
		return {
			name: this._name.textContent,
			caption: this._caption.textContent
		}
	}
	setUserInfo(name, caption) {
		this._name.textContent = name;
		this._caption.textContent = caption;
	}
	setUserAvatar(avatar){
		this._avatar.src = avatar;
	}
}