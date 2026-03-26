export function sanitizeName(value: string): string {
  return value.replace(/[^a-zA-Z\s'-]/g, '').replace(/\s+/g, ' ').trimStart();
}

export function sanitizePhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 15);
  if (!digits) return '';
  if (digits.length < 4) return `+${digits}`;
  if (digits.length < 8) return `+${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}${digits.length > 10 ? ` ${digits.slice(10)}` : ''}`.trim();
}

export function sanitizeAddress(value: string): string {
  return value.replace(/\s+/g, ' ').trimStart();
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
}

export function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function sanitizeCvv(value: string): string {
  return value.replace(/\D/g, '').slice(0, 4);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isValidPassword(value: string): boolean {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,64}$/.test(value);
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}

export function isValidCardNumber(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return /^\d{16}$/.test(digits);
}

export function isValidExpiry(value: string): boolean {
  if (!/^\d{2}\/\d{2}$/.test(value)) return false;
  const [mmStr, yyStr] = value.split('/');
  const mm = Number(mmStr);
  const yy = Number(yyStr);
  if (mm < 1 || mm > 12) return false;
  const now = new Date();
  const currentYY = now.getFullYear() % 100;
  const currentMM = now.getMonth() + 1;
  if (yy < currentYY) return false;
  if (yy === currentYY && mm < currentMM) return false;
  return true;
}

export function isValidCvv(value: string): boolean {
  return /^\d{3,4}$/.test(value);
}
