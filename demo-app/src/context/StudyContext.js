import { createContext, useContext, useEffect, useState } from 'react';
import { authorizedGet } from '../lib/authApi';
import { useAuth } from './AuthContext';

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const { authToken } = useAuth();
  const [studySteps, setStudySteps] = useState([]);

  // fetch study data from backend and store in state
  useEffect(() => {
    async function fetchStudyData() {
      try {
        if (!authToken) {
          return;
        }
        const data = await authorizedGet(`/study-steps`, authToken);
        setStudySteps(data);
      } catch (error) {
        console.error('Error fetching study data:', error);
      }
    }

    fetchStudyData();
  }, [authToken]);

  return (
    <StudyContext value={{ studySteps, setStudySteps }}>
      {children}
    </StudyContext>
  );
};

export const useStudyContext = () => {
  const context = useContext(StudyContext);
  if (!context) {
    throw new Error('useStudyContext must be used within a StudyProvider');
  }
  return context;
};

export default StudyContext;
