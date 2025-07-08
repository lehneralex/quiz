import {Stack} from 'expo-router';
import {Platform} from 'react-native';
import {categoryThemes} from '../theme/colors';

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#cadbbb', // Standardfarbe (kann später pro Seite überschrieben werden)
                    elevation: Platform.OS === 'android' ? 4 : 0,
                    shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
                    shadowOffset: Platform.OS === 'ios' ? {width: 0, height: 2} : undefined,
                    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined,
                    shadowRadius: Platform.OS === 'ios' ? 4 : undefined,
                    height: 500
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 22,
                    color: '#333',
                },
                headerTintColor: '#333',
                headerBackTitleVisible: false,
            }}
        >

            {/* Home Screen */}
            <Stack.Screen
                name="index"
                options={{
                    title: "Daily 4",
                    headerShown: false,
                }}
            />

            {/* Quiz */}
            <Stack.Screen
                name="quiz"
                options={{
                    title: "Quiz",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: categoryThemes.quiz.primary,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#333',
                    },
                    headerTintColor: '#333',

                }}
            />

            {/* Word */}
            <Stack.Screen
                name="word"
                options={{
                    title: "Daily Word",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: categoryThemes.word.primary,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#333',
                    },
                    headerTintColor: '#333',

                }}
            />

            {/* Debate Screen */}
            <Stack.Screen
                name="debate"
                options={{
                    title: "Debate",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: categoryThemes.debate.primary,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#333',
                    },
                    headerTintColor: '#333',

                }}
            />

            {/* Challenge */}
            <Stack.Screen
                name="challenge"
                options={{
                    title: "Challenge",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: categoryThemes.challenge.primary,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#333',
                    },
                    headerTintColor: '#333',

                }}
            />

            {/* Info */}
            <Stack.Screen
                name="info"
                options={{
                    title: "Info",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: categoryThemes.info.primary,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#333',
                    },
                    headerTintColor: '#333',

                }}
            />

            {/* Progress */}
            <Stack.Screen
                name="progress"
                options={{
                    title: "Progress",
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: categoryThemes.info.primary,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 22,
                        color: '#333',
                    },
                    headerTintColor: '#333',

                }}
            />

            {/* Word Detail */}
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Word Details",
                    headerShown: true,
                }}
            />
        </Stack>
    );
}
