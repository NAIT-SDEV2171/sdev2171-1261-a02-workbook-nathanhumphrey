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
          <Text style={styles.eyebrow}>SDEV2171 lesson 15</Text>
          <Text style={styles.title}>State Sharing Problem Home Screen</Text>
          <Text style={styles.intro}>
            This screen keeps the lesson-14 local-backend fetch workflow, but adds one new challenge: one screen can
            build a review plan while another screen only sees a copied version of that plan.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What problem are we inspecting?</Text>
            <Text style={styles.sectionBody}>
              The detail screen owns a local list of selected study steps. The plan screen receives a copied version
              through navigation parameters. When one screen changes its copy, the other screen does not stay in sync.
            </Text>
            <Pressable style={styles.button} onPress={() => router.push('/details')}>
              <Text style={styles.buttonLabel}>Open selection screen</Text>
            </Pressable>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Look for these clues</Text>
            <Text style={styles.sectionBody}>
              1. Add steps on the detail screen. 2. Open the plan copy screen. 3. Remove one item there. 4. Go back
              and notice the detail screen still thinks the original selection is correct.
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
