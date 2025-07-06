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
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

// Styles für das Header-Layout und den Text, Padding und Schatten
const styles = StyleSheet.create({
  header: {
    paddingTop: 80,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});


