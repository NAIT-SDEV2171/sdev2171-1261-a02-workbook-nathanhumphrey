import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const checks = [
  'Terminal commands run successfully',
  'Expo server starts',
  'App opens on chosen device path',
  'Verification screen is visible',
];

export default function App() {
  const [completedChecks, setCompletedChecks] = useState([checks[0]]);
  const [path, setPath] = useState('Android emulator');

  const toggleCheck = (item) => {
    setCompletedChecks((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]
    );
  };

  const verified = completedChecks.length === checks.length;
  const courseStatus = verified ? 'verified' : 'partial';

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>SDEV2171 verification</Text>
        <Text style={styles.title}>Environment Check App</Text>
        <Text style={styles.subtitle}>
          Use this app to confirm that your Expo workflow runs on at least one testing path before
          lesson 03.
        </Text>

        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Current device path</Text>
          <View style={styles.pathRow}>
            {['Android emulator', 'Physical device'].map((option) => {
              const active = path === option;
              return (
                <Pressable
                  key={option}
                  style={[styles.pathButton, active && styles.pathButtonActive]}
                  onPress={() => setPath(option)}
                >
                  <Text style={[styles.pathButtonText, active && styles.pathButtonTextActive]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <Text style={styles.statusValue}>Technical status: {courseStatus}</Text>
          <Text style={styles.statusHelper}>
            If the app does not open at all, record your course status as `blocked` in the lesson tracker.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Verification checklist</Text>
        <View style={styles.checklist}>
          {checks.map((item) => {
            const active = completedChecks.includes(item);
            return (
              <Pressable
                key={item}
                style={[styles.checkItem, active && styles.checkItemActive]}
                onPress={() => toggleCheck(item)}
              >
                <View style={[styles.marker, active && styles.markerActive]} />
                <Text style={[styles.checkText, active && styles.checkTextActive]}>{item}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.callout}>
          <Text style={styles.calloutTitle}>Lesson 02 expectation</Text>
          <Text style={styles.calloutBody}>
            One working path is enough today. If you are not verified by the end of class, record your
            exact blocker and next action.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f0e9',
  },
  container: {
    padding: 24,
    paddingTop: 42,
    gap: 18,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#8d5b2b',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1f1a17',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5b534a',
  },
  statusCard: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#fffaf4',
    borderWidth: 1,
    borderColor: '#dfd3c2',
    gap: 12,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#514941',
  },
  pathRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  pathButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#efe4d5',
  },
  pathButtonActive: {
    backgroundColor: '#215260',
  },
  pathButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5d5247',
  },
  pathButtonTextActive: {
    color: '#ffffff',
  },
  statusValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f1a17',
  },
  statusHelper: {
    fontSize: 13,
    lineHeight: 19,
    color: '#5b534a',
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2d2822',
  },
  checklist: {
    gap: 12,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#fffaf4',
    borderWidth: 1,
    borderColor: '#dfd3c2',
  },
  checkItemActive: {
    backgroundColor: '#e6f3ef',
    borderColor: '#8ab7aa',
  },
  marker: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#8e8274',
  },
  markerActive: {
    backgroundColor: '#215260',
    borderColor: '#215260',
  },
  checkText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#544b42',
  },
  checkTextActive: {
    color: '#1f3b35',
  },
  callout: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#f8d7a4',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4e2a07',
    marginBottom: 6,
  },
  calloutBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5a3916',
  },
});
