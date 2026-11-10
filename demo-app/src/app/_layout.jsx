import { Stack } from 'expo-router';
import { SampleProvider } from '../context/SampleContext';
import { AuthProvider } from '../context/AuthContext';
export default function Layout() {
  return (
    <AuthProvider>
      <SampleProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, title: 'Home' }}
          />
          <Stack.Screen name="details" options={{ title: 'Details' }} />
          <Stack.Screen name="list-demo" options={{ title: 'List Demo' }} />
          <Stack.Screen name="fetch-demo" options={{ title: 'Fetch Demo' }} />
          <Stack.Screen name="context-demo" options={{ title: 'Context Demo' }} />
          <Stack.Screen name="context-share" options={{ title: 'Context Share' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
        </Stack>
      </SampleProvider>
    </AuthProvider>
  );
}
