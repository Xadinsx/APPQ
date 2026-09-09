import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  getIsAuthenticated,
  setAuthenticated as persistAuthenticated,
  signOut as persistSignOut,
} from './session';

export type SessionContextValue = {
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

type SessionProviderProps = {
  children: React.ReactNode;
  initialAuthenticated?: boolean;
};

export function SessionProvider({
  children,
  initialAuthenticated,
}: SessionProviderProps): React.JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => initialAuthenticated ?? getIsAuthenticated(),
  );

  const signIn = useCallback(() => {
    persistAuthenticated(true);
    setIsAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    persistSignOut();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      signIn,
      signOut,
    }),
    [isAuthenticated, signIn, signOut],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within SessionProvider');
  }
  return context;
}
