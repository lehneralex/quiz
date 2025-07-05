// Importiert StatusBar-Komponente von Expo und grundlegende React Native Komponenten für Layout und Styling
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

// Hauptkomponente der App, die einfache Ansicht mit Text anzeigt
export default function App() {
  return (
      <View style={styles.container}>
        <Text>Hallo!</Text>              {/* Einfacher Text in der Mitte */}
        <StatusBar style="auto" />       {/* Statusleiste passt sich automatisch an */}
      </View>
  );
}

// Styles für den Container der App der den kompletten Bildschirm einnimmt
// , Inhalt zentriert und Hintergrund weiß macht
const styles = StyleSheet.create({
  container: {
    flex: 1,                         // Füllt den gesamten verfügbaren Platz aus
    backgroundColor: '#fff',         // Weißer Hintergrund
    alignItems: 'center',            // Zentriert horizontal
    justifyContent: 'center',        // Zentriert vertikal
  },
});

