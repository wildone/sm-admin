const EDITING = 'editing',
      VIEWING = 'viewing';

export default {
  observers: [
    '_emitEditingOrViewing(_editable)'
  ],

  _emitEditingOrViewing(_editable) {
    if (!(Simpla && Simpla.client && Simpla.client.emit)) {
      return;
    }

    Simpla.client.emit(_editable ? EDITING : VIEWING);
  }
};
