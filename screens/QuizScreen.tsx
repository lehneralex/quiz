//Importe der benötigten Bibliothekten und Komponenten
import {View, Text, Button, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Farben der Buttons
const agreeColor = '#93B3A7';
const disagreeColor = '#FF8080';

// Typen für QuizItem und OpenTDBResponse
type QuizItem = { question: string; correct: boolean };
type OpenTDBResponse = {
    response_code: number;
    results: { question: string; correct_answer: 'True' | 'False' }[];
};

// Funktion zum Dekodieren von HTML-Entities
function decodeHtmlEntities(text: string) {
    return text
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, '’')
        .replace(/&amp;/g, '&');
}

// QuizScreen-Komponente
export default function QuizScreen() {
    // Initialisierung der State-Variablen
    const [item, setItem] = useState<QuizItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

    // Funktion zum Abrufen der Frage von der OpenTDB API
    const fetchQuestion = async () => {
        setLoading(true);
        setError(false);
        setItem(null);
        setFeedback(null);
        try {
            const r = await fetch('https://opentdb.com/api.php?amount=1&type=boolean');
            const raw = (await r.json()) as OpenTDBResponse;
            if (raw.response_code !== 0 || raw.results.length === 0) {
                throw new Error();
            }
            const q = raw.results[0];

            const decoded = decodeHtmlEntities(q.question);

            setItem({ question: decoded, correct: q.correct_answer === 'True' });
        } catch {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    // useEffect-Hook zum Abrufen der Frage beim Laden des Screens
    useEffect(() => {
        fetchQuestion();
    }, []);

    // Funktion zum Verarbeitung der Antwort und Speichern des Tages-Fortschritts
    const answer = async (choice: boolean) => {
        if (!item) return;
        setFeedback(choice === item.correct ? '✅ True!' : '❌ False!');

        // Fortschritt speichern
        const today = new Date().toISOString().slice(0, 10);
        await AsyncStorage.setItem(`done_quiz_${today}`, 'true');
    };

    // Ladezustand anzeigen
    if (loading) {
        return <ActivityIndicator style={styles.center} />;
    }
    // Fehlerzustand anzeigen
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 12 }}>Error loading 😕</Text>
                <Button title="Try again" onPress={fetchQuestion} />
            </View>
        );
    }
    // Keine Frage geladen
    if (!item) {
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 12 }}>No question loaded</Text>
                <Button title="Load again" onPress={fetchQuestion} />
            </View>
        );
    }
    // UI mit Frage, Buttons und Feedback
    return (
        <View style={styles.screen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.question}>{item.question}</Text>
            {!feedback ? (
                <View style={styles.buttons}>
                <View style={[styles.button, { backgroundColor: agreeColor }]}>
                    <Button title="True" color="#333" onPress={() => answer(true)} />
                </View>
                <View style={[styles.button, { backgroundColor: disagreeColor }]}>
                    <Button title="Wrong" color="#333" onPress={() => answer(false)} />
                </View>
                </View>

            ) : (
                <View style={styles.feedbackContainer}>
                <Text style={[styles.feedback, feedback.startsWith('✅') ? styles.ok : styles.wrong]}>
                    {feedback}
                </Text>
                </View>
            )}
                </ScrollView>
        </View>
    );
}



//Stylesheet für QuizScreen

const styles = StyleSheet.create({
    // Hauptcontainer für den Screen
    screen:   {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:20 },
    // Zentrierter Container für Inhalte
    center:   {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    // ScrollView-Inhalt
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 200,
    },
    // Frage
    question: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    // Container für die Buttons
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    // Stil für die einzelnen Buttons
    button: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Container für das Feedback
    feedbackContainer: {
        marginTop: 40,
        marginBottom: 60,
        padding: 20,
        backgroundColor: '#c5def2',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#b0d2ed',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    // Stil für das Feedback-Textfeld
    feedback: {
        fontSize:20,
        marginVertical:20
    },
    // Stil für das Feedback bei korrekter Antwort
    ok:       {
        color:'green'
    },
    // Stil für das Feedback bei falscher Antwort
    wrong:    {
        color:'red'
    },
});