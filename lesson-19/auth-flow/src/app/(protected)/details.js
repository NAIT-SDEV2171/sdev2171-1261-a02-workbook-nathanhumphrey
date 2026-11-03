import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
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
        <Text style={styles.title}>Authenticated Study Steps</Text>
        <Text style={styles.body}>
          This route stays behind login. The screen makes two protected requests: one to confirm the current user and
          one to fetch the same study-step shape the class used in earlier lessons.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current signed-in user</Text>
          <Text style={styles.summaryValue}>{profileName || currentUser?.name || 'Unknown user'}</Text>
          <Text style={styles.summaryBody}>
            The token from login is attached to `GET /auth/me` so the backend can identify the user.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current auth-driven selection count</Text>
          <Text style={styles.summaryValue}>{selectedSteps.length}</Text>
          <Text style={styles.summaryBody}>
            Authentication changes route access. Shared Context still owns the selected-step feature once the user is
            inside the protected area.
          </Text>
        </View>

        <Text style={styles.listLabel}>Protected study step list</Text>
      </View>
    );
  }

  function renderFooter() {
    return (
      <View style={styles.footerContent}>
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
          onPress={() => {
            signOut();
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
            <Text style={styles.stateBody}>Both `/auth/me` and `/study-steps` depend on the bearer token.</Text>
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
    paddingVertical: 6,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  stepTextColumn: {
    flex: 1,
    gap: 4,
  },
  stepLabel: {
    flex: 1,
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
  stateCard: {
    padding: 22,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 20,
    backgroundColor: '#fffdfb',
    gap: 10,
    alignItems: 'center',
  },
  errorCard: {
    padding: 22,
    borderWidth: 1,
    borderColor: '#d8c2b7',
    borderRadius: 20,
    backgroundColor: '#fff4f1',
    gap: 10,
    alignItems: 'flex-start',
  },
  stateTitle: {
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    color: '#2d2620',
  },
  stateBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
    textAlign: 'center',
  },
  emptyStateCard: {
    marginTop: 12,
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
