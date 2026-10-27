import { Stack } from 'expo-router';
import { StudyPlanProvider } from '../context/StudyPlanContext';

export default function Layout() {
  return (
    <StudyPlanProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="details" options={{ title: 'Details' }} />
        <Stack.Screen name="session-form" options={{ title: 'Session Form' }} />
        <Stack.Screen name="plan" options={{ title: 'Plan Summary' }} />
      </Stack>
    </StudyPlanProvider>
  );
}
