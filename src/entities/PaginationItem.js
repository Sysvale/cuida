export default class PaginationItem {
  constructor(index, value, selected, text = null) {
    this.index = index;
    this.value = value;
    this.selected = selected;
    this.text = text || value;
  }
}
