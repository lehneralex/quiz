// Importiert React und grundlegende React Native Komponenten für Layout und Styling
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Typdefinition der Props: Titeltext und Hintergrundfarbe
type CategoryHeaderProps = {
  title: string;
  color: string;
};

// Komponente für die Überschrift einer Kategorie mit dynamischer Hintergrundfarbe
export default function CategoryHeader({ title, color }: CategoryHeaderProps) {
  return (
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerText}>{title}</Text> {/* Anzeige des Titels */}
      </View>
  );
}

// Styles für das Header-Layout und den Text, inklusive Padding und Schatten
const styles = StyleSheet.create({
  header: {
    paddingTop: 80,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',         // Zentriert Inhalt horizontal
    justifyContent: 'center',     // Zentriert Inhalt vertikal
    shadowColor: '#000',          // Schattenfarbe
    shadowOffset: { width: 0, height: 2 }, // Schattenversatz
    shadowOpacity: 0.1,           // Schatten-Transparenz
    shadowRadius: 4,              // Schattenradius
    elevation: 3,                 // Schatten
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.5,           // Abstand zwischen Buchstaben
  },
});
