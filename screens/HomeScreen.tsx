import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const router = useRouter();
    const [debateDone, setDebateDone] = useState(false);
    const [challengeDone, setChallengeDone] = useState(false);
    const [quizDone, setQuizDone] = useState(false);
    const [wordDone, setWordDone] = useState(false);

    //hier werden die Buttons ausgegraut falls bereits erledigt wurde, also wenn ihr testen wollt dann einfach useEffect auskommentieren
    useEffect(() => {
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
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily 4{'\n'}keep your mind sharp</Text>

            <Pressable
                style={[
                    styles.fullButton,
                    quizDone && styles.disabledButton
                ]}
                onPress={() => !quizDone && router.push('/quiz')}
                disabled={quizDone}
            >
                <Text style={styles.buttonText}>Quiz</Text>
            </Pressable>


            <Pressable
                style={[
                    styles.fullButton,
                    wordDone && styles.disabledButton
                ]}
                onPress={() => !wordDone && router.push('/word')}
                disabled={wordDone}
            >
                <Text style={styles.buttonText}>Daily word</Text>
            </Pressable>


            <Pressable
                style={[
                    styles.fullButton,
                    debateDone && styles.disabledButton
                ]}
                onPress={() => !debateDone && router.push('/debate')}
                disabled={debateDone}
            >
                <Text style={styles.buttonText}>Debate</Text>
            </Pressable>

            <Pressable
                style={[
                    styles.fullButton,
                    challengeDone && styles.disabledButton
                ]}
                onPress={() => !challengeDone && router.push('/challenge')}
                disabled={challengeDone}
            >
                <Text style={styles.buttonText}>Challenge</Text>
            </Pressable>

            <TouchableOpacity style={[styles.infoButton, { right: 30 }]} onPress={() => router.push('/info')}>
                <Text style={styles.infoButtonText}>ℹ️</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.infoButton, { left: 30 }]} onPress={() => router.push('/progress')}>
                <Text style={styles.infoButtonText}>📈</Text>
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
    fullButton: {
        backgroundColor: '#4B9CD3',
        padding: 28,
        borderRadius: 14,
        width: screenWidth - buttonMargin,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 4,
    },
    disabledButton: {
        backgroundColor: '#999',
    },
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    infoButton: {
        position: 'absolute',
        bottom: 40,
        backgroundColor: '#4B9CD3',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
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
