import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function DebattenScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 24 }}>🗣️ Debatte des Tages</Text>
            <Button title="Zurück" onPress={() => router.back()} />
        </View>
    );
}
