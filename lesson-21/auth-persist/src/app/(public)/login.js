import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, isWorking } = useAuth();
  const [email, setEmail] = useState('student1@example.com');
  const [password, setPassword] = useState('Password123!');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogin() {
    setErrorMessage('');

    try {
      await signIn({
        email,
        password,
      });
      router.replace('/(protected)/details');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>Public auth route</Text>
        <Text style={styles.title}>Login Screen</Text>
        <Text style={styles.body}>
          This route is still public because the user needs a way to sign in before they can reach the protected
          screens.
        </Text>

        <View style={styles.fieldCard}>
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholder="student1@example.com"
            placeholderTextColor="#8a7666"
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Password</Text>
          <TextInput
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholder="Password123!"
            placeholderTextColor="#8a7666"
            style={styles.input}
          />
        </View>

        {errorMessage ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Login failed</Text>
            <Text style={styles.errorBody}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={handleLogin} disabled={isWorking}>
            <Text style={styles.buttonLabel}>{isWorking ? 'Signing in...' : 'Sign in'}</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => router.push('/(public)/register')}>
            <Text style={styles.secondaryButtonLabel}>Go to register</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5efe7',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 42,
    gap: 18,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#8c5d35',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    color: '#1f1b18',
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: '#5d554d',
  },
  fieldCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fffdfb',
    gap: 10,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4d3214',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 14,
    backgroundColor: '#fff8f2',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#2d2620',
  },
  errorCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d8c2b7',
    borderRadius: 18,
    backgroundColor: '#fff4f1',
    gap: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  errorBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#8c5d35',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fffdfb',
  },
  secondaryButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#ece2d1',
  },
  secondaryButtonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4d3214',
  },
});
