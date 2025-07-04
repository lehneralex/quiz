import {View, Text, Button, ActivityIndicator, StyleSheet, ScrollView} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const agreeColor = '#93B3A7';
const disagreeColor = '#FF8080';

type QuizItem = { question: string; correct: boolean };
type OpenTDBResponse = {
    response_code: number;
    results: { question: string; correct_answer: 'True' | 'False' }[];
};

function decodeHtmlEntities(text: string) {
    return text
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, '’')
        .replace(/&amp;/g, '&');
}

// ...existing imports and types...

export default function QuizScreen() {
    const router = useRouter();
    const [item, setItem] = useState<QuizItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);

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

    useEffect(() => {
        fetchQuestion();
    }, []);

    const answer = async (choice: boolean) => {
        if (!item) return;
        console.log('Answer function called with choice:', choice); // Debugging log
        setFeedback(choice === item.correct ? '✅ True!' : '❌ False!');

        // Save progress
        const today = new Date().toISOString().slice(0, 10);
        await AsyncStorage.setItem(`done_quiz_${today}`, 'true');
    };

    if (loading) {
        return <ActivityIndicator style={styles.center} />;
    }
    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 12 }}>Error loading 😕</Text>
                <Button title="Try again" onPress={fetchQuestion} />
            </View>
        );
    }
    if (!item) {
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 12 }}>No question loaded</Text>
                <Button title="Load again" onPress={fetchQuestion} />
            </View>
        );
    }

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
    screen:   { flex:1,alignItems:'center',justifyContent:'center',padding:20 },
    center:   { flex:1,alignItems:'center',justifyContent:'center' },

    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 200,
    },

    question: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    button: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 12,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    feedback: { fontSize:20, marginVertical:20 },
    ok:       { color:'green' },
    wrong:    { color:'red' },

});