import { useEffect, useState } from 'react';
// import Alert and Linking for opening the device settings if the user has denied
// camera access and cannot be prompted again.
import { Alert, Image, Linking, StyleSheet, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Screen from '../components/Screen';
import Card from '../components/Card';
import TextButton from '../components/TextButton';

export default function Details() {
  const [capturedImageUri, setCapturedImageUri] = useState('');
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraMessage, setCameraMessage] = useState(
    'Checking current camera permission state...',
  );
  const [showSettings, setShowSettings] = useState(false);

  // confirm current camera state
  async function syncCameraPermission() {
    // reset the settings button state, in case the user has changed their mind
    setShowSettings(false);
    try {
      // getCameraPermissionsAsync() is a read-only check of the current permission state.
      // It does not prompt the user for permission.
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
        setShowSettings(true);
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

  // camera permission request handler
  async function handleRequestCameraAccess() {
    try {
      // requestCameraPermissionsAsync() prompts the user for permission to use the camera.
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      setCameraPermission(permission);

      if (permission.granted) {
        setCameraMessage('Camera access granted. You can open the camera now.');
        return;
      }

      if (permission.canAskAgain) {
        setCameraMessage('Camera access was denied. You can try the permission request again.');
        return;
      }

      setCameraMessage('Camera access is denied and the app cannot request it again right now.');
    } catch (error) {
      console.error('camera permission request failed', error);
      setCameraMessage('The permission request could not complete in this environment.');
    }
  }

  async function handleOpenCamera() {
    const permission = cameraPermission ?? (await syncCameraPermission());

    if (!permission?.granted) {
      setCameraMessage('Camera access is not granted yet. Use the permission action first.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (result.canceled) {
      setCameraMessage('Camera opened, but no photo was captured.');
      return;
    }

    setCapturedImageUri(result.assets[0].uri);
    setCameraMessage('Photo captured and preview updated from local screen state.');
  }

  // The permission label is a short summary of the current camera permission state.
  function getPermissionLabel() {
    if (!cameraPermission) {
      return 'Not checked yet';
    }

    if (cameraPermission.granted) {
      return 'Granted';
    }

    if (cameraPermission.status === 'undetermined') {
      return 'Not decided yet';
    }

    if (cameraPermission.canAskAgain) {
      return 'Denied, but retryable';
    }

    return 'Denied and locked';
  }

  // The permission guidance is a longer explanation of the current camera permission state.
  function getPermissionGuidance() {
    if (!cameraPermission) {
      return 'The app is still checking what the current camera permission state looks like on this device.';
    }

    if (cameraPermission.granted) {
      return 'The camera launch path is available. Keep the preview card visible so you can still prove the granted path.';
    }

    if (cameraPermission.status === 'undetermined') {
      return 'This device has not decided yet. Request access when you are ready to test the camera flow.';
    }

    if (cameraPermission.canAskAgain) {
      return 'The user can still retry the permission request. Show that action clearly instead of pretending the camera can already open.';
    }

    return 'The system is no longer offering the permission prompt right now. Explain that state honestly instead of looping the same request.';
  }

  // If the user has denied camera access and cannot be prompted again, we can
  // offer a button to open the device settings so they can manually enable
  // camera access for this app.
  const openSettingsForCamera = () => {
    Alert.alert(
      'Camera Permission Required',
      'Camera access was previously denied. Please enable it in your device Settings to take photos.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ]
    );
  };

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
          {/* Show the captured image or a message if no image is available. */}
          {capturedImageUri ? (
            <>
              <Image source={{ uri: capturedImageUri }} style={styles.previewImage} />
              <TextButton
                onPress={() => {
                  setCapturedImageUri('');
                  setCameraMessage('Preview cleared from local screen state.');
                }}
              >
                <Text style={styles.secondaryActionLabel}>Clear preview</Text>
              </TextButton>
            </>
          ) : (
            <Text style={styles.body}>{cameraMessage}</Text>
          )}
        </Card>
        <Card style={styles.card}>
          <Text style={styles.title}>Permission Status</Text>
          <Text style={styles.body}>{getPermissionLabel()}</Text>
          <Text style={styles.body}>{getPermissionGuidance()}</Text>
        </Card>

        {/* Try to launch the camera, if allowed. Otherwise, request access. */}
        {cameraPermission?.granted ? (
          <TextButton onPress={(handleOpenCamera)}>
            <Text style={{ color: '#fff' }}>Launch Camera</Text>
          </TextButton>
        ) : showSettings ? (
          // If the user has denied camera access and cannot be prompted again, show
          // a button to open the device settings.
          <TextButton onPress={openSettingsForCamera}>
            <Text style={{ color: '#fff' }}>Open Settings</Text>
          </TextButton>
        ) : (
          // If the user has not granted camera access yet, show a button to request access.
          <TextButton onPress={handleRequestCameraAccess}>
            <Text style={{ color: '#fff' }}>Request Camera Access</Text>
          </TextButton>
        )}

        {/* Always show a button to refresh the camera permission state, in case the user 
        has changed their mind or the permission state has changed. */}
        <TextButton onPress={syncCameraPermission}>
          <Text style={{ color: '#fff' }}>Refresh permissions</Text>
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
  previewImage: {
    marginBottom: 16,
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#e7ded5',
  }
});
