import {View, Text, Button, StyleSheet} from 'react-native';
import {useRouter} from 'expo-router';
import {useState} from "react";
import {dailyQuestions} from "../data/debatenFragen";

export default function DebattenScreen() {

    let [voted, setVoted] = useState(false);
    let [proVotes, setProVotes] = useState(0);
    let [contraVotes, setContraVotes] = useState(0);

    let [question, setQuestion] = useState(getQuestion());

    let router = useRouter();

    let handleVote = (choice: 'pro' | 'contra') => {
        if (choice === 'pro') {
            setProVotes(proVotes + 1);
        } else {
            setContraVotes(contraVotes + 1);
        }
        setVoted(true);
    };

    return (
        <View style={styles.debattenScreen}>
        <View style={styles.container}>
            <Text style={styles.title}>Debattenfrage des Tages</Text>


            {!voted ? (
                <>
                <Text style={styles.question}>
                    {question}
                    </Text>
                <View style={styles.buttons}>
                    <View style={styles.proButton}>
                        <Button title="Dafür" color={"white"} onPress={() => handleVote('pro')}/>
                    </View>
                    <View style={styles.conButton}>
                        <Button title="Dagegen" color={"white"} onPress={() => handleVote('contra')}/>
                    </View>
                </View>
                </>
            ) : (
                <View>
                    <Text style={styles.result}>Danke für deine Stimmabgabe, {'\n'}bis morgen! 😎</Text>
                </View>
            )}

        </View>
            <View style={styles.backButton}>
                <Button title="Zurück zur Übersicht"  onPress={() => router.back()}/>
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
    proButton: {
        backgroundColor: "#2e5d2d",
        color: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 30,
    },
    conButton: {
        backgroundColor: "#7d0025",
        color: 'white',
        borderRadius: 10,
        padding: 10,
        marginTop: 30
    },
    debattenScreen: {
        flex: 1,
        marginBottom: 10
    },
    backButton: {
        backgroundColor: "white"
    }
});

function getQuestion() {
    let today = new Date();
    let question = "";
    for (let debateQuestion of dailyQuestions) {
        let questionYear = debateQuestion.day.getFullYear();
        let questionMonth = debateQuestion.day.getMonth();
        let questionDay = debateQuestion.day.getDate();
        if (today.getFullYear() === questionYear && today.getMonth() === questionMonth && today.getDate() === questionDay) {
            question = debateQuestion.question;
        }
    }
    return question;
}
