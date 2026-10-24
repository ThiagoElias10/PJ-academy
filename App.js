import { useState } from 'react';
import {View,StatusBar,StyleSheet,ActivityIndicator,} from 'react-native';
import {SafeAreaProvider,SafeAreaView,} from 'react-native-safe-area-context';
import {useFonts,BarlowCondensed_700Bold,} from '@expo-google-fonts/barlow-condensed';
import { Inter_400Regular,Inter_500Medium,Inter_600SemiBold,} from '@expo-google-fonts/inter';
import { colors } from './src/theme';
import Header from './src/components/Header';
import HomeScreen from './src/screens/HomeScreen';
import WorkoutsScreen from './src/screens/WorkoutsScreen';
import WorkoutSessionScreen from './src/screens/WorkoutSessionScreen';

export default function App() {
  const [tab, setTab] = useState('Início');
  const [sessionPlan, setSessionPlan] = useState(null);

  const [loaded] = useFonts({
    BarlowCondensed_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if (!loaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  if (sessionPlan) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.root}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.bg}
          />
          <WorkoutSessionScreen
            plan={sessionPlan}
            onBack={() => setSessionPlan(null)}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.bg}
        />

        <Header
          tab={tab}
          onChange={setTab}
          right="PAINEL / SP"
        />

        {tab === 'Início' ? (
          <HomeScreen
            onOpenWorkouts={() => setTab('Treinos')}
          />
        ) : (
          <WorkoutsScreen onStartWorkout={setSessionPlan} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
});