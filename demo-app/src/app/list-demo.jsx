import { useState } from 'react';

import { useRouter } from 'expo-router';
import { StyleSheet, Text, Pressable, FlatList } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';

export default function ListDemo() {
  const router = useRouter();
  const [data, setData] = useState(['One', 'Two', 'Three']);

  return (
    <Screen goBackText="Back to Home">
      <Card>
        <Text style={styles.title}>List</Text>
        {/* {data.map((item, idx) => <Text key={idx}>{item}</Text>)} */}
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item}
          renderItem={(item) => <Text>{item.item}</Text>}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    maxHeight: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
