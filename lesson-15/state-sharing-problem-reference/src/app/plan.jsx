import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

function parseSteps(rawSteps) {
  if (!rawSteps || typeof rawSteps !== 'string') {
    return [];
  }

  try {
    const parsed = JSON.parse(rawSteps);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('failed to parse plan copy', error);
    return [];
  }
}

export default function PlanScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [planSteps, setPlanSteps] = useState(() => parseSteps(params.steps));

  function removeStep(id) {
    setPlanSteps((currentSteps) => currentSteps.filter((step) => step.id !== id));
  }

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>Plan copy route</Text>
        <Text style={styles.title}>Copied Review Plan Screen</Text>
        <Text style={styles.body}>
          This screen starts with a copied version of the selected steps from the previous screen. Changes here only
          affect this local copy.
        </Text>

        <View style={styles.warningCard}>
          <Text style={styles.warningTitle}>Why this matters</Text>
          <Text style={styles.warningBody}>
            Remove one item here, then go back. The details screen still shows its own original selection count. The
            two screens do not share one source of truth yet.
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Local plan copy count</Text>
          <Text style={styles.summaryValue}>{planSteps.length}</Text>
        </View>

        <View style={styles.listCard}>
          <Text style={styles.listLabel}>Current copied plan</Text>
          {planSteps.length === 0 ? (
            <Text style={styles.emptyText}>No steps were copied into this screen yet.</Text>
          ) : (
            planSteps.map((step) => (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepTextColumn}>
                  <Text style={styles.stepLabel}>{step.label}</Text>
                  <Text style={styles.stepNote}>Removing this item only changes this screen.</Text>
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
  warningCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d8c2b7',
    borderRadius: 18,
    backgroundColor: '#fff4f1',
    gap: 8,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  warningBody: {
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
