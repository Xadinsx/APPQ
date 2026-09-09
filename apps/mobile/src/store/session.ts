import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'appq-session' });
const AUTH_KEY = 'is-authenticated';

export function getIsAuthenticated(): boolean {
  return storage.getString(AUTH_KEY) === 'true';
}

export function setAuthenticated(value: boolean): void {
  storage.set(AUTH_KEY, value ? 'true' : 'false');
}

export function signOut(): void {
  setAuthenticated(false);
}
