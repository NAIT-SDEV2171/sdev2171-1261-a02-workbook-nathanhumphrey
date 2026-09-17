import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TextInput, Image } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

export default function Details() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Image style={styles.appImage} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
          <Text style={styles.title}>Application Name - Details Page</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.card.title}>Card Title</Text>
          <Text style={styles.card.body}>Card body text</Text>
        </View>
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
  appImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 16,
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
