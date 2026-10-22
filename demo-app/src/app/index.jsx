import {
  StyleSheet,
  ScrollView,
} from 'react-native';
import Screen from '../components/Screen';
import NavButton from '../components/NavButton';

export default function Home() {

  return (
    <Screen goHome={false}>
      <ScrollView contentContainerStyle={styles.scrollContent} style={{ alignSelf: 'stretch' }}>
        {/* Navigation options */}
        {/* <Button style={{ backgroundColor: '#f00' }} title="Go to Details" onPress={() => router.navigate('/details')} />
        <Link style={{ backgroundColor: '#f00' }} href="/details">
          Go to Details
        </Link>
        <Pressable style={{ backgroundColor: 'rgb(6, 56, 68)' }} onPress={() => router.navigate('/details')}>
          <Text>Go to Details</Text>
        </Pressable> */}
        <NavButton href="/details">Details Page</NavButton>
        <NavButton href="/list-demo">List Demo Page</NavButton>
        <NavButton href="/fetch-demo">Fetch Demo Page</NavButton>
        <NavButton href="/context-demo">Context Demo Page</NavButton>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
