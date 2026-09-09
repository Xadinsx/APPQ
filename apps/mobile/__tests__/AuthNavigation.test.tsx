import React from 'react';
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { AppThemeProvider } from '../src/theme';
import {
  SessionProvider,
  useSession,
  type SessionContextValue,
} from '../src/store/SessionContext';
import { AppText } from '../src/components';
import { themes } from '../src/theme/theme';
import { WelcomeScreen } from '../src/features/auth/screens/WelcomeScreen';
import { ProfileScreen } from '../src/features/profile/screens/ProfileScreen';
import { signOut as clearSession } from '../src/store/session';
import * as profileApi from '../src/services/api/profile';

jest.mock('../src/services/api/profile', () => ({
  fetchProfile: jest.fn(),
}));

describe('auth session gate', () => {
  afterEach(() => {
    clearSession();
  });

  it('toggles session state through sign-in and sign-out', async () => {
    let session: SessionContextValue | undefined;

    function SessionProbe(): React.JSX.Element {
      session = useSession();
      return (
        <AppText>
          {session.isAuthenticated ? 'signed-in' : 'signed-out'}
        </AppText>
      );
    }

    await render(
      <ThemeProvider theme={themes.dark}>
        <SessionProvider initialAuthenticated={false}>
          <SessionProbe />
        </SessionProvider>
      </ThemeProvider>,
    );

    expect(screen.getByText('signed-out')).toBeTruthy();

    await act(async () => {
      session?.signIn();
    });
    expect(screen.getByText('signed-in')).toBeTruthy();

    await act(async () => {
      session?.signOut();
    });
    expect(screen.getByText('signed-out')).toBeTruthy();
  });
});

describe('auth and profile screens', () => {
  afterEach(() => {
    clearSession();
  });

  it('renders welcome navigation actions and profile sign out control', async () => {
    const navigate = jest.fn();
    jest.mocked(profileApi.fetchProfile).mockResolvedValue({
      id: 'u1',
      email: 'demo@appquest.dev',
      name: 'Demo Player',
      pointsBalance: 12450,
      createdAt: new Date().toISOString(),
    });

    await render(
      <AppThemeProvider>
        <WelcomeScreen
          navigation={
            {
              navigate,
            } as unknown as React.ComponentProps<
              typeof WelcomeScreen
            >['navigation']
          }
          route={
            {
              key: 'Welcome',
              name: 'Welcome',
            } as unknown as React.ComponentProps<typeof WelcomeScreen>['route']
          }
        />
      </AppThemeProvider>,
    );

    expect(screen.getByText('AppQuest')).toBeTruthy();
    fireEvent.press(screen.getByText('Log in'));
    expect(navigate).toHaveBeenCalledWith('Login');

    await render(
      <AppThemeProvider>
        <SessionProvider initialAuthenticated>
          <ProfileScreen />
        </SessionProvider>
      </AppThemeProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Sign out')).toBeTruthy();
    });
  });
});
