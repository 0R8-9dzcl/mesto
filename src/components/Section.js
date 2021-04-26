export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._data = items;
		this._renderer  = renderer ;
		this._container = containerSelector;
	}
	renderItems() {
		this._data.forEach(item => this._renderer(item));
	}
	addItem(element, toEnd) {
		this._container[toEnd](element);
	}
}