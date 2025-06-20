import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function QuizScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24 }}>🧠 Quiz</Text>
            <Button title="Zurück" onPress={() => router.back()} />
        </View>
    );
}
