export default class Section {
	constructor({ renderer }, containerSelector) {
		this._renderer  = renderer ;
		this._container = containerSelector;
	}
	renderItems(data) {
		data.forEach(item => this._renderer(item));
	}
	addItem(element, toEnd) {
		this._container[toEnd](element);
	}
}