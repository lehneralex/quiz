import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CategoryHeaderProps = {
  title: string;
  color: string;
};

export default function CategoryHeader({ title, color }: CategoryHeaderProps) {
  return (
    <View style={[styles.header, { backgroundColor: color }]}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 80,       // noch mehr Platz oben
    paddingBottom: 30,    // noch mehr Platz unten
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


