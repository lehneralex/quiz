import {View, Text, Button, StyleSheet, Switch, Touchable, TouchableOpacity} from 'react-native';
import {useRouter} from 'expo-router';
import {useState} from "react";
import {dailyChallenges} from "../data/challengeAufgaben";

export default function TäglicheChallenceScreen() {
    const router = useRouter();

    let [voted, setVoted] = useState(false);
    let [showResult, setShowResult] = useState(false);

    let [question, setQuestion] = useState(getChallenge());


    let handleCompletion = () => {
        setVoted(true);
        setTimeout(() => {
            setShowResult(true);
        }, 500)
    };

    return (
        <View style={styles.challengeScreen}>
            <View style={styles.container}>
                <Text style={styles.title}>Deine tägliche Challenge</Text>

                {!showResult ? (
                    <>
                        <Text style={styles.question}>
                            {question}
                        </Text>
                        <View style={styles.buttons}>
                            <Text style={styles.finishedLabel}>Challenge erledigt?</Text>
                            <Switch value={voted} onValueChange={() => handleCompletion()}>
                            </Switch>


                        </View>
                    </>
                ) : (
                    <View>
                        <Text style={styles.result}>Super, du hast es geschafft! 💪</Text>
                    </View>
                )}

            </View>
            <View style={styles.backButton}>
                <Button title="Zurück zur Übersicht" onPress={() => router.back()}/>
            </View>

        </View>
    );
}
let styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', padding: 20, backgroundColor: 'white'
    },
    title: {
        fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 30
    },
    question: {
        fontSize: 30, textAlign: 'center', marginBottom: 20, marginTop: 50
    },
    buttons: {
        gap: 10,
        flexDirection: 'row',
        marginBottom: 20
    },
    result: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 100,
        textAlign: 'center'
    },

    challengeScreen: {
        flex: 1,
        marginBottom: 10
    },
    backButton: {
        backgroundColor: "white"
    },
    finishedLabel: {
        marginTop: 7
    }
});

function getChallenge() {
    let today = new Date();
    let question = "";
    for (let debateQuestion of dailyChallenges) {
        let questionYear = debateQuestion.day.getFullYear();
        let questionMonth = debateQuestion.day.getMonth();
        let questionDay = debateQuestion.day.getDate();
        if (today.getFullYear() === questionYear && today.getMonth() === questionMonth && today.getDate() === questionDay) {
            question = debateQuestion.question;
        }
    }
    return question;
}
