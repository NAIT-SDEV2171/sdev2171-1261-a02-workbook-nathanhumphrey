import { Image, StyleSheet, View } from 'react-native';
import HeaderText from "./HeaderText";

const Header = () => {
  return (
    <View>
      <Image style={styles.appImage} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
      <HeaderText>Application Name</HeaderText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  appImage: {
    height: 80,
    width: 80,
    alignSelf: 'center',
    marginBottom: 16,
  },
});