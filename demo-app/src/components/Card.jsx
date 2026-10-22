import { StyleSheet, View } from 'react-native';

export default function Card({ children }) {
  return (
    <View style={styles.card}>
      {children}
    </View>);
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgb(176, 233, 255)',
    borderColor: 'rgb(0, 129, 180)',
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: 16,
    padding: 8,
  },
});
