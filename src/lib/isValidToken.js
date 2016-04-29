const TOKEN_ISSUER = 'https://simpla.auth0.com/';

export default function tokenIsValid(token) {
  const now = (new Date()).getTime() / 1000;
  let payload;

  if (!token) {
    return true;
  }

  try {
    let [, payloadString, ] = token.split('.');
    payload = JSON.parse(atob(payloadString));
  } catch (e) {
    console.warn('Invalid token', e.message);
    return false;
  }

  // Check if payload has expired
  if (payload.exp && now > payload.exp) {
    return false;
  }

  // Check to see if issuer
  if (!payload.iss || payload.iss !== TOKEN_ISSUER) {
    return false;
  }

  return true;
}
