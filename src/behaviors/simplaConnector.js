const EDITING = 'editing',
      VIEWING = 'viewing';

export default {
  observers: [
    '_emitEditingOrViewing(_editable)'
  ],

  _emitEditingOrViewing(_editable) {
    let toEmit = _editable ? EDITING : VIEWING;

    if (!(window.Simpla && window.Simpla.client && window.Simpla.client.emit)) {
      return;
    }

    this.debounce(`emitting-${toEmit}`, function() {
      window.Simpla.client.emit(toEmit);
    });
  }
};
