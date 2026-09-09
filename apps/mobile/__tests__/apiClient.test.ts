import { ApiError, getErrorMessage } from '../src/services/api/errors';
import {
  setTokens,
  getAccessToken,
  clearTokens,
} from '../src/services/api/tokens';

describe('api tokens', () => {
  afterEach(() => {
    clearTokens();
  });

  it('stores and clears access tokens in MMKV', () => {
    expect(getAccessToken()).toBeUndefined();
    setTokens('access-1', 'refresh-1');
    expect(getAccessToken()).toBe('access-1');
    clearTokens();
    expect(getAccessToken()).toBeUndefined();
  });
});

describe('api errors', () => {
  it('prefers ApiError message over fallback', () => {
    expect(getErrorMessage(new ApiError(400, 'BAD', 'Nope'), 'fallback')).toBe(
      'Nope',
    );
    expect(getErrorMessage(new Error('boom'), 'fallback')).toBe('boom');
    expect(getErrorMessage('x', 'fallback')).toBe('fallback');
  });
});
