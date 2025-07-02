import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categoryThemes } from '../theme/colors';
import { dailyQuestions } from '../data/debatenFragen';

export default function DebattenScreen() {
    const [voted, setVoted] = useState(false);
    const [proVotes, setProVotes] = useState(0);
    const [contraVotes, setContraVotes] = useState(0);
    const [question, setQuestion] = useState(getQuestion());

    const agreeColor = '#93B3A7'; // Grün
    const disagreeColor = '#FF8080'; // Rot

    const router = useRouter();

    const handleVote = async (choice: 'pro' | 'contra') => {
        if (choice === 'pro') {
            setProVotes(proVotes + 1);
        } else {
            setContraVotes(contraVotes + 1);
        }
        // Fortschritt speichern
        const today = new Date().toISOString().slice(0, 10);
        await AsyncStorage.setItem(`done_debate_${today}`, 'true');
        setVoted(true);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {!voted ? (
                    <>
                        <Text style={styles.question}>{question}</Text>
                        <View style={styles.buttons}>
                            <View style={[styles.button, { backgroundColor: agreeColor }]}>
                                <Button title="Agree" color="#333" onPress={() => handleVote('pro')} />
                            </View>
                            <View style={[styles.button, { backgroundColor: disagreeColor }]}>
                                <Button title="Disagree" color="#333" onPress={() => handleVote('contra')} />
                            </View>
                        </View>
                    </>
                ) : (
                    <View style={styles.feedbackContainer}>
                        <Text style={styles.feedbackText}>
                            Thanks for your vote, {'\n'}see you tomorrow! 😎
                        </Text>
                    </View>
                )}
            </ScrollView>
            {/*<View style={[styles.backButton, { backgroundColor: categoryThemes.debate.secondary }]}>*/}
            {/*    <Button title="Go back" color="#333" onPress={() => router.back()} />*/}
            {/*</View>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'flex-start', // statt 'center'
        alignItems: 'center',
        paddingTop: 200,               // zusätzlich nach oben schieben
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
        gap: 15,
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
        marginTop: 50,
        padding: 20,
        backgroundColor: '#d4edda',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c3e6cb',
        minHeight: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    feedbackText: {
        fontSize: 20,
        color: '#155724',
        textAlign: 'center',
        fontWeight: '600',
    },
    backButton: {
        borderRadius: 10,
        margin: 20,
        paddingVertical: 10,
        alignItems: 'center',
    },
});

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
