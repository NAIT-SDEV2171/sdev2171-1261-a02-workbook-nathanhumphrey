import { Redirect, Stack } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { StudyStepsProvider } from '../../context/StudyStepsContext';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(public)/login" />;
  }

  return (
    <StudyStepsProvider>
      <Stack>
        <Stack.Screen name="details" options={{ title: 'Protected Details' }} />
        <Stack.Screen name="session-form" options={{ title: 'Session Form' }} />
        <Stack.Screen name="plan" options={{ title: 'Protected Plan' }} />
      </Stack>
    </StudyStepsProvider>
  );
}
