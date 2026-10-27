import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useStudyPlan } from '../context/StudyPlanContext';

export default function PlanScreen() {
  const router = useRouter();
  const { selectedSteps, removeStep, savedSession, clearSession } = useStudyPlan();

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>Summary route</Text>
        <Text style={styles.title}>Saved Session Summary Screen</Text>
        <Text style={styles.body}>
          This screen reads the same selected-step list as the details screen and also shows the committed form result
          that was submitted from the local draft form screen.
        </Text>

        <View style={styles.contextCard}>
          <Text style={styles.contextTitle}>Why this matters</Text>
          <Text style={styles.contextBody}>
            Draft input was local while typing, but the saved session details now live in shared Context so this screen
            and the selection screen can both refer to the same committed result.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Saved session title</Text>
          <Text style={styles.summaryValue}>{savedSession ? savedSession.title : 'No saved session yet'}</Text>
          <Text style={styles.summaryNote}>
            {savedSession?.goal?.length
              ? savedSession.goal
              : 'No focus goal was saved for this session yet.'}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Saved session step count</Text>
          <Text style={styles.summaryValue}>
            {savedSession ? savedSession.selectedStepCount : 0}
          </Text>
          <Text style={styles.summaryNote}>
            This count was saved when the form was submitted. It is the committed
            snapshot attached to that session result.
          </Text>
        </View>

        <View style={styles.listCard}>
          <Text style={styles.listLabel}>Current shared plan</Text>
          {selectedSteps.length === 0 ? (
            <Text style={styles.emptyText}>No steps are selected in the shared plan yet.</Text>
          ) : (
            selectedSteps.map((step) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepTextColumn}>
                  <Text style={styles.stepLabel}>{step.label}</Text>
                  <Text style={styles.stepNote}>Removing this item updates both screens because they share one provider.</Text>
                </View>
                <Pressable style={styles.removeChip} onPress={() => removeStep(step.id)}>
                  <Text style={styles.removeChipLabel}>Remove</Text>
                </Pressable>
              </View>
            ))
          )}
        </View>

        <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonLabel}>Go back</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={clearSession}>
          <Text style={styles.secondaryButtonLabel}>Clear saved session</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5efe7',
  },
  scrollContent: {
    padding: 24,
    paddingTop: 42,
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
  contextCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#cbd7c6',
    borderRadius: 18,
    backgroundColor: '#f4fbf1',
    gap: 8,
  },
  contextTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  contextBody: {
    fontSize: 14,
    lineHeight: 21,
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
  summaryNote: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  listCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fff8f2',
    gap: 12,
  },
  listLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8c5d35',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  emptyText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
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
