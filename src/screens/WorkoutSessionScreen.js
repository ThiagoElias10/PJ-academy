import { useMemo, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import Footer from '../components/Footer';

export default function WorkoutSessionScreen({ plan, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const exercise = useMemo(() => {
    if (!plan || !Array.isArray(plan.exercises)) return null;
    return plan.exercises[currentIndex] || plan.exercises[0];
  }, [plan, currentIndex]);

  if (!plan || !exercise) {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity style={styles.backRow} onPress={onBack}>
          <Ionicons name="chevron-back" size={16} color={colors.text} />
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.error}>Treino não disponível.</Text>
        <Footer />
      </ScrollView>
    );
  }

  const total = plan.exercises.length;
  const isLast = currentIndex === total - 1;

  const handleNext = () => {
    if (isLast) {
      onBack();
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity style={styles.backRow} onPress={onBack}>
        <Ionicons name="chevron-back" size={16} color={colors.text} />
        <Text style={styles.backText}>Voltar aos treinos</Text>
      </TouchableOpacity>

      <View style={styles.topRow}>
        <Text style={styles.title}>Treino em andamento</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>● PLANO {plan.id}</Text>
        </View>
      </View>

      <View style={styles.headerCard}>
        <View style={styles.headerInfo}>
          <Text style={styles.headerLabel}>EXERCÍCIO</Text>
          <Text style={styles.headerCount}>
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </Text>
        </View>
        <Text style={styles.planName}>{plan.chip}</Text>
        <Text style={styles.planMeta}>{plan.duration}   {plan.level}</Text>
      </View>

      <View style={styles.exerciseCard}>
        <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
        <View style={styles.exerciseOverlay}>
          <View style={styles.exerciseTag}>
            <Text style={styles.exerciseTagText}>{exercise.group}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.exerciseName}>{exercise.name}</Text>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{exercise.sets}</Text>
          <Text style={styles.statLabel}>SÉRIES</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{exercise.reps}</Text>
          <Text style={styles.statLabel}>REPETIÇÕES</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{exercise.rest}</Text>
          <Text style={styles.statLabel}>PAUSA</Text>
        </View>
      </View>

      <View style={styles.noteCard}>
        <View style={styles.noteHeader}>
          <Ionicons name="information-circle-outline" size={14} color={colors.accent} />
          <Text style={styles.noteTitle}>Orientação</Text>
        </View>
        <Text style={styles.noteText}>{exercise.note}</Text>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {isLast ? 'Finalizar treino' : 'Próximo exercício'}
        </Text>
        <Ionicons
          name={isLast ? 'checkmark-outline' : 'arrow-forward-outline'}
          size={16}
          color={colors.onAccent}
        />
      </TouchableOpacity>

      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  backText: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: colors.text,
  },
  error: {
    color: colors.text,
    padding: 20,
    fontFamily: fonts.regular,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 26,
    color: colors.text,
  },
  badge: {
    backgroundColor: colors.surface2,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: fonts.semibold,
    fontSize: 7,
    color: colors.accent,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  headerLabel: {
    fontFamily: fonts.regular,
    fontSize: 8,
    color: colors.muted,
    letterSpacing: 0.8,
  },
  headerCount: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    color: colors.accent,
  },
  planName: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.text,
  },
  planMeta: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
    marginTop: 2,
  },
  exerciseCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    height: 220,
    marginBottom: 14,
  },
  exerciseImage: {
    width: '100%',
    height: '100%',
  },
  exerciseOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
  },
  exerciseTag: {
    alignSelf: 'flex-start',
    margin: 10,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  exerciseTagText: {
    fontFamily: fonts.semibold,
    fontSize: 7,
    color: colors.text,
  },
  exerciseName: {
    fontFamily: fonts.title,
    fontSize: 24,
    color: colors.text,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: fonts.title,
    fontSize: 20,
    color: colors.accent,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 7,
    color: colors.muted,
    marginTop: 2,
  },
  noteCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  noteTitle: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.text,
  },
  noteText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.muted,
  },
  nextButton: {
    marginTop: 16,
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.onAccent,
  },
});
