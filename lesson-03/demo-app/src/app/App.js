import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.eyebrow}>SDEV2171 lesson 03</Text>
        <Text style={styles.title}>My First Expo App</Text>
        <Text style={styles.subtitle}>
          Edit this file in `src/app/App.js` to confirm that your project is running and reloading
          properly.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What to notice</Text>
          <Text style={styles.cardBody}>
            This blank project keeps the structure simple so you can connect one file change to one visible
            UI result.
          </Text>
        </View>

        <View style={styles.noteBlock}>
          <Text style={styles.noteTitle}>Today&apos;s success check</Text>
          <Text style={styles.noteText}>1. The project was created.</Text>
          <Text style={styles.noteText}>2. The app opened on one path.</Text>
          <Text style={styles.noteText}>3. One saved edit appeared on screen.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5efe7',
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 42,
    justifyContent: 'center',
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
    fontSize: 32,
    fontWeight: '800',
    color: '#1f1b18',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#5d554d',
  },
  card: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#fffaf5',
    borderWidth: 1,
    borderColor: '#dfd3c5',
    gap: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2d2620',
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  noteBlock: {
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#fffaf5',
    borderWidth: 1,
    borderColor: '#dfd3c5',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2d2620',
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#473f38',
  },
});
