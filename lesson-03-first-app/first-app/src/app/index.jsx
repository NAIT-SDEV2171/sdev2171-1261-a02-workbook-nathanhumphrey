import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Link, useRouter } from 'expo-router';
import NavLink from "../components/NavLink";
import Header from "../components/header/Header";

export default function Home() {

  // const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Reusable component */}
        <Header />
        <View style={styles.card}>
          <Text style={styles.card.title}>Card Title</Text>
          <Text style={styles.card.body}>Card body text</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.card.title}>Card Title</Text>
          <Text style={styles.card.body}>Card body text</Text>
          <TextInput
            defaultValue="A new text input component."
            multiline
            style={styles.textInput}
            placeholder="Type whatever you like here"
            placeholderTextColor="grey"></TextInput>
        </View>
        {/* <Button style={{ backgroundColor: '#f00' }} title="Go to Details" onPress={() => router.navigate('/details')} />
        <Link style={{ backgroundColor: '#f00' }} href="/details">
          Go to Details
        </Link>
        <Pressable style={{ backgroundColor: 'rgb(6, 56, 68)' }} onPress={() => router.navigate('/details')}>
          <Text>Go to Details</Text>
        </Pressable> */}
        <NavLink href="/details">Details Page</NavLink>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgb(178, 248, 253)',
    alignItems: 'stretch',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    }
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
  }
});
