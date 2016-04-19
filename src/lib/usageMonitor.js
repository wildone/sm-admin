const SESSION_KEY = 'sm-session',
      SECOND = 1000,
      INTERVAL = 10 * SECOND;

export default function() {
  const { api, server } = simpla.config,
        endpoint = `${server}/projects/${api}/usage`;

  function pingSession() {
    fetch(endpoint, { method: 'POST' });
  }

  function stillInSession() {
    let expiry = window.localStorage.getItem(SESSION_KEY),
        now = Date.now();

    return expiry && parseInt(expiry) > now;
  }

  function updateSession() {
    window.localStorage.setItem(SESSION_KEY, Date.now() + INTERVAL);
  }

  if (!stillInSession()) {
    pingSession();
  }

  updateSession();

  window.addEventListener('beforeunload', function() {
    updateSession();
  });
}
