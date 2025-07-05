import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { categoryThemes } from '../theme/colors';
export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#cadbbb', // Hintergrundfarbe des Headers (helles Grün)
                    elevation: Platform.OS === 'android' ? 4 : 0, // Schattenhöhe auf Android (4), auf iOS kein "Schatten"/Hervorhebung
                    shadowColor: Platform.OS === 'ios' ? '#000' : undefined, // Schattenfarbe auf iOS (schwarz), auf Android nicht gesetzt
                    shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined, // Position des Schattens auf iOS
                    shadowOpacity: Platform.OS === 'ios' ? 0.1 : undefined, // Transparenz des Schattens auf iOS (sehr leicht)
                    shadowRadius: Platform.OS === 'ios' ? 4 : undefined, // Weichzeichnungsradius des Schattens auf iOS
                    height: 500 // Höhe des Headers in Pixel
                }
                ,
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
