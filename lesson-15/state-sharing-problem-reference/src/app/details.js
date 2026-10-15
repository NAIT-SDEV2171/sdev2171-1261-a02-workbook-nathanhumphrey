import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { getApiBaseUrl } from '../lib/apiBaseUrl';

export default function DetailsScreen() {
  const router = useRouter();
  const [remoteSteps, setRemoteSteps] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadRemoteSteps() {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = `${getApiBaseUrl()}/study-steps?delay=900`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error ?? `Response status: ${response.status}`);
      }

      const data = await response.json();
      console.log('local study step sample', data[0]);
      setRemoteSteps(data);
    } catch (error) {
      console.error('request failed', error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadRemoteSteps();
  }, []);

  function toggleStep(step) {
    setSelectedSteps((currentSteps) => {
      const alreadySelected = currentSteps.some((entry) => entry.id === step.id);

      if (alreadySelected) {
        return currentSteps.filter((entry) => entry.id !== step.id);
      }

      return [...currentSteps, step];
    });
  }

  function renderStep({ item }) {
    const isSelected = selectedSteps.some((entry) => entry.id === item.id);

    return (
      <View style={styles.stepRow}>
        <View style={styles.stepTextColumn}>
          <Text style={styles.stepLabel}>{item.label}</Text>
          <Text style={styles.stepNote}>
            {isSelected ? 'Selected on this screen only' : 'Not selected yet'}
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

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>Selection route</Text>
        <Text style={styles.title}>Local Selection Screen</Text>
        <Text style={styles.body}>
          This screen fetches study-step data and lets the user build a review list with local state. That list only
          lives here for now.
        </Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Current local selection count</Text>
          <Text style={styles.summaryValue}>{selectedSteps.length}</Text>
          <Text style={styles.summaryBody}>
            The plan screen will receive a copied snapshot of this selection through navigation parameters.
          </Text>
        </View>

        {isLoading ? (
          <View style={styles.stateCard}>
            <ActivityIndicator size="large" color="#8c5d35" />
            <Text style={styles.stateTitle}>Loading study steps...</Text>
            <Text style={styles.stateBody}>The local backend response is delayed slightly so the fetch remains visible.</Text>
          </View>
        ) : errorMessage ? (
          <View style={styles.errorCard}>
            <Text style={styles.stateTitle}>Request failed</Text>
            <Text style={styles.stateBody}>{errorMessage}</Text>
            <Pressable style={styles.button} onPress={() => loadRemoteSteps()}>
              <Text style={styles.buttonLabel}>Try again</Text>
            </Pressable>
          </View>
        ) : remoteSteps.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <Text style={styles.emptyStateTitle}>No study steps were returned.</Text>
            <Text style={styles.emptyStateBody}>The request succeeded, but the data list is empty.</Text>
          </View>
        ) : (
          <View style={styles.listCard}>
            <Text style={styles.listLabel}>Fetched study step list</Text>
            <FlatList
              data={remoteSteps}
              keyExtractor={(item) => item.id}
              renderItem={renderStep}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              style={styles.list}
              contentContainerStyle={styles.listContent}
            />
          </View>
        )}

        <View style={styles.buttonRow}>
          <Pressable
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: '/plan',
                params: {
                  steps: JSON.stringify(selectedSteps),
                },
              })
            }
          >
            <Text style={styles.buttonLabel}>Open plan copy</Text>
          </Pressable>
          <Pressable style={styles.secondaryAction} onPress={() => loadRemoteSteps()}>
            <Text style={styles.secondaryActionLabel}>Reload entries</Text>
          </Pressable>
        </View>

        <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonLabel}>Go back</Text>
        </Pressable>
      </View>
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
    gap: 18,
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
  listCard: {
    flex: 1,
    minHeight: 220,
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fff8f2',
    gap: 10,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 12,
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
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fff8f2',
    gap: 12,
    alignItems: 'center',
  },
  errorCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d3b3a8',
    borderRadius: 18,
    backgroundColor: '#fff4f1',
    gap: 12,
    alignItems: 'flex-start',
  },
  stateTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  stateBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#5d554d',
  },
  emptyStateCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fff8f2',
    gap: 8,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  emptyStateBody: {
    fontSize: 15,
    lineHeight: 22,
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
