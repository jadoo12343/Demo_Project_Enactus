export function isValidRoll(value: string): boolean {
  return /^\d{4}[A-Z]{2,4}\d{4}$/.test(value.trim().toUpperCase());
}
