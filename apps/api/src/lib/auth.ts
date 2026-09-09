import { createHash, randomBytes } from 'node:crypto';
import * as bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { AppError } from './errors.js';
const encoder = new TextEncoder();

function accessSecret(): Uint8Array {
  return encoder.encode(process.env.JWT_ACCESS_SECRET ?? 'dev-access-secret');
}

export type AccessTokenPayload = {
  sub: string;
  email: string;
};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return bcrypt.compare(password, passwordHash);
}

export async function signAccessToken(
  payload: AccessTokenPayload,
): Promise<string> {
  return new jose.SignJWT({ email: payload.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_ACCESS_TTL ?? '15m')
    .sign(accessSecret());
}

export async function verifyAccessToken(
  token: string,
): Promise<AccessTokenPayload> {
  try {
    const { payload } = await jose.jwtVerify(token, accessSecret());
    if (!payload.sub || typeof payload.email !== 'string') {
      throw new AppError(401, 'UNAUTHORIZED', 'Invalid access token');
    }
    return { sub: payload.sub, email: payload.email };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(401, 'UNAUTHORIZED', 'Invalid or expired access token');
  }
}

export function createRefreshTokenValue(): string {
  return randomBytes(48).toString('base64url');
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function refreshExpiresAt(): Date {
  const ttl = process.env.JWT_REFRESH_TTL ?? '7d';
  const match = /^(\d+)([smhd])$/.exec(ttl);
  const amount = match ? Number(match[1]) : 7;
  const unit = match?.[2] ?? 'd';
  const ms =
    unit === 's'
      ? amount * 1000
      : unit === 'm'
        ? amount * 60_000
        : unit === 'h'
          ? amount * 3_600_000
          : amount * 86_400_000;
  return new Date(Date.now() + ms);
}
