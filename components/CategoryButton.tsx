// Importiert notwendige React- und React Native-Komponenten, Icons und Farbthemen
import React from 'react';
import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoryThemes, CategoryType} from "../theme/colors";

// Definiert die Props des Buttons: Kategorie, ob erledigt (done) und Klickfunktion
type Props = {
    category: CategoryType;
    done: boolean;
    onPress: () => void;
};

// Holt die Bildschirmbreite, um Buttonbreite dynamisch zu setzen
const screenWidth = Dimensions.get('window').width;
const buttonMargin = 30;

// Komponente für einen Kategorie-Button, der je nach Status farblich angepasst ist
export default function CategoryButton({ category, done, onPress }: Props) {
    // Farb- und Text-Theme zur jeweiligen Kategorie
    const theme = categoryThemes[category];

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: done ? '#999' : theme.primary }, // Grau wenn done, sonst Primärfarbe
            ]}
            onPress={onPress}
            disabled={done}
        >
            <Text style={styles.text}>{theme.name}</Text> {/* Anzeige des Kategorie-Namens */}

            {/* Zeigt ein Häkchen-Icon wenn done true */}
            {done && (
                <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.icon} />
            )}
        </Pressable>
    );
}

// Styles für Button, Text und Icon mit Schatten, Positionierung, Größe und Farben
const styles = StyleSheet.create({
    button: {
        padding: 28,
        borderRadius: 14,
        width: screenWidth - buttonMargin, // Breite dynamisch je nach Bildschirm
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4, // Schatten für Android
        position: 'relative',
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    icon: {
        position: 'absolute', // Icon oben rechts auf dem Button positionieren
        top: 10,
        right: 10,
    },
});
