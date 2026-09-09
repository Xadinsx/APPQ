import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV({ id: 'appq-auth' });

const ACCESS_KEY = 'access-token';
const REFRESH_KEY = 'refresh-token';

export function getAccessToken(): string | undefined {
  return storage.getString(ACCESS_KEY);
}

export function getRefreshToken(): string | undefined {
  return storage.getString(REFRESH_KEY);
}

export function setTokens(accessToken: string, refreshToken: string): void {
  storage.set(ACCESS_KEY, accessToken);
  storage.set(REFRESH_KEY, refreshToken);
}

export function clearTokens(): void {
  storage.remove(ACCESS_KEY);
  storage.remove(REFRESH_KEY);
}
