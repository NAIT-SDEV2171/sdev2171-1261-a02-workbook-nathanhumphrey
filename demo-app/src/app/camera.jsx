import { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Screen from '../components/Screen';
import Card from '../components/Card';
import TextButton from '../components/TextButton';

export default function Details() {
  const [errorMessage, setErrorMessage] = useState('');
  const [capturedImageUri, setCapturedImageUri] = useState('');
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraMessage, setCameraMessage] = useState(
    'Checking current camera permission state...',
  );

  // confirm current camera state
  async function syncCameraPermission() {
    try {
      const permission = await ImagePicker.getCameraPermissionsAsync();
      setCameraPermission(permission);

      if (permission.granted) {
        setCameraMessage(
          'Camera access is already granted. You can open the camera when ready.',
        );
      } else if (permission.status === 'undetermined') {
        setCameraMessage(
          'Camera permission has not been requested yet on this device.',
        );
      } else if (permission.canAskAgain) {
        setCameraMessage(
          'Camera access is not granted yet. You can request access again.',
        );
      } else {
        setCameraMessage(
          'Camera access is denied and the app cannot request it again right now.',
        );
      }

      return permission;
    } catch (error) {
      console.error('camera permission check failed', error);
      setCameraMessage(
        'Camera permission could not be checked cleanly in this environment.',
      );
      return null;
    }
  }

  useEffect(() => {
    // check camera permissions
    syncCameraPermission();
  }, []);

  return (
    <Screen goBackText="Back to Home">
      {/* Working with basic components */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={{ alignSelf: 'stretch' }}
      >
        <Card style={styles.card}>
          <Text style={styles.title}>Image Preview</Text>
          <Text style={styles.body}>{cameraMessage}</Text>
        </Card>
        <TextButton onPress={() => setCounter((prev) => prev + 1)}>
          <Text style={{ color: '#fff' }}>Launch Camera</Text>
        </TextButton>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    marginBottom: 8,
  },
});
