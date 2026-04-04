import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ExerciseSelectScreen from './src/screens/ExerciseSelectScreen';
import WorkoutLoggerScreen from './src/screens/WorkoutLoggerScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('user_profile').then((data) => {
      setHasProfile(!!data);
    });
  }, []);

  if (hasProfile === null) return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#121212' },
            headerTintColor: '#fff',
            contentStyle: { backgroundColor: '#121212' },
          }}
          initialRouteName={hasProfile ? 'Home' : 'Onboarding'}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Gym Calorie Tracker' }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
          <Stack.Screen
            name="ExerciseSelect"
            component={ExerciseSelectScreen}
            options={{ title: 'Add Exercise' }}
          />
          <Stack.Screen
            name="WorkoutLogger"
            component={WorkoutLoggerScreen}
            options={{ title: 'Workout Logger' }}
          />
          <Stack.Screen
            name="Summary"
            component={SummaryScreen}
            options={{ title: 'Workout Summary' }}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
            options={{ title: 'Workout History' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
