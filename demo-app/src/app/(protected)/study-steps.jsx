import { useStudyContext } from '../../context/StudyContext';
import { StyleSheet, Text, FlatList } from 'react-native';
import { useAuth } from '../../context/AuthContext';

import Screen from '../../components/Screen';
import Card from '../../components/Card';
import TextButton from '../../components/TextButton';

export default function ListDemo() {
  const { studySteps } = useStudyContext();
  const { signOut } = useAuth();
  return (
    <Screen goBackText="Back to Home">
      <Card>
        <Text style={styles.title}>List</Text>
        {studySteps.map((item, idx) => <Text key={idx}>{item.label}</Text>)}
        {/* <FlatList
          style={styles.list}
          data={data}
          keyExtractor={(item) => item}
          renderItem={(item) => <Text>{item.item}</Text>}
        /> */}
      </Card>
      <TextButton onPress={() => signOut()}>
        Sign Out
      </TextButton>
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
