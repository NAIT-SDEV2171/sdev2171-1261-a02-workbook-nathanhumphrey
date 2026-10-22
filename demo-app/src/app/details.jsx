import { StyleSheet, Text, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';

export default function Details() {
  return (
    <Screen goBackText="Back to Home">
      {/* Working with basic components */}
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ alignSelf: 'stretch' }}>
        <Card style={styles.card}>
          <Text style={styles.title}>Card Title</Text>
          <Text style={styles.body}>Card body text</Text>
        </Card>
      </ScrollView>
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
  }
});
