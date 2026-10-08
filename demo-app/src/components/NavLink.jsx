import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const NavLink = ({ children, href }) => {
  return (
    <Link style={styles.navLink} href={href}>
      {children}
    </Link>
  );
};

export default NavLink;

const styles = StyleSheet.create({
  navLink: {
    backgroundColor: 'rgb(28, 88, 128)',
    color: '#fff',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
    fontWeight: 'bold',
    fontSize: 16,
  }
});