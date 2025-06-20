import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Daily 4</Text>
            <View style={styles.grid}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
                    <Text style={styles.buttonText}>🧠 Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Word of the Day')}>
                    <Text style={styles.buttonText}>📖 Word</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Debate')}>
                    <Text style={styles.buttonText}>🗣️ Debate</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Challenge')}>
                    <Text style={styles.buttonText}>🌟 Challenge</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    button: {
        backgroundColor: '#e1e1e1',
        padding: 20,
        margin: 10,
        borderRadius: 12,
        width: 140,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
});
