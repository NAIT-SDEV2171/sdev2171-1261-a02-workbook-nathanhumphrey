import { Redirect, Stack } from 'expo-router';
import { StudyProvider } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  // perform auth check and redirect if not authorized
  if (!isAuthenticated) {
    // redirect to login page
    return <Redirect href="/login" />;
  }
  return (
    <StudyProvider>
      <Stack>
        <Stack.Screen
          name="study-steps"
          options={{ headerShown: false, title: 'Study Steps' }}
        />
      </Stack>
    </StudyProvider>
  );
}
