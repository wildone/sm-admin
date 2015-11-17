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
      _editable: Boolean,
      _token: String
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
    const updateEditFromHash = () => {
      this._edit = window.location.hash.split('#').pop() === EDIT;
    };


    window.simpla = window.simpla || {};
    window.simpla.notifications = this.$.notify;
    window.addEventListener('hashchange', updateEditFromHash);

    // Setup singleton instance
    this._toolbar = this.$.toolbar;

    // Setup state
    updateEditFromHash();
    this._token = window.localStorage.getItem('sm-token');
  }

  _computeNotAuthenticated(_authenticated) {
    return !_authenticated;
  }

  _updateEditable(_authenticated, _edit) {
    this._editable = _authenticated && _edit;
  }

  _authenticatedChanged(_authenticated, was) {
    if (was && !_authenticated) {
      window.location.hash = '';
    }
  }
}

/**
 * When DOM is ready, inject admin
 */
function inject() {
  let body,
      admin;

  body = document.body;
  admin = document.createElement('sm-admin');
  body.appendChild(admin);
}

if (document.readyState === 'complete') {
  inject();
} else {
  document.addEventListener('DOMContentLoaded', inject);
}

Polymer(SmAdmin);
