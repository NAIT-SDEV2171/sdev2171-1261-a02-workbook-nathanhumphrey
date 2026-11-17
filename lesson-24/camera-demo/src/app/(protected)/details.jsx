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
  const [cameraMessage, setCameraMessage] = useState('No photo has been captured on this screen yet.');

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

  useEffect(() => {
    loadProtectedData();
  }, []);

  async function handleOpenCamera() {
    setCameraMessage('');

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      setCameraMessage('Camera permission was not granted. Lesson 25 will handle this state more fully.');
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
        <Text style={styles.title}>Camera Capture Baseline</Text>
        <Text style={styles.body}>
          This screen keeps the protected request baseline from the previous module, then adds one narrow native workflow: open the
          camera, capture one photo, and preview that result on the same screen.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current signed-in user</Text>
          <Text style={styles.summaryValue}>{profileName || currentUser?.name || 'Unknown user'}</Text>
          <Text style={styles.summaryBody}>
            Auth still controls access to this route. Lesson 24 adds camera capture without changing the protected app
            architecture.
          </Text>
        </View>

        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>Latest captured photo</Text>
          {capturedImageUri ? (
            <Image source={{ uri: capturedImageUri }} style={styles.previewImage} />
          ) : (
            <Text style={styles.previewBody}>No photo has been captured on this screen yet.</Text>
          )}
          <Text style={styles.previewNote}>{cameraMessage}</Text>
        </View>

        <Text style={styles.listLabel}>Protected study step list</Text>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={styles.footerContent}>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={handleOpenCamera}>
            <Text style={styles.buttonLabel}>Open camera</Text>
          </Pressable>
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
          <Pressable style={styles.button} onPress={() => router.push('/(protected)/session-form')}>
            <Text style={styles.buttonLabel}>Open existing feature flow</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={() => loadProtectedData()}>
            <Text style={styles.secondaryActionLabel}>Reload protected data</Text>
          </Pressable>
        </View>

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
    );
  }

  return (
    <View style={styles.safeArea}>
      {isLoading ? (
        <View style={styles.container}>
          <View style={styles.stateCard}>
            <ActivityIndicator size="large" color="#8c5d35" />
            <Text style={styles.stateTitle}>Loading protected route data...</Text>
            <Text style={styles.stateBody}>The protected baseline still needs to work before camera testing begins.</Text>
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
  previewCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#cbd7c6',
    borderRadius: 18,
    backgroundColor: '#f4fbf1',
    gap: 10,
  },
  previewLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#36573d',
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
    backgroundColor: '#dfe7dc',
  },
  previewNote: {
    fontSize: 13,
    lineHeight: 20,
    color: '#4d5f50',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  button: {
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
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  listLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8c5d35',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    paddingVertical: 6,
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
    backgroundColor: '#efe4d7',
  },
  addChipLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#7b502b',
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
    height: 1,
    backgroundColor: '#ebe1d7',
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
  stateCard: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 24,
    backgroundColor: '#fffdfb',
    gap: 12,
    alignItems: 'center',
  },
  errorCard: {
    padding: 24,
    borderWidth: 1,
    borderColor: '#d8c2b7',
    borderRadius: 24,
    backgroundColor: '#fff4f1',
    gap: 12,
  },
  stateTitle: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    color: '#2d2620',
    textAlign: 'center',
  },
  stateBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
    textAlign: 'center',
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#ece2d1',
  },
  secondaryButtonLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4d3214',
  },
});
