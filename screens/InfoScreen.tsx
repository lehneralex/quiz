import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function InfoScreen() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Info</Text>

            <Text style={styles.sectionTitle}>Was ist das?</Text>
            <Text style={styles.text}>
                Deine tägliche Portion Inspiration, Wissen & Herausforderung.
                Löse jeden Tag vier kleine Aufgaben um dein Allgemeinwissen aufzufrischen und dich jeden Tag neu herauszufordern.
            </Text>

            <Text style={styles.sectionTitle}>Die einzelnen Aufgaben:</Text>
            <Text style={styles.text}>Quiz: Frische dein Allgemeinwissen auf</Text>
            <Text style={styles.text}>Wort: Erweitere jeden Tag deinen Wortschatz</Text>
            <Text style={styles.text}>Debatte: Teile deine Meinung zu einem aktuellen Thema</Text>
            <Text style={styles.text}>Challenge: Zaubere deinen Mitmenschen ein Lächeln ins Gesicht</Text>

            <Text style={styles.sectionTitle}>Jeden Tag neu!</Text>
            <Text style={styles.text}>
                Erledige täglich alle vier Aufgaben und verfolge deinen Fortschritt in der Fortschrittsanzeige.
            </Text>

            <View style={styles.backButton}>
                <Button title="Zurück zur Übersicht" onPress={() => router.back()} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 6,
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 4,
    },
    backButton: {
        marginTop: 40,
        alignItems: 'center',
    },
});
