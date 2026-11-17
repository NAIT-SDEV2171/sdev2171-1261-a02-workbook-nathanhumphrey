import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.eyebrow}>SDEV2171 lesson 24</Text>
          <Text style={styles.title}>Camera Capture Baseline</Text>
          <Text style={styles.intro}>
            This route is public. Anyone can reach it. The protected study-plan workflow still stays behind
            authentication, and this known-good app gives lesson 24 one stable baseline before the first device-camera
            feature is added on the protected screen.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today&apos;s lesson-24 flow</Text>
            <Text style={styles.sectionBody}>
              1. Public welcome screen. 2. Register or log in. 3. Restore the saved auth session. 4. Re-enter the
              protected study-plan routes. 5. Keep that baseline stable. 6. Add one camera capture and preview workflow.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Route groups</Text>
            <Text style={styles.sectionBody}>
              The example uses one public route group for auth screens and one protected route group for the existing
              study-plan feature screens that lesson 24 extends with camera capture.
            </Text>
            <View style={styles.buttonRow}>
              <Pressable style={styles.button} onPress={() => router.push('/(public)/login')}>
                <Text style={styles.buttonLabel}>Open login</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={() => router.push('/(public)/register')}>
                <Text style={styles.secondaryButtonLabel}>Open register</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Seeded login for quick demo</Text>
            <Text style={styles.tipBody}>Email: student1@example.com</Text>
            <Text style={styles.tipBody}>Password: Password123!</Text>
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
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
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
  secondaryButton: {
    alignSelf: 'flex-start',
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
  tipCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#cbd7c6',
    borderRadius: 18,
    backgroundColor: '#f4fbf1',
    gap: 8,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  tipBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
});
