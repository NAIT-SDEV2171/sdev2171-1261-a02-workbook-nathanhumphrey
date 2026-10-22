import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/header/Header';
import TextButton from './TextButton';

export default function Screen({ useSafeAreaView = true, goBackText = "Go Back", goHome: goBack = true, children }) {
  const router = useRouter();

  const filling = <>
    <StatusBar style="dark" />
    {/* Reusable component */}
    <Header />
    {children}
    {goBack && <TextButton onPress={() => router.back()}>{goBackText}</TextButton>}</>;

  return useSafeAreaView ? (
    <SafeAreaView style={styles.safeArea}>
      {filling}
    </SafeAreaView>
  ) : (
    <View style={styles.safeArea}>
      {filling}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: 'rgb(200, 239, 255)',
    alignItems: 'center',
  },
});
