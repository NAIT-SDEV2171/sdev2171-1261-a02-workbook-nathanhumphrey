import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: 'Home' }}
      />
      <Stack.Screen name="details" options={{ title: 'Details' }} />
      <Stack.Screen name="list-demo" options={{ title: 'List Demo' }} />
      <Stack.Screen name="fetch-list" options={{ title: 'Fetch Demo' }} />
    </Stack>
  );
}
