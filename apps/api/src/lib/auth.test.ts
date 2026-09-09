import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  createRefreshTokenValue,
  hashPassword,
  hashToken,
  verifyPassword,
} from './auth.js';
import { AppError, toErrorBody } from './errors.js';
import { parseWithSchema } from './validate.js';
import { z } from 'zod';

test('password hash round-trips', async () => {
  const hash = await hashPassword('password123');
  assert.equal(await verifyPassword('password123', hash), true);
  assert.equal(await verifyPassword('wrong', hash), false);
});

test('refresh token hashing is stable', () => {
  const token = createRefreshTokenValue();
  assert.equal(hashToken(token), hashToken(token));
  assert.notEqual(hashToken(token), hashToken(createRefreshTokenValue()));
});

test('AppError serializes to standard body', () => {
  const error = new AppError(400, 'VALIDATION_ERROR', 'bad', { field: 'email' });
  assert.deepEqual(toErrorBody(error), {
    error: {
      code: 'VALIDATION_ERROR',
      message: 'bad',
      details: { field: 'email' },
    },
  });
});

test('parseWithSchema rejects invalid payloads', () => {
  assert.throws(
    () =>
      parseWithSchema(z.object({ email: z.string().email() }), {
        email: 'nope',
      }),
    (error: unknown) =>
      error instanceof AppError && error.code === 'VALIDATION_ERROR',
  );
});
