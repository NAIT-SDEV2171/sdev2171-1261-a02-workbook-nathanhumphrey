import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useStudyPlan } from '../../context/StudyPlanContext';
import { useAuth } from '../../context/AuthContext';
import { authorizedGet, meRequest } from '../../lib/authApi';

export default function DetailsScreen() {
  const router = useRouter();
  const { authToken, currentUser, signOut } = useAuth();
  const { selectedSteps, toggleStep } = useStudyPlan();
  const [remoteSteps, setRemoteSteps] = useState([]);
  const [profileName, setProfileName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [capturedImageUri, setCapturedImageUri] = useState('');
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraMessage, setCameraMessage] = useState('Checking current camera permission state...');

  async function loadProtectedData() {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const [profileBody, steps] = await Promise.all([
        meRequest(authToken),
        authorizedGet('/study-steps?delay=700', authToken),
      ]);

      setProfileName(profileBody.user.name);
      setRemoteSteps(steps);
    } catch (error) {
      console.error('protected request failed', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function syncCameraPermission() {
    try {
      const permission = await ImagePicker.getCameraPermissionsAsync();
      setCameraPermission(permission);

      if (permission.granted) {
        setCameraMessage('Camera access is already granted. You can open the camera when ready.');
      } else if (permission.status === 'undetermined') {
        setCameraMessage('Camera permission has not been requested yet on this device.');
      } else if (permission.canAskAgain) {
        setCameraMessage('Camera access is not granted yet. You can request access again.');
      } else {
        setCameraMessage('Camera access is denied and the app cannot request it again right now.');
      }

      return permission;
    } catch (error) {
      console.error('camera permission check failed', error);
      setCameraMessage('Camera permission could not be checked cleanly in this environment.');
      return null;
    }
  }

  useEffect(() => {
    loadProtectedData();
    syncCameraPermission();
  }, []);

  async function handleRequestCameraAccess() {
    try {
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

  function renderStep({ item }) {
    const isSelected = selectedSteps.some((entry) => entry.id === item.id);

    return (
      <View style={styles.stepRow}>
        <View style={styles.stepTextColumn}>
          <Text style={styles.stepLabel}>{item.label}</Text>
          <Text style={styles.stepNote}>
            {isSelected ? 'Selected in shared state' : 'Available after protected fetch'}
          </Text>
        </View>
        <Pressable style={isSelected ? styles.removeChip : styles.addChip} onPress={() => toggleStep(item)}>
          <Text style={isSelected ? styles.removeChipLabel : styles.addChipLabel}>
            {isSelected ? 'Remove' : 'Add'}
          </Text>
        </Pressable>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View style={styles.headerContent}>
        <Text style={styles.eyebrow}>Protected route</Text>
        <Text style={styles.title}>Camera Permission Baseline</Text>
        <Text style={styles.body}>
          This screen keeps the protected request baseline and the lesson-24 preview card, then adds the next
          requirement: show what the camera workflow should do when permission is granted, denied, retryable, or
          limited by the environment.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current signed-in user</Text>
          <Text style={styles.summaryValue}>{profileName || currentUser?.name || 'Unknown user'}</Text>
          <Text style={styles.summaryBody}>
            Auth still controls access to this route. Lesson 25 improves the camera UX without changing the protected
            app architecture.
          </Text>
        </View>

        <View style={styles.permissionCard}>
          <Text style={styles.permissionLabel}>Camera permission state</Text>
          <Text style={styles.permissionValue}>{getPermissionLabel()}</Text>
          <Text style={styles.permissionBody}>{getPermissionGuidance()}</Text>
          <Text style={styles.permissionNote}>{cameraMessage}</Text>
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>Latest captured photo</Text>
          {capturedImageUri ? (
            <Image source={{ uri: capturedImageUri }} style={styles.previewImage} />
          ) : (
            <Text style={styles.previewBody}>No photo has been captured on this screen yet.</Text>
          )}
        </View>

        <Text style={styles.listLabel}>Protected study step list</Text>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={styles.footerContent}>
        <View style={styles.buttonRow}>
          {cameraPermission?.granted ? (
            <Pressable style={styles.button} onPress={handleOpenCamera}>
              <Text style={styles.buttonLabel}>Open camera</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.button} onPress={handleRequestCameraAccess}>
              <Text style={styles.buttonLabel}>Request camera access</Text>
            </Pressable>
          )}

          <Pressable
            style={styles.secondaryAction}
            onPress={() => {
              setCapturedImageUri('');
              setCameraMessage('Preview cleared from local screen state.');
            }}
          >
            <Text style={styles.secondaryActionLabel}>Clear preview</Text>
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.secondaryAction} onPress={() => syncCameraPermission()}>
            <Text style={styles.secondaryActionLabel}>Refresh permission state</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.push('/(protected)/session-form')}>
            <Text style={styles.buttonLabel}>Open existing feature flow</Text>
          </Pressable>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.secondaryAction} onPress={() => loadProtectedData()}>
            <Text style={styles.secondaryActionLabel}>Reload protected data</Text>
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={async () => {
              await signOut();
              router.replace('/(public)/login');
            }}
          >
            <Text style={styles.secondaryButtonLabel}>Log out</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.stateCard}>
            <ActivityIndicator size="large" color="#8c5d35" />
            <Text style={styles.stateTitle}>Loading protected route data...</Text>
            <Text style={styles.stateBody}>The protected baseline still needs to work before permission testing begins.</Text>
          </View>
        </View>
      ) : errorMessage ? (
        <View style={styles.container}>
          <View style={styles.errorCard}>
            <Text style={styles.stateTitle}>Protected request failed</Text>
            <Text style={styles.stateBody}>{errorMessage}</Text>
            <Pressable style={styles.button} onPress={() => loadProtectedData()}>
              <Text style={styles.buttonLabel}>Try again</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <FlatList
          data={remoteSteps}
          keyExtractor={(item) => item.id}
          renderItem={renderStep}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View style={styles.emptyStateCard}>
              <Text style={styles.emptyStateTitle}>No study steps were returned.</Text>
              <Text style={styles.emptyStateBody}>The auth request succeeded, but the protected list is empty.</Text>
            </View>
          }
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5efe7',
    padding: 24,
    paddingTop: 42,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContent: {
    gap: 18,
    paddingBottom: 18,
  },
  footerContent: {
    gap: 18,
    paddingTop: 18,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#8c5d35',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    color: '#1f1b18',
  },
  body: {
    fontSize: 15,
    lineHeight: 23,
    color: '#5d554d',
  },
  summaryCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fffdfb',
    gap: 8,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8c5d35',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryValue: {
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 34,
    color: '#1f1b18',
  },
  summaryBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  permissionCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#c7d5e8',
    borderRadius: 18,
    backgroundColor: '#f5f9ff',
    gap: 8,
  },
  permissionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3f5f8c',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  permissionValue: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
    color: '#1f1b18',
  },
  permissionBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#4c5d73',
  },
  permissionNote: {
    fontSize: 13,
    lineHeight: 20,
    color: '#5f6e81',
  },
  previewCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fff8f2',
    gap: 10,
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8c5d35',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  previewBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  previewImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    backgroundColor: '#e7ded5',
  },
  listLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8c5d35',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepTextColumn: {
    flex: 1,
    gap: 4,
  },
  stepLabel: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2d2620',
  },
  stepNote: {
    fontSize: 12,
    lineHeight: 18,
    color: '#8a7666',
  },
  addChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#ece2d1',
  },
  addChipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4d3214',
  },
  removeChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#d9e6d6',
  },
  removeChipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#294d2d',
  },
  separator: {
    height: 10,
  },
  emptyStateCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fffdfb',
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  emptyStateBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#8c5d35',
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fffdfb',
  },
  secondaryAction: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#ece2d1',
  },
  secondaryActionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4d3214',
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#d9e6d6',
  },
  secondaryButtonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#294d2d',
  },
  stateCard: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fffdfb',
    gap: 12,
    alignItems: 'center',
  },
  errorCard: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#d8c2b7',
    borderRadius: 18,
    backgroundColor: '#fff4f1',
    gap: 12,
  },
  stateTitle: {
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    color: '#2d2620',
    textAlign: 'center',
  },
  stateBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
    textAlign: 'center',
  },
});
