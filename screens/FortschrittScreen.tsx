import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function ProgressScreen() {
    const [completeDays, setCompleteDays] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        const checkProgress = async () => {
            const keys = await AsyncStorage.getAllKeys();
            const taskKeys = keys.filter((k) => k.startsWith('done_'));

            const progressMap: Record<string, Record<string, boolean>> = {};

            for (let key of taskKeys) {
                const value = await AsyncStorage.getItem(key);
                const match = key.match(/^done_(.+)_(\d{4}-\d{2}-\d{2})$/);

                if (match && value === 'true') {
                    const [, task, date] = match;
                    if (!progressMap[date]) {
                        progressMap[date] = {};
                    }
                    progressMap[date][task] = true;
                }
            }

            const allTasks = ['debate', 'challenge']; // ✅ ERWEITERT um 'challenge'

            const fullDays = Object.values(progressMap).filter((tasks) =>
                allTasks.every((task) => tasks[task])
            ).length;

            setCompleteDays(fullDays);
        };

        checkProgress();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>🏁 Dein Fortschritt</Text>
            <Text style={styles.count}>
                Du hast an <Text style={styles.number}>{completeDays}</Text> Tag(en) alle Aufgaben erledigt!
            </Text>
            <Text style={styles.note}>(aktuell werden Debatte & Challenge gezählt)</Text>

            <View style={styles.backButton}>
                <Button title="Zurück zur Startseite" onPress={() => router.push('/')} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    count: {
        fontSize: 22,
        textAlign: 'center',
    },
    number: {
        fontWeight: 'bold',
        color: '#4B9CD3',
    },
    note: {
        marginTop: 10,
        fontSize: 14,
        color: '#777',
        marginBottom: 40,
    },
    backButton: {
        marginTop: 20,
    },
});
