import { Stack } from 'expo-router';
import { SampleProvider } from '../context/SampleContext';
export default function Layout() {
  return (
    <SampleProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: 'Home' }}
        />
        <Stack.Screen name="details" options={{ title: 'Details' }} />
        <Stack.Screen name="list-demo" options={{ title: 'List Demo' }} />
        <Stack.Screen name="fetch-demo" options={{ title: 'Fetch Demo' }} />
      </Stack>
    </SampleProvider>
  );
}
