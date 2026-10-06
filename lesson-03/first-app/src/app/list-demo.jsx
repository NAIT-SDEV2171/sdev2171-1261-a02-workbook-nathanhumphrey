import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header/Header';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(['One', 'Two', 'Three']);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header />
        <View style={styles.card}>
          <Text style={styles.card.title}>List</Text>
          {/* {data.map((item, idx) => <Text key={idx}>{item}</Text>)} */}
          <FlatList
            data={data}
            keyExtractor={() => Date.now()}
            renderItem={(item) => <Text>{item.item}</Text>}
          />
        </View>
        <Pressable
          style={{ backgroundColor: '#f00' }}
          onPress={() => router.back()}
        >
          <Text>Go Home</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgb(178, 248, 253)',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 8,
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
  textInput: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: 'rgb(110, 155, 158)',
    borderRadius: 4,
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: '#fffdfb',
    textAlignVertical: 'top',
  },
});
