import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { authorizedGet } from '../lib/authApi';
import { Redirect } from 'expo-router';

const StudyStepsContext = createContext(null);

export function StudyStepsProvider({ children }) {
  const { authToken } = useAuth();
  const [steps, setSteps] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadProtectedData() {
    setIsLoading(true);
    if (!authToken) {
      return <Redirect href="/(public)login" />;
    }

    try {
      const [studySteps, profileBody] = await Promise.all([
        authorizedGet('/study-steps?delay=700', authToken),
        authorizedGet('/auth/me', authToken),
      ]);
      setSteps(studySteps);
      setProfile(profileBody);
    } catch (error) {
      console.error('protected request failed', error);
      setErrorMessage('protected request failed', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProtectedData();
  }, [authToken]);

  const value = {
    steps,
    setSteps,
    isLoading,
    errorMessage,
    profile,
  };

  return (
    <StudyStepsContext.Provider value={value}>
      {children}
    </StudyStepsContext.Provider>
  );
}

export function useStudySteps() {
  const context = useContext(StudyStepsContext);

  if (!context) {
    throw new Error('useStudySteps must be used inside StudyStepsProvider');
  }

  return context;
}
