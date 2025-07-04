import { View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from "react";
import { dailyChallenges } from "../data/challengeAufgaben";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function TäglicheChallenceScreen() {
    const router = useRouter();

    let [voted, setVoted] = useState(false);
    let [showResult, setShowResult] = useState(false);
    let [question, setQuestion] = useState(getChallenge());

    let handleCompletion = async () => {
        setVoted(true);
        setTimeout(() => {
            setShowResult(true);
        }, 500);
        const today = new Date().toISOString().slice(0, 10);
        await AsyncStorage.setItem(`done_challenge_${today}`, 'true');
    };

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
            {/* Zurück-Button */}
            {/* <View style={styles.backButton}>
                <Button title="Go back" color="#333" onPress={() => router.back()} />
            </View> */}
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
        gap: 15,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    finishedLabel: {
        fontSize: 18,
        marginTop: 7,
        color: '#333',
    },
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
    feedbackText: {
        fontSize: 20,
        color: 'black',
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
