/**
 * When DOM is ready, inject admin and namespace body
 */
export function inject() {
  let body,
      admin,
      namespace;

  body = document.body;

  // Namespace
  namespace = document.createElement('sm-block-namespace');

  namespace.block = body;

  // Define getters / setters for sid and gid
  Object.defineProperty(body, 'sid', {
    get() {
      return this._smNamespace.gid;
    },
    set(value) {
      this._smNamespace.gid = value;
    },
    enumerable: true
  });

  Object.defineProperty(body, 'gid', {
    get() {
      return this._smNamespace.gid;
    },
    set(value) {
      this._smNamespace.gid = value;
    },
    enumerable: true
  });

  // Set initial value from attribute
  body.gid = body.getAttribute('gid') || body.getAttribute('sid') || '';

  // Append admin
  admin = document.createElement('sm-admin');
  body.appendChild(admin);
}

/**
 * Attach the given cofiguration to the global simpla object
 * @param  {Object} config Config object
 * @return {undefined}
 */
export function attachConfig(config) {
  window.simpla = window.simpla || {};

  // Allow the user's configuration to override the default given one
  window.simpla.config = Object.assign({}, config, window.simpla.config);
}
