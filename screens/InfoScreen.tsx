import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function InfoScreen() {
    const router = useRouter();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Info</Text>

            <Text style={styles.sectionTitle}>What is daily4?</Text>
            <Text style={styles.text}>
                Your daily dose of inspiration, knowledge & challenge.
                Complete four small tasks each day to refresh your general knowledge and challenge yourself in new ways.
            </Text>

            <Text style={styles.sectionTitle}>Daily tasks:</Text>
            <Text style={styles.text}>Quiz: Boost your general knowledge</Text>
            <Text style={styles.text}>Word of the day: Expand your vocabulary every day</Text>
            <Text style={styles.text}>Debate: Share your opinion on a current topic</Text>
            <Text style={styles.text}>Challenge: Make someone smile today</Text>

            <Text style={styles.sectionTitle}>New tasks every day</Text>
            <Text style={styles.text}>
                Complete all four tasks daily and track your progress in the progress overview
            </Text>

            <View style={styles.backButton}>
                <Button title="back" onPress={() => router.back()} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 6,
    },
    text: {
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 4,
    },
    backButton: {
        marginTop: 40,
        alignItems: 'center',
    },
});
