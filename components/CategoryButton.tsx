import React from 'react';
import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoryThemes, CategoryType} from "../theme/colors";

type Props = {
    category: CategoryType;
    done: boolean;
    onPress: () => void;
};

const screenWidth = Dimensions.get('window').width;
const buttonMargin = 30;

export default function CategoryButton({ category, done, onPress }: Props) {
    const theme = categoryThemes[category];

    return (
        <Pressable
            style={[
                styles.button,
                { backgroundColor: done ? '#999' : theme.primary },
            ]}
            onPress={onPress}
            disabled={done}
        >
            <Text style={styles.text}>{theme.name}</Text>

            {done && (
                <Ionicons name="checkmark-circle" size={24} color="#fff" style={styles.icon} />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
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
        position: 'relative',
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    icon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});
