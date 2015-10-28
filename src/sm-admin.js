import clickEvents from './behaviors/clickEvents';

const EDIT = 'edit';

class SmAdmin {
  beforeRegister() {
    this.is = 'sm-admin';

    this.properties = {
      _authenticated: {
        type: Boolean,
        observer: '_authenticatedChanged'
      },
      _notAuthenticated: {
        type: Boolean,
        computed: '_computeNotAuthenticated(_authenticated)',
        value: true
      },
      _edit: {
        type: Boolean,
        value: false
      },
      _editable: Boolean
    };

    this.observers = [
      '_updateEditable(_authenticated, _edit)'
    ];
  }

  get behaviors() {
    return [
      clickEvents
    ];
  }

  ready() {
    window.simpla = window.simpla || {};
    window.simpla.notifications = this.$.notify;

    window.addEventListener('hashchange', () => {
      this._edit = window.location.hash.split('#').pop() === EDIT;
    });
  }

  _computeNotAuthenticated(_authenticated) {
    return !_authenticated;
  }

  _updateEditable(_authenticated, _edit) {
    this._editable = _authenticated && _edit;
  }

  _authenticatedChanged(_authenticated) {
    if (!_authenticated) {
      window.location.hash = '';
    }
  }
}

Polymer(SmAdmin);
