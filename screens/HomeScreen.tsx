//
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
//
// export default function HomeScreen() {
//     const router = useRouter();
//
//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>Your Daily 4</Text>
//             <View style={styles.grid}>
//                 <TouchableOpacity style={styles.button} onPress={() => router.push('/quiz')}>
//                     <Text style={styles.buttonText}>🧠 Quiz</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => router.push('/word')}>
//                     <Text style={styles.buttonText}>📖 Word</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => router.push('/debate')}>
//                     <Text style={styles.buttonText}>🗣️ Debate</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={() => router.push('/challenge')}>
//                     <Text style={styles.buttonText}>🌟 Challenge</Text>
//                 </TouchableOpacity>
//             </View>
//
//             {/* Info-Button rechts unten */}
//             <TouchableOpacity style={styles.infoButton} onPress={() => router.push('/info')}>
//                 <Text style={styles.infoButtonText}>ℹ️</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         paddingTop: 60,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 30,
//     },
//     grid: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         gap: 20,
//     },
//     button: {
//         backgroundColor: '#e1e1e1',
//         padding: 20,
//         margin: 10,
//         borderRadius: 12,
//         width: 140,
//         alignItems: 'center',
//     },
//     buttonText: {
//         fontSize: 18,
//     },
//     infoButton: {
//         position: 'absolute',
//         bottom: 30,
//         right: 30,
//         backgroundColor: '#333',
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     infoButtonText: {
//         color: '#fff',
//         fontSize: 24,
//     },
// });
//

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Daily 4 - halt dich{'\n'}geistig fit! 🧠</Text>

            <Pressable style={styles.fullButton} onPress={() => router.push('/quiz')}>
                <Text style={styles.buttonText}>Quiz</Text>
            </Pressable>

            <Pressable style={styles.fullButton} onPress={() => router.push('/word')}>
                <Text style={styles.buttonText}>Wort des Tages</Text>
            </Pressable>

            <Pressable style={styles.fullButton} onPress={() => router.push('/debate')}>
                <Text style={styles.buttonText}>Debattenfrage</Text>
            </Pressable>

            <Pressable style={styles.fullButton} onPress={() => router.push('/challenge')}>
                <Text style={styles.buttonText}>Tages-Challenge</Text>
            </Pressable>

            <TouchableOpacity style={styles.infoButton} onPress={() => router.push('/info')}>
                <Text style={styles.infoButtonText}>ℹ️</Text>
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
    buttonText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#fff',
        textAlign: 'center',
    },
    infoButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
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
