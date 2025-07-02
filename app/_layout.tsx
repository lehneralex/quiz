import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // Globale Header-Styles
        headerStyle: {
          backgroundColor: '#fff',
          elevation: Platform.OS === 'android' ? 4 : 0,
          shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
          shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
          shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
          shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
          color: '#333',
        },
        headerTintColor: '#333',
        // Automatischer Zurück-Button
        headerBackVisible: true,
        headerBackTitle: '', // Zeigt den Titel der vorherigen Seite automatisch an
        headerBackTitleVisible: true,
        // Animation und Stil
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      {/* Home Screen */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Daily 4",
          headerShown: false, // Home Screen hat keinen Header
        }} 
      />
      
      {/* Quiz Screen */}
      <Stack.Screen 
        name="quiz" 
        options={{ 
          title: "Quiz",
          headerShown: false, // Verwendet CategoryHeader Komponente
        }} 
      />
      
      {/* Daily Word Screen */}
      <Stack.Screen 
        name="word" 
        options={{ 
          title: "Daily Word",
          headerShown: false, // Verwendet CategoryHeader Komponente
        }} 
      />
      
      {/* Debate Screen */}
      <Stack.Screen 
        name="debate" 
        options={{ 
          title: "Debate",
          headerShown: false, // Verwendet CategoryHeader Komponente
        }} 
      />
      
      {/* Challenge Screen */}
      <Stack.Screen 
        name="challenge" 
        options={{ 
          title: "Challenge",
          headerShown: false, // Verwendet CategoryHeader Komponente
        }} 
      />
      
      {/* Info Screen */}
      <Stack.Screen 
        name="info" 
        options={{ 
          title: "Info",
          headerShown: true, // Standard Header für Info
          presentation: 'modal', // Als Modal anzeigen
        }} 
      />
      
      {/* Progress Screen */}
      <Stack.Screen 
        name="progress" 
        options={{ 
          title: "Progress",
          headerShown: true, // Standard Header für Progress
          presentation: 'modal', // Als Modal anzeigen
        }} 
      />
      
      {/* Dynamische ID Route (falls benötigt) */}
      <Stack.Screen 
        name="[id]" 
        options={({ route }) => ({
          title: `Word Details`,
          headerShown: true,
          // Dynamischer Titel basierend auf der Route
        })} 
      />
    </Stack>
  );
}
