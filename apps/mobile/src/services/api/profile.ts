import { apiRequest } from './client';
import type { AuthUser } from './auth';

export async function fetchProfile(): Promise<
  AuthUser & { createdAt: string }
> {
  const data = await apiRequest<{
    profile: AuthUser & { createdAt: string };
  }>('/profile');
  return data.profile;
}
