export default class Api{
	constructor(selector) {
		this._url = selector.url;
		this._headers = selector.headers;
	}
	getCards() {
		return fetch(this._url + 'cards', {
			method: 'GET',
			headers: this._headers
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			} else {
				return Promise.reject(res.status);
			}
		})
		.catch(err => console.log(`Загрузкка списка карточек... Ошибка: ${err}`))
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
		.then(res => {
			if(res.ok) {
				return res.json();
			} else {
				return Promise.reject(res.status);
			}
		})
		.catch(err => console.log(`Сохранение новой карточки... Ошибка: ${err}`))
	}
	getUserInfo() {
		return fetch(this._url + 'users/me', {
			method: 'GET',
			headers: this._headers
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			} else {
				return Promise.reject(res.status);
			}
		})
		.catch(err => console.log(`Загрузка данных пользователя... Ошибка: ${err}`))
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
		.then(res => {
			if(res.ok) {
				return res.json();
			} else {
				return Promise.reject(res.status);
			}
		})
		.catch(err => console.log(`Сохранение данных пользователя... Ошибка: ${err}`))
	}
	updAvatar(src) {
		return fetch(this._url + 'users/me/avatar', {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: src
			})
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			} else {
				return Promise.reject(res.status);
			}
		})
		.catch(err => console.log(`Сохранение аватара... Ошибка: ${err}`))
	}
}
