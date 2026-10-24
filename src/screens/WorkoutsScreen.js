import { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { get } from '../api';
import HeroCard from '../components/HeroCard';
import Footer from '../components/Footer';

export default function WorkoutsScreen({ onStartWorkout }) {
  const [plans, setPlans] = useState(null);
  const [selected, setSelected] = useState('A');
  const [error, setError] = useState(null);

  useEffect(() => {
    get('/plans')
      .then(setPlans)
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <Text style={styles.error}>
        Não foi possível carregar: {error}
      </Text>
    );
  }

  if (!plans) {
    return (
      <ActivityIndicator
        color={colors.accent}
        style={styles.loader}
      />
    );
  }

  const plan = plans.find((item) => item.id === selected);

  if (!plan) {
    return (
      <Text style={styles.error}>
        Plano de treino não encontrado.
      </Text>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>Seus treinos</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>● PLANO DE OUTUBRO</Text>
        </View>
      </View>

      <HeroCard
        image={plan.image}
        tag={plan.tag}
        title={plan.title}
        meta={`${plan.duration}   ${plan.exerciseCount} exercícios   ${plan.level}`}
        height={300}
      />

      <Text style={styles.planLabel}>SEU PLANO, SEU RITMO</Text>

      <View style={styles.chips}>
        {plans.map((item) => {
          const active = item.id === selected;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => setSelected(item.id)}
              style={[
                styles.chip,
                active && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  active && styles.chipTextActive,
                ]}
                numberOfLines={1}
              >
                {item.chip}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.warmup}>
        <Ionicons
          name="flame-outline"
          size={14}
          color={colors.accent}
        />

        <View style={styles.warmupContent}>
          <Text style={styles.warmupTitle}>
            Antes de começar · 5 min
          </Text>
          <Text style={styles.smallText}>{plan.warmup}</Text>
        </View>
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>
          Seu treino, na ordem
        </Text>

        <Text style={styles.smallText}>
          {plan.exercises.length} — {plan.exerciseCount}
        </Text>
      </View>

      {plan.exercises.map((exercise, index) => (
        <View key={exercise.id} style={styles.exercise}>
          <View>
            <Image
              source={{ uri: exercise.image }}
              style={styles.exerciseImage}
            />

            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>
                {String(index + 1).padStart(2, '0')}
              </Text>
            </View>
          </View>

          <View style={styles.exerciseContent}>
            <Text style={styles.exerciseGroup}>
              {exercise.group}
            </Text>

            <Text style={styles.exerciseName}>
              {exercise.name}
            </Text>

            <View style={styles.stats}>
              <Stat label="SÉRIES" value={exercise.sets} />
              <Stat label="REPETIÇÕES" value={exercise.reps} />
              <Stat label="PAUSA" value={exercise.rest} />
            </View>

            <Text style={styles.exerciseNote}>
              {exercise.note}
            </Text>
          </View>
        </View>
      ))}

      <View style={styles.tip}>
        <Ionicons
          name="water-outline"
          size={13}
          color={colors.accent}
        />

        <Text style={styles.tipText}>
          <Text style={styles.tipHighlight}>Descanse. </Text>
          Você faz por merecer, hidrate-se.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          if (typeof onStartWorkout === 'function') {
            onStartWorkout(plan);
          }
        }}
      >
        <Text style={styles.startButtonText}>
          Começar treino {plan.id}
        </Text>

        <Ionicons
          name="play-outline"
          size={16}
          color={colors.onAccent}
        />
      </TouchableOpacity>

      <Footer />
    </ScrollView>
  );
}

function Stat({ label, value }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
  },
  loader: {
    marginTop: 40,
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
    fontSize: 28,
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
  smallText: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
  },
  planLabel: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
    marginTop: 14,
    marginBottom: 6,
  },
  chips: {
    flexDirection: 'row',
    gap: 6,
  },
  chip: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    fontFamily: fonts.semibold,
    fontSize: 9,
    color: colors.muted,
  },
  chipTextActive: {
    color: colors.onAccent,
  },
  warmup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  warmupContent: {
    flex: 1,
  },
  warmupTitle: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.text,
    marginBottom: 2,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 6,
  },
  sectionTitle: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.text,
  },
  exercise: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  exerciseImage: {
    width: 62,
    height: 62,
    borderRadius: 6,
    backgroundColor: colors.surface,
  },
  exerciseNumber: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: colors.accent,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  exerciseNumberText: {
    fontFamily: fonts.semibold,
    fontSize: 8,
    color: colors.onAccent,
  },
  exerciseContent: {
    flex: 1,
  },
  exerciseGroup: {
    fontFamily: fonts.regular,
    fontSize: 8,
    color: colors.muted,
  },
  exerciseName: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.text,
    marginVertical: 2,
  },
  stats: {
    flexDirection: 'row',
    marginTop: 4,
  },
  stat: {
    marginRight: 18,
  },
  statValue: {
    fontFamily: fonts.title,
    fontSize: 16,
    color: colors.accent,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 6,
    color: colors.muted,
  },
  exerciseNote: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
    marginTop: 6,
  },
  tip: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  tipText: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.muted,
  },
  tipHighlight: {
    color: colors.text,
  },
  startButton: {
    marginTop: 12,
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.onAccent,
  },
});