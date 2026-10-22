import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
// local image source
import badgeSource from './me-min.jpg';
// remote image source
// const badgeSource = {
//   uri: 'https://reactnative.dev/img/tiny_logo.png',
// };

export default function App() {
  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.eyebrow}>SDEV2171 lesson 04</Text>
          <Text style={styles.title}>Core Components Screen</Text>
          <Text style={styles.intro}>
            This screen keeps the structure simple so you can focus on core components before lesson 05
            styling work.
          </Text>

          <View style={styles.section}>
            <Image source={badgeSource} style={styles.image} />
            <Text style={styles.sectionTitle}>Image section</Text>
            <Text style={styles.sectionBody}>
              `View` groups this section, `Text` labels it, and `Image` adds one visible media block.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Why `ScrollView` is here</Text>
            <Text style={styles.sectionBody}>
              This screen is simple, but `ScrollView` gives a safe structure when the content becomes taller
              than one screen.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick reflection</Text>
            <Text style={styles.sectionBody}>
              Type one component you added or one UI issue you had to fix during class.
            </Text>
            <TextInput
              defaultValue="I added TextInput after my main content card."
              multiline
              style={styles.input}
              placeholder="Type a short note here"
              placeholderTextColor="#7d7368"
            />
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
    color: '#1f1b18',
  },
  intro: {
    fontSize: 15,
    lineHeight: 23,
    color: '#5d554d',
  },
  section: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#d7cec4',
    backgroundColor: '#fffdfb',
    gap: 10,
  },
  image: {
    width: 64,
    height: 64,
    alignSelf: 'flex-start',
    borderRadius: 50,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2d2620',
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#d2c4b5',
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#2d2620',
    backgroundColor: '#fffdfb',
    textAlignVertical: 'top',
  },
});
