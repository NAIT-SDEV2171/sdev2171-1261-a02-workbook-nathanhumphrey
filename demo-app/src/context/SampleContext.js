import {createContext, useContext, useState} from 'react';

const SampleContext = createContext();

export const SampleProvider = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (
    <SampleContext value={{ counter, setCounter }}>
      {children}
    </SampleContext>
  );
};

export const useSampleContext = () => {
  const context = useContext(SampleContext);
  if (!context) {
    throw new Error('useSampleContext must be used within a SampleProvider');
  }
  return context;
};

export default SampleContext;
