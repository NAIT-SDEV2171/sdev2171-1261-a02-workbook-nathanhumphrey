import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { StudyPlanProvider } from '../context/StudyPlanContext';

export default function Layout() {
  return (
    <AuthProvider>
      <StudyPlanProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(public)" options={{ headerShown: false }} />
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack>
      </StudyPlanProvider>
    </AuthProvider>
  );
}
