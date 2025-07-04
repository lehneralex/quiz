import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather , Ionicons} from '@expo/vector-icons';


export default function InfoScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.header}>
                <Ionicons name="information-circle" size={24} color="#333" style={{ marginRight: 8 }} />
                <Text style={styles.title}>Info</Text>
            </View>

            <Text style={styles.intro}>
                Welcome to Daily4 your daily routine to keep your mind sharp!
                This section explains how the app works and what you can expect.
            </Text>

            <View style={styles.section}>
                <Feather name="calendar" size={20} color="#333" style={styles.icon} />
                <View style={styles.textContent}>
                    <Text style={styles.sectionTitle}>Daily new tasks:</Text>
                    <Text style={styles.sectionText}>
                        Every day, you’ll receive four new tasks:
                        Quiz, Daily Word, Debate, and Challenge.
                        The content is refreshed daily to keep things interesting.
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Feather name="bar-chart-2" size={20} color="#333" style={styles.icon} />
                <View style={styles.textContent}>
                    <Text style={styles.sectionTitle}>Track your progress</Text>
                    <Text style={styles.sectionText}>
                        Each task is marked as “done” once you complete it.
                        If you finish all four tasks in one day, it counts as a full completion for that day.
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Feather name="refresh-ccw" size={20} color="#333" style={styles.icon} />
                <View style={styles.textContent}>
                    <Text style={styles.sectionTitle}>Daily reset</Text>
                    <Text style={styles.sectionText}>
                        Tasks automatically reset every morning.
                        This lets you start fresh and stay consistent with your routine.
                    </Text>
                </View>
            </View>

            <View style={styles.section}>
                <Feather name="award" size={20} color="#333" style={styles.icon} />
                <View style={styles.textContent}>
                    <Text style={styles.sectionTitle}>Why this matters</Text>
                    <Text style={styles.sectionText}>
                        This daily combination of knowledge, language, creativity, and reflection helps keep your brain active – in a fun and engaging way.
                    </Text>
                </View>
            </View>

            <Text style={styles.footer}>Have fun and stay committed!</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        color: '#333',
    },
    intro: {
        fontSize: 16,
        color: '#333',
        marginBottom: 24,
        lineHeight: 22,
    },
    bold: {
        fontWeight: 'bold',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    icon: {
        marginTop: 4,
        marginRight: 12,
    },
    textContent: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#222',
    },
    sectionText: {
        fontSize: 15,
        color: '#444',
        lineHeight: 20,
    },
    footer: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 40,
        color: '#777',
    },
});
