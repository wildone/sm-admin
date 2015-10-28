const EVENTS = [
        'tap',
        'mouseup',
        'mousedown',
        'click',
        'touchup',
        'touchdown'
      ],
      SELECTOR = 'simpla-img, simpla-text';

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
  let hasSimpla = (tree) => tree.querySelectorAll(SELECTOR).length !== 0,
      isSimpla = (element) => !!element.localName.match(/simpla-*/),
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
  return [].slice.call(root.querySelectorAll(SELECTOR));
};

export default {
  _disableClickEvents(root) {
    let elements = getSimplaElements(root);
    elements.forEach(stopAllEvents);
    runOnNonSimpla(root, disablePointerEvents);
  },

  _enableClickEvents(root) {
    let elements = getSimplaElements(root);
    elements.forEach(el => el._restoreEvents());

    runOnNonSimpla(root, enablePointerEvents);
  }
};
