import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import Screen from '../components/Screen';

import { useAuth } from '../context/AuthContext';
import TextButton from '../components/TextButton';

export default function Login() {
  const router = useRouter();
  const [creds, setCreds] = useState({ email: 'student1@example.com', password: 'Password123!' });

  const { signIn } = useAuth();

  const handleSubmit = async () => {
    // handle login logic here
    try {
      await signIn(creds);
      // redirect to protected page after successful login
      router.replace('/(protected)/study-steps');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Screen>
      <View style={{ alignSelf: 'stretch', padding: 8 }}>
        <Text style={styles.title}>Login (student1@example.com:Password123!)</Text>
        <Text style={styles.body}>Login to access the study steps page.</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={creds.email}
          onChangeText={(text) => setCreds({ ...creds, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={creds.password}
          onChangeText={(text) => setCreds({ ...creds, password: text })}
        />
        <TextButton onPress={handleSubmit}>
          <Text style={{ color: '#fff' }}>Login</Text>
        </TextButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgb(28, 88, 128)',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
});
