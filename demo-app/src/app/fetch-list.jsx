import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header/Header';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=6',
        );

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        console.log(data);

        setPosts(data);
      } catch (error) {
        console.error('request failed', error);
      }
    }

    loadPosts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <Header />
      <View style={styles.card}>
        <Text style={styles.card.title}>Fetch Remote Data</Text>

        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return <Text>{item.body}</Text>;
          }}
        />
      </View>
      <Pressable
        style={{ backgroundColor: '#f00' }}
        onPress={() => router.back()}
      >
        <Text>Go Home</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgb(178, 248, 253)',
    alignItems: 'stretch',
    paddingHorizontal: 16,
  },

  list: {
    maxHeight: 100,
  },
  title: {
    alignSelf: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgb(220, 245, 247)',
    borderColor: 'rgb(110, 155, 158)',
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: 16,
    padding: 8,
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    body: {
      marginBottom: 8,
    },
  },
});
