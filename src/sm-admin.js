import clickEvents from './behaviors/clickEvents';
import editMode from './behaviors/editMode';
import { attachConfig, inject } from './lib/setup';

const EDIT = 'edit',
      API_URL = 'https://api.simpla.io';

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
    return [ editMode ];
  }

  ready() {
    // Needs to always be scoped to 'this', therefore added in ready
    this._updateEditFromHash = () => {
      this._edit = window.location.hash.split('#').pop() === EDIT;
    };

    let bodyMeta;

    window.simpla = window.simpla || {};
    window.simpla.notifications = this.$.notify;
    window.addEventListener('hashchange', this._updateEditFromHash);

    // Setup singleton instance
    this._toolbar = this.$.toolbar;

    // Setup state
    this._updateEditFromHash();
    this._token = window.localStorage.getItem('sm-token');

    // Setup body to take metadata
    bodyMeta = document.createElement('sm-meta-data');
    bodyMeta.block = document.body;
    bodyMeta.uid = encodeURIComponent(simpla.config.baseurl + window.location.pathname);
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
    if (_authenticated) {
      this.fire('logged-in');
    }
  }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  inject();
} else {
  document.addEventListener('DOMContentLoaded', inject);
}

attachConfig({
  config: {
    server: API_URL,
    api: null
  }
});


Polymer(SmAdmin);
