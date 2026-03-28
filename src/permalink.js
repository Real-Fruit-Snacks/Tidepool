export function readPermalink() {
  const hash = window.location.hash.slice(1);
  if (!hash) return null;
  const decoded = decodeURIComponent(hash.replace(/\+/g, ' '));
  if (decoded.length > 200) return null;
  return decoded;
}

export function writePermalink(command) {
  const encoded = encodeURIComponent(command).replace(/%20/g, '+');
  history.replaceState(null, '', `#${encoded}`);
}

export function clearPermalink() {
  history.replaceState(null, '', window.location.pathname);
}
