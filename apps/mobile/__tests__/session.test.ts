import {
  getIsAuthenticated,
  setAuthenticated,
  signOut,
} from '../src/store/session';

describe('session store', () => {
  it('persists mock authentication flag via MMKV', () => {
    signOut();
    expect(getIsAuthenticated()).toBe(false);

    setAuthenticated(true);
    expect(getIsAuthenticated()).toBe(true);

    signOut();
    expect(getIsAuthenticated()).toBe(false);
  });
});
