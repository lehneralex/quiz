import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {categoryThemes} from "../theme/colors";
import { Ionicons, Feather } from '@expo/vector-icons';
import CategoryButton from "../components/CategoryButton";


export default function HomeScreen() {
    const router = useRouter();
    const [debateDone, setDebateDone] = useState(false);
    const [challengeDone, setChallengeDone] = useState(false);
    const [quizDone, setQuizDone] = useState(false);
    const [wordDone, setWordDone] = useState(false);

    //hier werden die Buttons ausgegraut falls bereits erledigt wurde, also wenn ihr testen wollt dann einfach useEffect auskommentieren
    /*useEffect(() => {
        const checkTasksDone = async () => {
            const today = new Date().toISOString().slice(0, 10);

            const [debate, challenge, quiz, word] = await Promise.all([
                AsyncStorage.getItem(`done_debate_${today}`),
                AsyncStorage.getItem(`done_challenge_${today}`),
                AsyncStorage.getItem(`done_quiz_${today}`),
                AsyncStorage.getItem(`done_word_${today}`),
            ]);

            setDebateDone(debate === 'true');
            setChallengeDone(challenge === 'true');
            setQuizDone(quiz === 'true');
            setWordDone(word === 'true');
        };

        checkTasksDone();
    }, []);*/

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily 4{'\n'}keep your mind sharp</Text>

            <CategoryButton
                category="quiz"
                done={quizDone}
                onPress={() => router.push('/quiz')}
            />

            <CategoryButton
                category="word"
                done={wordDone}
                onPress={() => router.push('/word')}
            />

            <CategoryButton
                category="debate"
                done={debateDone}
                onPress={() => router.push('/debate')}
            />

            <CategoryButton
                category="challenge"
                done={challengeDone}
                onPress={() => router.push('/challenge')}
            />

            <TouchableOpacity
                style={[styles.infoButton, { right: 30 }]}
                onPress={() => router.push('/info')}
            >
                <Ionicons name="information-circle" size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.infoButton, { left: 30 }]}
                onPress={() => router.push('/progress')}
            >
                <Feather name="bar-chart-2" size={26} color="#fff" />
            </TouchableOpacity>

        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const buttonMargin = 30;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 80,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 80,
        color: '#333',
        textAlign: 'center'
    },

    infoButton: {
        position: 'absolute',
        bottom: 40,
        backgroundColor: '#BEBEBE',
        width: 80,
        height: 50,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#333',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 5,
    },
    infoButtonText: {
        color: '#fff',
        fontSize: 24,
    },
});
