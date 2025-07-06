import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dailyQuestions } from '../data/debatenFragen';

export default function DebattenScreen() {
    const [voted, setVoted] = useState(false);
    const [question, setQuestion] = useState(getQuestion());
    const router = useRouter();

    // Farben für Buttons und Fortschrittsbalken
    const agreeColor = '#93B3A7';
    const disagreeColor = '#FF8080';

    // Zufällige Prozentzahlen nach dem Vote
    const [proPercentage, setProPercentage] = useState(0);
    const [contraPercentage, setContraPercentage] = useState(0);

    // Funktion, die beim Abstimmen aufgerufen wird
    const handleVote = async () => {
        const today = new Date().toISOString().slice(0, 10);
        await AsyncStorage.setItem(`done_debate_${today}`, 'true');
        setVoted(true);

        // Fiktive Werte generieren -> Math Floor für Rundung der Zahl
        const pro = Math.floor(Math.random() * 60) + 20; // 20–80%
        const contra = 100 - pro;
        setProPercentage(pro);
        setContraPercentage(contra);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {!voted ? (
                    <>
                        <Text style={styles.question}>{question}</Text>
                        <View style={styles.buttons}>
                            <View style={[styles.button, { backgroundColor: agreeColor }]}>
                                <Button title="Agree" color="#333" onPress={() => handleVote()} />
                            </View>
                            <View style={[styles.button, { backgroundColor: disagreeColor }]}>
                                <Button title="Disagree" color="#333" onPress={() => handleVote()} />
                            </View>
                        </View>
                    </>
                ) : (
                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackText}>
                            Thanks for your vote, {'\n'}see you tomorrow! 😎
                        </Text>

                        {/* Überschrift */}
                        <Text style={styles.resultsHeader}>Today's results:</Text>

                        {/* Fortschrittsbalken */}
                        <ProgressBar label="Agree" percent={proPercentage} color={agreeColor} />
                        <ProgressBar label="Disagree" percent={contraPercentage} color={disagreeColor} />
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

// Fortschrittsbalken-Komponente zur Anzeige der Prozente
const ProgressBar = ({ label, percent, color }) => (
    <View style={{ marginVertical: 8, width: '100%' }}>
        <Text style={{ fontWeight: '500', marginBottom: 4 }}>{label}: {percent}%</Text>
        <View style={{ height: 12, backgroundColor: '#eee', borderRadius: 6 }}>
            <View
                style={{
                    width: `${percent}%`,
                    height: '100%',
                    backgroundColor: color,
                    borderRadius: 6,
                }}
            />
        </View>
    </View>
);

// Styles
const styles = StyleSheet.create({
    // Haupt-Container: nimmt gesamten Bildschirm ein, weißer Hintergrund
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Scrollbereich: zentriert Inhalte und Abstand
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 200,
    },
    // Frage-Text: groß, fett, zentriert
    question: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    // Button-Container: ordnet Buttons nebeneinander an
    buttons: {
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
        width: '100%',
    },
    // Einzelner Button-Stil: abgerundet, mit Abstand und zentriertem Inhalt
    button: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Feedback-Box nach dem Vote: Hintergrund, Rahmen, zentrierter Text
    feedbackContainer: {
        marginTop: 50,
        padding: 20,
        backgroundColor: '#cadbbb',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c3e6cb',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    // Feedback-Text: größer, zentriert, leicht fett
    feedbackText: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontWeight: '600',
        marginBottom: 20,
    },
    // Überschrift für Ergebnis-Anzeige: fett, zentriert
    resultsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
});

// Funktion, die Frage zurückgibt, die zum heutigen Datum passt
function getQuestion() {
    let today = new Date();
    for (let debateQuestion of dailyQuestions) {
        let questionYear = debateQuestion.day.getFullYear();
        let questionMonth = debateQuestion.day.getMonth();
        let questionDay = debateQuestion.day.getDate();
        if (
            today.getFullYear() === questionYear &&
            today.getMonth() === questionMonth &&
            today.getDate() === questionDay
        ) {
            return debateQuestion.question;
        }
    }
    return "No question for today.";
}
