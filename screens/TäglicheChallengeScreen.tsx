// Importe: Komponenten, Navigation, State, Daten & lokale Speicherung
import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { dailyChallenges } from "../data/challengeAufgaben";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Hauptkomponente für das Daily-Challenge-Screen
export default function TäglicheChallenceScreen() {
    const router = useRouter();

    // Status der Challenge
    let [voted, setVoted] = useState(false);
    let [showResult, setShowResult] = useState(false);
    let [question, setQuestion] = useState(getChallenge());

    // Logik beim Abschließen der Challenge
    let handleCompletion = async () => {
        // Setzt den Status "voted" auf true
        setVoted(true);

        // Kurze Verzögerung (500 ms), bevor das Ergebnis angezeigt wird
        setTimeout(() => {
            // Ergebnisanzeige
            setShowResult(true);
        }, 500);

        // Holt das heutige Datum
        const today = new Date().toISOString().slice(0, 10);

        // Speichert in AsyncStorage, dass die Challenge für heute erledigt wurde
        await AsyncStorage.setItem(`done_challenge_${today}`, 'true');
    };


    // UI - ScrollView mit Frage oder Feedback
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {!showResult ? (
                    <>
                        <Text style={styles.question}>{question}</Text>
                        <View style={styles.buttons}>
                            <Text style={styles.finishedLabel}>Challenge done?</Text>
                            <Switch value={voted} onValueChange={handleCompletion} />
                        </View>
                    </>
                ) : (
                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackText}>Great, you made it! 💪</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    // Hauptcontainer: nimmt den gesamten Bildschirm ein, weißer Hintergrund
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Inhalt des ScrollView: zentriert nach oben mit Abstand und Padding
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 200,
    },

    // Stil für die angezeigte Frage: groß, fett, mittig, dunkelgrau
    question: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },

    // Layout der Challenge-Abschluss-Komponente: horizontal zentriert mit Abstand
    buttons: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },

    // Beschriftung „Challenge done?“
    finishedLabel: {
        fontSize: 18,
        marginTop: 7,
        color: '#333',
    },

    // Container für das Feedback nach Abschluss: farbiger Kasten, zentrierter Text
    feedbackContainer: {
        marginTop: 50,
        padding: 20,
        backgroundColor: '#e7cee2',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e7cee2',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Text innerhalb des Feedback-Kastens
    feedbackText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: '600',
    },
});


// Auswahl der heutigen Challenge nach Datum
function getChallenge() {
    let today = new Date();
    for (let challenge of dailyChallenges) {
        let questionYear = challenge.day.getFullYear();
        let questionMonth = challenge.day.getMonth();
        let questionDay = challenge.day.getDate();
        if (
            today.getFullYear() === questionYear &&
            today.getMonth() === questionMonth &&
            today.getDate() === questionDay
        ) {
            return challenge.question;
        }
    }
    return "No challenge for today.";
}
