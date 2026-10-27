import { useState } from 'react';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useStudyPlan } from '../context/StudyPlanContext';

export default function SessionFormScreen() {
  const router = useRouter();
  const { selectedSteps, saveSession } = useStudyPlan();
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit() {
    const trimmedTitle = title.trim();
    const trimmedGoal = goal.trim();

    if (trimmedTitle.length === 0) {
      setErrorMessage('Session title is required before you can save this plan.');
      return;
    }

    if (selectedSteps.length === 0) {
      setErrorMessage('Choose at least one study step before saving the session.');
      return;
    }

    setErrorMessage('');
    saveSession({
      title: trimmedTitle,
      goal: trimmedGoal,
      selectedStepCount: selectedSteps.length,
    });
    router.push('/plan');
  }

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.eyebrow}>Form route</Text>
        <Text style={styles.title}>Session Draft Form</Text>
        <Text style={styles.body}>
          This screen keeps draft input local while the user types. Only the submitted session details move into shared
          Context.
        </Text>

        <View style={styles.contextCard}>
          <Text style={styles.contextTitle}>Current shared selection</Text>
          <Text style={styles.contextBody}>
            {selectedSteps.length} selected step{selectedSteps.length === 1 ? '' : 's'} will be attached to the saved
            session when the form is submitted.
          </Text>
        </View>

        <View style={styles.fieldCard}>
          <Text style={styles.fieldLabel}>Session title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter a short session title"
            placeholderTextColor="#8a7666"
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Focus goal</Text>
          <TextInput
            value={goal}
            onChangeText={setGoal}
            placeholder="Optional focus note"
            placeholderTextColor="#8a7666"
            style={[styles.input, styles.textArea]}
            multiline
          />
        </View>

        {errorMessage ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorTitle}>Form needs attention</Text>
            <Text style={styles.errorBody}>{errorMessage}</Text>
          </View>
        ) : null}

        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonLabel}>Save session summary</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
            <Text style={styles.secondaryButtonLabel}>Go back</Text>
          </Pressable>
        </View>
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
  fieldCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fffdfb',
    gap: 10,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4d3214',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 14,
    backgroundColor: '#fff8f2',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#2d2620',
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  errorCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d8c2b7',
    borderRadius: 18,
    backgroundColor: '#fff4f1',
    gap: 8,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  errorBody: {
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
  secondaryButton: {
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
