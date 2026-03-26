/** Session handle only — not the source of truth for profile (MySQL is). */
export const SESSION_EMAIL_KEY = 'amazium_session_email';

export function setSessionEmail(email: string | null) {
  if (typeof sessionStorage === 'undefined') return;
  if (email) sessionStorage.setItem(SESSION_EMAIL_KEY, email);
  else sessionStorage.removeItem(SESSION_EMAIL_KEY);
}

export function getSessionEmail(): string | null {
  if (typeof sessionStorage === 'undefined') return null;
  return sessionStorage.getItem(SESSION_EMAIL_KEY);
}
