import { Pressable, StyleSheet, Text } from 'react-native';

const TextButton = ({ children, onPress }) => {
  return (
    <Pressable style={({ pressed }) => [
        styles.primaryButton,
        pressed && styles.buttonPressed
      ]
      } onPress={onPress}>
      <Text style={styles.primaryButtonText}>{children}</Text>
    </Pressable>
  );
};

export default TextButton;

const styles = StyleSheet.create({
  primaryButton: {
    alignSelf: 'stretch',
    backgroundColor: 'rgb(28, 88, 128)',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
});