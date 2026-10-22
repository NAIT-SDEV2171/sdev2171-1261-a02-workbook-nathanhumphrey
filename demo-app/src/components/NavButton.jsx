import { useRouter } from 'expo-router';
import TextButton from './TextButton';

const NavLink = ({ children, href }) => {
  const router = useRouter();
  return (
    <TextButton onPress={() => router.push(href)}>{children}</TextButton>
  );
};

export default NavLink;