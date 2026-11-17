import { Redirect } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function IndexScreen() {
  const { isAuthenticated, isRestoring } = useAuth();

  if (isRestoring) {
    return null;
  }

  if (isAuthenticated) {
    return <Redirect href="/(protected)/details" />;
  }

  return <Redirect href="/(public)/welcome" />;
}
