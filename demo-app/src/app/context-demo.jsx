import { StyleSheet, Text, ScrollView } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';
import NavButton from '../components/NavButton';

import {useSampleContext} from '../context/SampleContext';

export default function ContextDemo() {
  const { counter } = useSampleContext();

  return (
    <Screen>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ alignSelf: 'stretch' }}
      >
        <Card style={styles.card}>
          <Text style={styles.title}>Sharing Data via Context</Text>
          <Text style={styles.body}>Counter: {counter}</Text>
        </Card>
        <NavButton href="/context-share">Context Share Page</NavButton>
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
  },
});
