import { useEffect, useState } from 'react';
import {ScrollView,View,Text,Image,TouchableOpacity,ActivityIndicator,StyleSheet,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts } from '../theme';
import { get } from '../api';
import HeroCard from '../components/HeroCard';
import Footer from '../components/Footer';

function greeting() {
  const hour = new Date().getHours();

  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';

  return 'Boa noite';
}

export default function HomeScreen({ onOpenWorkouts }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      get('/user'),
      get('/home'),
      get('/weekWorkouts'),
      get('/monthWorkouts'),
      get('/monthProgress'),
    ])
      .then(([user, home, week, month, progress]) => {
        setData({ user, home, week, month, progress });
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return <Text style={styles.error}>Não foi possível carregar: {error}</Text>;
  }

  if (!data) {
    return <ActivityIndicator color={colors.accent} style={styles.loader} />;
  }

  const { user, home, week, month, progress } = data;
  const percentage = progress.total > 0
    ? (progress.done / progress.total) * 100
    : 0;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.hello}>
        {greeting()}, {user.name}!
      </Text>

      <View style={styles.headRow}>
        <Text style={styles.headline}>{home.headline}</Text>
        <Ionicons name="flash-outline" size={16} color={colors.accent} />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.historyButton}>
          <Text style={styles.historyButtonText}>Histórico</Text>
          <Ionicons name="time-outline" size={14} color={colors.muted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.workoutsButton}
          onPress={onOpenWorkouts}
        >
          <Text style={styles.workoutsButtonText}>Treinos</Text>
          <Ionicons
            name="arrow-up-outline"
            size={14}
            color={colors.onAccent}
            style={styles.rotatedArrow}
          />
        </TouchableOpacity>
      </View>

      <HeroCard
        image={home.heroImage}
        tag={home.heroTag}
        title={home.heroTitle}
        text={home.heroText}
        height={320}
      />

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Treinos da semana</Text>
        <Text style={styles.smallText}>ESTA SEMANA</Text>
      </View>

      <View style={styles.weekRow}>
        {week.map((workout) => (
          <View key={workout.id} style={styles.weekItem}>
            <Image
              source={{ uri: workout.image }}
              style={[
                styles.weekImage,
                workout.done && styles.weekImageDone,
              ]}
            />
            <Text style={styles.weekDay}>{workout.day}</Text>
            <Text style={styles.weekName}>{workout.name}</Text>
            <Text style={styles.smallText}>{workout.duration}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Treinos do mês</Text>
        <Text style={styles.smallText}>OUTUBRO / 2026</Text>
      </View>

      <Text style={styles.subtitle}>
        Sua base para o ritmo. Força, fôlego e equilíbrio em um plano feito para você.
      </Text>

      <View style={styles.grid}>
        {month.map((workout) => (
          <View key={workout.id} style={styles.workoutCard}>
            <Image
              source={{ uri: workout.image }}
              style={styles.cardImage}
            />

            <View style={styles.cardTag}>
              <Text style={styles.cardTagText}>{workout.tag}</Text>
            </View>

            <View style={styles.cardArrow}>
              <Ionicons
                name="arrow-up-outline"
                size={12}
                color={colors.onAccent}
                style={styles.rotatedArrow}
              />
            </View>

            <Text style={styles.cardTitle}>{workout.title}</Text>
            <Text style={styles.smallText}>{workout.subtitle}</Text>
            <Text style={styles.cardDuration}>{workout.duration}</Text>
          </View>
        ))}
      </View>

      <View style={styles.progress}>
        <Text style={styles.progressNumber}>
          {String(progress.done).padStart(2, '0')}
        </Text>

        <View style={styles.progressContent}>
          <View style={styles.progressTop}>
            <Text style={styles.progressLabel}>{progress.label}</Text>
            <Text style={styles.smallText}>
              {progress.done} de {progress.total}
            </Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(100, Math.max(0, percentage))}%` },
              ]}
            />
          </View>

          <Text style={styles.smallText}>{progress.text}</Text>
        </View>
      </View>

      <Footer />
    </ScrollView>
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
  hello: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.muted,
  },
  headRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  headline: {
    fontFamily: fonts.title,
    fontSize: 26,
    color: colors.text,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 14,
  },
  historyButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
  },
  historyButtonText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.text,
  },
  workoutsButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 8,
    padding: 12,
  },
  workoutsButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.onAccent,
  },
  rotatedArrow: {
    transform: [{ rotate: '45deg' }],
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.text,
  },
  smallText: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.muted,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.muted,
    marginBottom: 12,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  weekImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 6,
  },
  weekImageDone: {
    borderColor: colors.accent,
  },
  weekDay: {
    fontFamily: fonts.medium,
    fontSize: 7,
    color: colors.accent,
    letterSpacing: 0.5,
  },
  weekName: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  workoutCard: {
    width: '48.5%',
    marginBottom: 6,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  cardTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardTagText: {
    fontFamily: fonts.semibold,
    fontSize: 7,
    color: colors.text,
  },
  cardArrow: {
    position: 'absolute',
    right: 8,
    top: 96,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.text,
  },
  cardDuration: {
    fontFamily: fonts.regular,
    fontSize: 9,
    color: colors.accent,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: 14,
  },
  progressNumber: {
    fontFamily: fonts.title,
    fontSize: 38,
    color: colors.accent,
  },
  progressContent: {
    flex: 1,
  },
  progressTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.text,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginVertical: 6,
  },
  progressFill: {
    height: 3,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
});