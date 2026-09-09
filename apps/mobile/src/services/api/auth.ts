import { apiRequest } from './client';
import { clearTokens, setTokens } from './tokens';

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  pointsBalance: number;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export async function loginRequest(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: { email, password },
    auth: false,
  });
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function registerRequest(input: {
  email: string;
  password: string;
  name?: string;
}): Promise<AuthResponse> {
  const data = await apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: input,
    auth: false,
  });
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function logoutRequest(): Promise<void> {
  try {
    await apiRequest<void>('/auth/logout', {
      method: 'POST',
      body: {},
    });
  } finally {
    clearTokens();
  }
}
