import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, meRequest, registerRequest } from '../lib/authApi';
import { clearStoredAuthSession, getStoredAuthSession, saveAuthSession } from '../lib/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [isRestoring, setIsRestoring] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    setIsRestoring(true);

    try {
      const storedSession = await getStoredAuthSession();

      if (!storedSession) {
        setAuthToken('');
        setCurrentUser(null);
        return;
      }

      const profileBody = await meRequest(storedSession.token);
      const restoredSession = {
        token: storedSession.token,
        user: profileBody.user,
      };

      setAuthToken(restoredSession.token);
      setCurrentUser(restoredSession.user);
      await saveAuthSession(restoredSession);
    } catch (error) {
      setAuthToken('');
      setCurrentUser(null);
      await clearStoredAuthSession();
    } finally {
      setIsRestoring(false);
    }
  }

  async function signIn(credentials) {
    setIsWorking(true);

    try {
      const body = await loginRequest(credentials);
      const session = {
        token: body.token,
        user: body.user,
      };

      setAuthToken(session.token);
      setCurrentUser(session.user);
      await saveAuthSession(session);
      return body;
    } finally {
      setIsWorking(false);
    }
  }

  async function registerAccount(draft) {
    setIsWorking(true);

    try {
      const body = await registerRequest(draft);
      const session = {
        token: body.token,
        user: body.user,
      };

      setAuthToken(session.token);
      setCurrentUser(session.user);
      await saveAuthSession(session);
      return body;
    } finally {
      setIsWorking(false);
    }
  }

  async function signOut() {
    setAuthToken('');
    setCurrentUser(null);
    await clearStoredAuthSession();
  }

  const value = {
    authToken,
    currentUser,
    isAuthenticated: Boolean(authToken),
    isWorking,
    isRestoring,
    signIn,
    registerAccount,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
