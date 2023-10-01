export default class Api{
	constructor(selector) {
		this._url = selector.url;
		this._headers = selector.headers;
	}
	_checkOk(res) {
		if(res.ok) {
			return res.json();
		} else {
			return Promise.reject(res.status);
		}
	}
	getCards() {
		return fetch(this._url + 'cards', {
			method: 'GET',
			headers: this._headers
		})
		.then(this._checkOk)
	}
	postCards(name, link) {
		return fetch(this._url + 'cards', {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				link: link
			})
		})
		.then(this._checkOk)
	}
	getUserInfo() {
		return fetch(this._url + 'users/me', {
			method: 'GET',
			headers: this._headers
		})
		.then(this._checkOk)
	}
	setUserInfo(name, caption) {
		return fetch(this._url + 'users/me', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
                name: name,
                about: caption
			})
		})
		.then(this._checkOk)
	}
	updAvatar(src) {
		return fetch(this._url + 'users/me/avatar', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: src
			})
		})
		.then(this._checkOk)
	}
	deleteCard(cardId) {
		return fetch(this._url + `cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
		.then(this._checkOk)
	}
	addCardLike(cardId) {
		return fetch(this._url + `cards/likes/${cardId}`, {
			method: 'PUT',
			headers: this._headers
		})
		.then(this._checkOk)
	}
	removeCardLike(cardId) {
		return fetch(this._url + `cards/likes/${cardId}`, {
			method: 'DELETE',
			headers: this._headers
		})
		.then(this._checkOk)
	}
}