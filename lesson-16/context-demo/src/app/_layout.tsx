import { Stack } from 'expo-router';
import { StudyPlanProvider } from '../context/StudyPlanContext';

export default function Layout() {
  return (
    <StudyPlanProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="details" options={{ title: 'Details' }} />
        <Stack.Screen name="plan" options={{ title: 'Shared Plan' }} />
      </Stack>
    </StudyPlanProvider>
  );
}
