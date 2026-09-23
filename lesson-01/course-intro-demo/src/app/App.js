import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const screens = {
  home: 'Home',
  explore: 'Explore',
  planner: 'Planner',
};

const approachCards = [
  {
    name: 'Native',
    strength: 'Strong platform control and performance.',
    tradeoff: 'Separate codebases increase delivery cost.',
  },
  {
    name: 'Hybrid',
    strength: 'Web skills can move quickly across platforms.',
    tradeoff: 'UI and device integration can feel less natural.',
  },
  {
    name: 'Cross-platform',
    strength: 'One shared codebase speeds up delivery.',
    tradeoff: 'Platform-specific work still appears in real projects.',
  },
];

const interestOptions = [
  'UI design',
  'APIs',
  'Navigation',
  'Authentication',
  'Device features',
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [selectedInterests, setSelectedInterests] = useState([
    'UI design',
    'APIs',
  ]);
  const [note, setNote] = useState(
    'I want to learn how mobile screens fit together.',
  );

  const toggleInterest = (value) => {
    setSelectedInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  };

  return (
    <View style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>SDEV2171 demo</Text>
          <Text style={styles.title}>Course Intro Demo</Text>
          <Text style={styles.subtitle}>
            A small Expo app for discussing screens, components, and navigation.
          </Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          {activeScreen === 'home' && <HomeScreen onJump={setActiveScreen} />}
          {activeScreen === 'explore' && <ExploreScreen />}
          {activeScreen === 'planner' && (
            <PlannerScreen
              note={note}
              onChangeNote={setNote}
              selectedInterests={selectedInterests}
              onToggleInterest={toggleInterest}
            />
          )}
        </ScrollView>

        <View style={styles.navBar}>
          {Object.entries(screens).map(([key, label]) => {
            const active = activeScreen === key;
            return (
              <Pressable
                key={key}
                onPress={() => setActiveScreen(key)}
                style={[styles.navButton, active && styles.navButtonActive]}
              >
                <Text
                  style={[styles.navLabel, active && styles.navLabelActive]}
                >
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

function HomeScreen({ onJump }) {
  return (
    <View style={styles.screenStack}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>What can students notice today?</Text>
        <Text style={styles.heroBody}>
          The app has multiple screens, reusable components, and state changes
          that respond to user actions.
        </Text>
      </View>

      <SectionTitle title="Course focus areas" />
      <View style={styles.cardGrid}>
        <FeatureCard
          title="Foundations"
          body="Tools, components, layouts, and navigation."
        />
        <FeatureCard
          title="Data"
          body="State, lists, APIs, and handling loading or errors."
        />
        <FeatureCard
          title="Integration"
          body="Authentication, persistence, and device hardware."
        />
      </View>

      <SectionTitle title="Try next" />
      <Pressable style={styles.ctaButton} onPress={() => onJump('explore')}>
        <Text style={styles.ctaLabel}>Compare mobile approaches</Text>
      </Pressable>
    </View>
  );
}

function ExploreScreen() {
  return (
    <View style={styles.screenStack}>
      <SectionTitle title="Mobile development approaches" />
      {approachCards.map((card) => (
        <View key={card.name} style={styles.approachCard}>
          <Text style={styles.approachName}>{card.name}</Text>
          <Text style={styles.approachLine}>Strength: {card.strength}</Text>
          <Text style={styles.approachLine}>Tradeoff: {card.tradeoff}</Text>
        </View>
      ))}

      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>Where React Native fits</Text>
        <Text style={styles.calloutBody}>
          React Native is a cross-platform approach that still produces native
          UI, while Expo smooths out the project workflow.
        </Text>
      </View>
    </View>
  );
}

function PlannerScreen({
  note,
  onChangeNote,
  selectedInterests,
  onToggleInterest,
}) {
  return (
    <View style={styles.screenStack}>
      <SectionTitle title="Student interest planner" />
      <Text style={styles.helperText}>
        This screen exists to demonstrate input, state changes, and reusable
        badge components.
      </Text>

      <Text style={styles.label}>Topics you are curious about</Text>
      <View style={styles.badgeWrap}>
        {interestOptions.map((option) => {
          const selected = selectedInterests.includes(option);
          return (
            <Pressable
              key={option}
              style={[styles.badge, selected && styles.badgeSelected]}
              onPress={() => onToggleInterest(option)}
            >
              <Text
                style={[
                  styles.badgeLabel,
                  selected && styles.badgeLabelSelected,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Question for lesson 02</Text>
      <TextInput
        value={note}
        onChangeText={onChangeNote}
        placeholder="What do you want to be able to run next class?"
        placeholderTextColor="#7f7468"
        multiline
        style={styles.input}
      />

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Live state summary</Text>
        <Text style={styles.summaryBody}>
          Selected topics: {selectedInterests.join(', ') || 'None yet'}
        </Text>
        <Text style={styles.summaryBody}>
          Current note: {note || 'No note entered yet.'}
        </Text>
      </View>
    </View>
  );
}

function SectionTitle({ title }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

function FeatureCard({ title, body }) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4efe6',
  },
  appShell: {
    flex: 1,
    paddingTop: 42,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dacdbd',
    backgroundColor: '#fffaf4',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#8d5b2b',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1c1a17',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: '#5a5149',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  screenStack: {
    gap: 16,
  },
  heroCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#1f4c5c',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#d9edf2',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2e2923',
  },
  cardGrid: {
    gap: 12,
  },
  featureCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#fffaf4',
    borderWidth: 1,
    borderColor: '#e4d8c8',
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1c1a17',
    marginBottom: 4,
  },
  featureBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5f574f',
  },
  ctaButton: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#d96a28',
    alignSelf: 'flex-start',
  },
  ctaLabel: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  approachCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#fffaf4',
    borderWidth: 1,
    borderColor: '#dfd3c2',
    gap: 6,
  },
  approachName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1c1a17',
  },
  approachLine: {
    fontSize: 14,
    lineHeight: 21,
    color: '#514941',
  },
  callout: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#f7d8a8',
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#4d2a06',
    marginBottom: 6,
  },
  calloutBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5b3811',
  },
  helperText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5f574f',
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2e2923',
  },
  badgeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badge: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#efe5d8',
  },
  badgeSelected: {
    backgroundColor: '#1f4c5c',
  },
  badgeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5d5247',
  },
  badgeLabelSelected: {
    color: '#ffffff',
  },
  input: {
    minHeight: 96,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cfbfad',
    backgroundColor: '#fffaf4',
    textAlignVertical: 'top',
    color: '#1c1a17',
    fontSize: 15,
    lineHeight: 22,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#fffaf4',
    borderWidth: 1,
    borderColor: '#e3d8c8',
    gap: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1c1a17',
  },
  summaryBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5b534b',
  },
  navBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: '#dacdbd',
    backgroundColor: '#fffaf4',
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#efe6da',
  },
  navButtonActive: {
    backgroundColor: '#1f4c5c',
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5d5247',
  },
  navLabelActive: {
    color: '#ffffff',
  },
});
