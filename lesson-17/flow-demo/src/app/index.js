import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.eyebrow}>SDEV2171 lesson 17</Text>
          <Text style={styles.title}>Forms And Shared State Home Screen</Text>
          <Text style={styles.intro}>
            This screen keeps the lesson-16 shared selected-step workflow, then adds one local draft form that submits
            committed session details into shared Context for a second screen to display.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What changes today?</Text>
            <Text style={styles.sectionBody}>
              The details screen still manages the shared selected-step feature, but a form screen now collects local
              draft values, validates them, and saves the submitted result into shared state.
            </Text>
            <Pressable style={styles.button} onPress={() => router.push('/details')}>
              <Text style={styles.buttonLabel}>Open form workflow</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Look for these clues</Text>
            <Text style={styles.sectionBody}>
              1. Select at least one study step. 2. Open the form screen. 3. Try to submit an empty title and observe
              the validation. 4. Submit a valid session and confirm the summary screen shows the saved shared result.
            </Text>
          </View>
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
  },
  container: {
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
  intro: {
    fontSize: 15,
    lineHeight: 23,
    color: '#5d554d',
  },
  section: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fffdfb',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  button: {
    alignSelf: 'flex-start',
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
});
