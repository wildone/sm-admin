const EVENTS = [
        'tap',
        'mouseup',
        'mousedown',
        'click',
        'touchup',
        'touchdown'
      ],
      SIMPLA_SELECTOR = 'simpla-img, simpla-text',
      SM_SELECTOR = 'simpla-img, simpla-text, sm-admin';

function stopEvent(event) {
  event.stopPropagation();
}

function stopAllEvents(element) {
  EVENTS.forEach(ev => element.addEventListener(ev, stopEvent));
  element._restoreEvents = () => {
    EVENTS.forEach(ev => element.removeEventListener(ev, stopEvent));
  };
}

function runOnNonSimpla(root, callback) {
  let hasSimpla = (tree) => tree.querySelectorAll(SM_SELECTOR).length !== 0,
      isSimpla = (element) => !!element.localName.match(/simpla-*|sm-/),
      walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT,
        (element) => {
          if (isSimpla(element)) {
            return NodeFilter.FILTER_REJECT;
          }

          if (hasSimpla(element)) {
            return NodeFilter.FILTER_SKIP;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      ),
      element;

  while (element = walker.nextNode()) {
    callback(element);
  }
}

function disablePointerEvents(element) {
  element.style.pointerEvents = 'none';
};

function enablePointerEvents(element) {
  element.style.pointerEvents = '';
};

function getSimplaElements(root) {
  return [].slice.call(root.querySelectorAll(SIMPLA_SELECTOR));
};

export default {
  properties: {
    _clicksDisabled: {
      type: Boolean,
      value: false
    }
  },

  observers: [
    '_shouldDisableClicks(_edit, _clicksDisabled)'
  ],

  _disableClickEvents(root) {
    let elements = getSimplaElements(root);
    elements.forEach(stopAllEvents);
    runOnNonSimpla(root, disablePointerEvents);

    this._clicksDisabled = true;
  },

  _enableClickEvents(root) {
    let elements = getSimplaElements(root);
    elements.forEach(el => el._restoreEvents());

    runOnNonSimpla(root, enablePointerEvents);

    this._clicksDisabled = false;
  },

  _shouldDisableClicks(edit, disabled) {
    const root = document.body;

    if (edit && !disabled) {
      this._disableClickEvents(root);
    } else if (!edit && disabled) {
      this._enableClickEvents(root);
    }
  }
};
