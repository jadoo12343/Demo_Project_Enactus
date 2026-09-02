export type Registration = {
  id: string;
  name: string;
  email: string;
  roll: string;
  eventId: string;
  createdAt: string;
};

const STORAGE_KEY = 'innovision-registrations';

export function getRegistrations(): Registration[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? (parsed as Registration[]) : [];
  } catch {
    return [];
  }
}

export function saveRegistration(registration: Registration): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...getRegistrations(), registration]));
    return true;
  } catch {
    return false;
  }
}
