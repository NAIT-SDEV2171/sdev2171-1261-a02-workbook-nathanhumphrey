import { createContext, useContext, useState } from 'react';
import { loginRequest, registerRequest } from '../lib/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isWorking, setIsWorking] = useState(false);

  async function signIn(credentials) {
    setIsWorking(true);

    try {
      const body = await loginRequest(credentials);
      setAuthToken(body.token);
      setCurrentUser(body.user);
      return body;
    } finally {
      setIsWorking(false);
    }
  }

  async function registerAccount(draft) {
    setIsWorking(true);

    try {
      const body = await registerRequest(draft);
      setAuthToken(body.token);
      setCurrentUser(body.user);
      return body;
    } finally {
      setIsWorking(false);
    }
  }

  function signOut() {
    setAuthToken('');
    setCurrentUser(null);
  }

  const value = {
    authToken,
    currentUser,
    isAuthenticated: Boolean(authToken),
    isWorking,
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
