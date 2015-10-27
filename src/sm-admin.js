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
      }
    };
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

  _authenticatedChanged(_authenticated) {
    if (!_authenticated) {
      window.location.hash = '';
    }
  }
}

Polymer(SmAdmin);
