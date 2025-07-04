import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function ProgressScreen() {
    const [completeDays, setCompleteDays] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProgress = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const taskKeys = keys.filter(k => k.startsWith('done_'));

                const dailyMap: { [date: string]: Set<string> } = {};

                taskKeys.forEach(key => {
                    const [, type, date] = key.split('_');
                    if (!dailyMap[date]) dailyMap[date] = new Set();
                    dailyMap[date].add(type);
                });

                const completed = Object.values(dailyMap).filter(set => set.size === 4).length;
                setCompleteDays(completed);
            } catch (error) {
                console.error('Error loading progress:', error);
            } finally {
                setLoading(false);
            }
        };

        loadProgress();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Feather name="bar-chart-2" size={24} color="#333" style={{ marginRight: 8 }} />
                <Text style={styles.title}>Progress</Text>
            </View>


            <View style={styles.card}>
                <Text style={styles.cardLabel}>Days with 4 tasks done</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#4B9CD3" />
                ) : (
                    <Text style={styles.cardCount}>{completeDays}</Text>
                )}
            </View>

            <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>tip:</Text>
                <Text style={styles.tipText}>
                    Try to do as many tasks as possible on many days in a row. It keeps your brain fit!
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: 24,
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        color: '#333',
    },

    card: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        marginBottom: 20,
    },
    cardLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    cardCount: {
        fontSize: 48,
        fontWeight: '700',
        color: '#333',
    },
    tipBox: {
        backgroundColor: '#e6f0fa',
        width: '100%',
        padding: 20,
        borderRadius: 14,
        marginTop: 10,
    },
    tipTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
    },
    tipText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },

});
