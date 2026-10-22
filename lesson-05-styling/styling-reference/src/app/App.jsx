import { StatusBar } from 'expo-status-bar';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
// Provides safe area insets on devices with notches or rounded corners
import { SafeAreaView } from 'react-native-safe-area-context';

const badgeSource = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
};

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <StatusBar style="dark" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.container}>
            <Text style={styles.eyebrow}>SDEV2171 lesson 05</Text>
            <Text style={styles.title}>Styled Core UI Screen</Text>
            <Text style={styles.intro}>
              This screen uses the lesson-04 structure, but improves readability with stronger spacing,
              text hierarchy, and alignment.
            </Text>

            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryValue}>3</Text>
                <Text style={styles.summaryLabel}>Clear sections</Text>
              </View>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryValue}>1</Text>
                <Text style={styles.summaryLabel}>Stable layout</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.mediaRow}>
                <Image source={badgeSource} style={styles.image} />
                <View style={styles.mediaText}>
                  <Text style={styles.sectionTitle}>Readable structure</Text>
                  <Text style={styles.sectionBody}>
                    Spacing and text hierarchy help the image, heading, and supporting text feel like one clear
                    unit.
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Why styling matters</Text>
              <Text style={styles.sectionBody}>
                Clear spacing and alignment make it easier to decide which content could become a separate
                screen in lesson 06.
              </Text>
              <View style={styles.pillRow}>
                <Text style={styles.pill}>Spacing</Text>
                <Text style={styles.pill}>Hierarchy</Text>
                <Text style={styles.pill}>Alignment</Text>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick reflection</Text>
              <Text style={styles.sectionBody}>
                Type one styling change that made your screen easier to read.
              </Text>
              <TextInput
                defaultValue="I increased section spacing and made the title more distinct."
                multiline
                style={styles.input}
                placeholder="Type a short note here"
                placeholderTextColor="#7d7368"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5efe7',
  },
  scrollContent: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  container: {
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
  intro: {
    fontSize: 15,
    lineHeight: 23,
    color: '#5d554d',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#ece2d1',
    borderWidth: 1,
    borderColor: '#d7c6ae',
    gap: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4d3214',
  },
  summaryLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: '#6b5440',
  },
  section: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#d7cec4',
    borderRadius: 18,
    backgroundColor: '#fffdfb',
    gap: 12,
  },
  mediaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  image: {
    width: 64,
    height: 64,
  },
  mediaText: {
    flex: 1,
    gap: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    color: '#2d2620',
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 21,
    color: '#5d554d',
  },
  pillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#efe4d5',
    fontSize: 14,
    fontWeight: '700',
    color: '#5b4d40',
  },
  input: {
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#d2c4b5',
    borderRadius: 14,
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#2d2620',
    backgroundColor: '#fffdfb',
    textAlignVertical: 'top',
  },
});
