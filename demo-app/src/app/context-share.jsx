import { StyleSheet, Text, ScrollView, Pressable, View } from 'react-native';
import Screen from '../components/Screen';

import {useSampleContext} from '../context/SampleContext';
import TextButton from '../components/TextButton';

export default function ContextShare() {
  const { setCounter } = useSampleContext();

  return (
    <Screen goHomeText="Back to Context Demo">
      <View style={{alignSelf: 'stretch', padding: 8}}>
          <Text style={styles.title}>Update Counter via Context</Text>
          <Text style={styles.body}>Click the button belowand see the changes reflected in the Context Demo page.</Text>
          <TextButton onPress={() => setCounter(prev => prev + 1)}>
            <Text style={{ color: '#fff' }}>Increment Counter</Text>
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
});
