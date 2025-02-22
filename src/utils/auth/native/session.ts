import { Preferences } from '@capacitor/preferences';

const key = 'session';

export async function saveSession(session: any) {
  await Preferences.set({ key, value: JSON.stringify(session) });
}

export async function getSession() {
  const { value } = await Preferences.get({ key });
  return value ? JSON.parse(value) : null;
}

export async function clearSession() {
  await Preferences.remove({ key });
}

