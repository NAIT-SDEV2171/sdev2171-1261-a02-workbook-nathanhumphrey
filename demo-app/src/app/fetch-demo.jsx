import { useEffect, useState } from 'react';

import { StyleSheet, Text, FlatList } from 'react-native';

import Screen from '../components/Screen';
import Card from '../components/Card';

export default function FetchDemo() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch( 
          'https://jsonplaceholder.typicode.com/posts?_limit=5',
        );

        if (!response.ok) {
          throw new Error(`Fetch posts not ok: ${response.status}`);
        }

        const posts = await response.json();

        setData(posts);
      } catch (error) {
        console.error(`Failed to fetch posts: ${error}`);
      }
    }

    fetchPosts();
  }, []);

  return (
    <Screen goBackText="Back to Home">
      <Card>
        <Text style={styles.title}>Fetched Data</Text>
        {/* {data.map((item, idx) => <Text key={idx}>{item}</Text>)} */}
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.body}</Text>}
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
