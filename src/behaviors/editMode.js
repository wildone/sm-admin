export default {
  ready() {
    window.simpla = window.simpla || {};

    window.simpla.editMode = (on) => {
      let addOrRemove = on ? window.removeEventListener : window.addEventListener;
      this._edit = on;

      addOrRemove('hashchange', this._updateEditFromHash);
    }
  }
}
