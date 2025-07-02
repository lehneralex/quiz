import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
            const decoded = decodeHtmlEntities(decodeURIComponent(q.question));
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
        setFeedback(choice === item.correct ? '✅ True!' : '❌ False!');

       
        //Fortschritt speichern
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
            <Text style={styles.question}>{item.question}</Text>
            {!feedback ? (
                <>
                    <Button title="True" onPress={() => answer(true)} />
                    <Button title="Wrong" onPress={() => answer(false)} />
                </>
            ) : (
                <Text style={[styles.feedback, feedback.startsWith('✅') ? styles.ok : styles.wrong]}>
                    {feedback}
                </Text>
            )}
            <Button title="Back" onPress={() => router.back()} />
        </View>
    );
}

// ...existing styles...

const styles = StyleSheet.create({
    screen:   { flex:1,alignItems:'center',justifyContent:'center',padding:20 },
    center:   { flex:1,alignItems:'center',justifyContent:'center' },
    question: { fontSize:24, marginBottom:20, textAlign:'center' },
    feedback: { fontSize:20, marginVertical:20 },
    ok:       { color:'green' },
    wrong:    { color:'red' },
});