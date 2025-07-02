import { View, Text, Button, ActivityIndicator, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CategoryHeader from '../components/CategoryHeader';
import { categoryThemes } from '../theme/colors';

type WordItem = {
  word: string;
  definition: string;
  example?: string;
};
// Curated list of interesting English words
const curiousWords = [
  'serendipity', 'petrichor', 'wanderlust', 'ephemeral', 'luminous',
  'mellifluous', 'ethereal', 'quintessential', 'ubiquitous', 'resilience',
  'eloquent', 'nostalgia', 'tranquil', 'vivacious', 'enigmatic',
  'pristine', 'serene', 'whimsical', 'audacious', 'magnificent'
];

export default function WortdesTagesScreen() {
  const router = useRouter();
  const [item, setItem] = useState<WordItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSentence, setUserSentence] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);

  const fetchWordOfDay = async () => {
    setLoading(true);
    setError(false);
    setItem(null);

    try {
      // Select a word from the curated list
      const selectedWord = curiousWords[currentIndex % curiousWords.length];

      console.log('Fetching word:', selectedWord);

      // Get definition from Free Dictionary API
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`);
      const entries = await response.json();

      if (Array.isArray(entries) && entries.length > 0) {
        const first = entries[0];

        if (first.meanings && first.meanings.length > 0 &&
            first.meanings[0].definitions && first.meanings[0].definitions.length > 0) {

          setItem({
            word: selectedWord,
            definition: first.meanings[0].definitions[0].definition,
            example: first.meanings[0].definitions[0].example || undefined,
          });
        } else {
          throw new Error('No definition found');
        }
      } else {
        throw new Error('No entries found');
      }

    } catch (err) {
      console.error('Error fetching word:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const validateSentence = (sentence: string, word: string): { isValid: boolean; message: string } => {
    if (sentence.trim().length === 0) {
      return { isValid: false, message: 'Please enter a sentence.' };
    }

    if (sentence.trim().length < 5) {
      return { isValid: false, message: 'Please write a more complete sentence (at least 5 characters).' };
    }

    // Check if the word is used in the sentence (case insensitive)
    const lowerSentence = sentence.toLowerCase();
    const lowerWord = word.toLowerCase();

    if (!lowerSentence.includes(lowerWord)) {
      return { isValid: false, message: `Please use the word "${word}" in your sentence.` };
    }

    // Check if sentence ends with proper punctuation
    const lastChar = sentence.trim().slice(-1);
    if (!['.', '!', '?'].includes(lastChar)) {
      return { isValid: false, message: 'Please end your sentence with proper punctuation (. ! ?).' };
    }

    return { isValid: true, message: 'Great! Your sentence has been submitted successfully.' };
  };

  const handleSubmit = async () => {
    if (!item) return;

    const validation = validateSentence(userSentence, item.word);

    setFeedback({
      message: validation.message,
      isSuccess: validation.isValid
    });

    if (validation.isValid) {
      // Save progress - this will make the daily word inaccessible
      const today = new Date().toISOString().slice(0, 10);
      await AsyncStorage.setItem(`done_word_${today}`, 'true');

      // Clear the input field
      setUserSentence('');
    }
  };

  useEffect(() => {
    fetchWordOfDay();
  }, []);

  if (loading) {
    return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
    );
  }

  if (error) {
    return (
        <View style={styles.center}>
          <Text style={styles.errorText}>Error loading word 😕</Text>
          <Button title="Try again" onPress={fetchWordOfDay} />
        </View>
    );
  }

  if (!item) {
    return (
        <View style={styles.center}>
          <Text style={styles.errorText}>No word loaded</Text>
          <Button title="Reload" onPress={fetchWordOfDay} />
        </View>
    );
  }  return (
    <View style={styles.container}>
      <CategoryHeader
        title={categoryThemes.word.name}
        color={categoryThemes.word.primary}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.definition}>{item.definition}</Text>
        {item.example && (
          <Text style={styles.example}>Example: "{item.example}"</Text>
        )}

        <View style={styles.inputSection}>
          <Text style={styles.promptText}>Use this word in your own sentence:</Text>

          {feedback && feedback.isSuccess ? (
            <View style={[styles.feedbackContainer, styles.successFeedback]}>
              <Text style={[styles.feedbackText, styles.successText]}>
                {feedback.message}
              </Text>
            </View>
          ) : (
            <>
              <TextInput
                style={styles.textInput}
                value={userSentence}
                onChangeText={setUserSentence}
                placeholder={`Write a sentence using "${item.word}"...`}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
              {feedback && !feedback.isSuccess && (
                <View style={[styles.feedbackContainer, styles.errorFeedback]}>
                  <Text style={[styles.feedbackText, styles.errorText]}>
                    {feedback.message}
                  </Text>
                </View>
              )}
              <View style={styles.buttonContainer}>
                <View style={[styles.customButton, { backgroundColor: categoryThemes.word.primary }]}>
                  <Button
                    title="Submit"
                    color="#333"
                    onPress={handleSubmit}
                    disabled={userSentence.trim().length === 0}
                  />
                </View>
              </View>
            </>
          )}
        </View>

        <View style={styles.backButtonContainer}>
          <View style={[styles.backButton, { backgroundColor: categoryThemes.word.secondary }]}>
            <Button
              title="Back"
              color="#333"
              onPress={() => router.back()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333'
  },
  definition: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    color: '#333'
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginBottom: 30
  },
  inputSection: {
    width: '100%',
    marginBottom: 30
  },
  promptText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    minHeight: 80,
    backgroundColor: '#f9f9f9',
    color: '#333'
  },
  feedbackContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  successFeedback: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    borderWidth: 1
  },
  errorFeedback: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500'
  },
  successText: {
    color: '#155724'
  },
  errorText: {
    color: '#721c24'
  },
  buttonContainer: {
    marginVertical: 10,
    width: '100%',
  },
  customButton: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  backButtonContainer: {
    marginTop: 20,
    width: '100%',
  },
  backButton: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  }
});


