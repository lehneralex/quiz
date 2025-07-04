import { View, Text, Button, ActivityIndicator, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WordItem = {
  word: string;
  definition: string;
};

//Farben für Buttons
const agreeColor = '#93B3A7';
const agreeColorLight = '#dcede1';

// Wörter
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
      // Wählt ein Wort aus der Liste
      const selectedWord = curiousWords[currentIndex % curiousWords.length];

      console.log('Fetching word:', selectedWord);

      // Holt Definiton des Wortes aus API
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`);
      const entries = await response.json();

      if (Array.isArray(entries) && entries.length > 0) {
        const first = entries[0];

        if (first.meanings && first.meanings.length > 0 &&
            first.meanings[0].definitions && first.meanings[0].definitions.length > 0) {

          setItem({
            word: selectedWord,
            definition: first.meanings[0].definitions[0].definition,
          });
        } else {
          throw new Error('No definition found'); //Falls keine Definition vorhanden ist
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

  // Validiert den eingegebenen Satz
  const validateSentence = (sentence: string, word: string): { isValid: boolean; message: string } => {
    if (sentence.trim().length === 0) {
      return { isValid: false, message: 'Please enter a sentence.' };
    }

    if (sentence.trim().length < 5) {
      return { isValid: false, message: 'Please write a more complete sentence (at least 5 characters).' };
    }

    // Überprüft ob das Wort im Satz enthalten ist
    const lowerSentence = sentence.toLowerCase();
    const lowerWord = word.toLowerCase();

    if (!lowerSentence.includes(lowerWord)) {
      return { isValid: false, message: `Please use the word "${word}" in your sentence.` };
    }

    // Überprüft ob der Satz angemessen endet
    const lastChar = sentence.trim().slice(-1);
    if (!['.', '!', '?'].includes(lastChar)) {
      return { isValid: false, message: 'Please end your sentence with proper punctuation (. ! ?).' };
    }

    return { isValid: true, message: 'Great! Your sentence has been submitted successfully. See you tomorrow! 💡' };
  };

  // Eingabe des Benutzers absenden
  const handleSubmit = async () => {
    if (!item) return;

    const validation = validateSentence(userSentence, item.word);

    setFeedback({
      message: validation.message,
      isSuccess: validation.isValid
    });

    if (validation.isValid) {
      // Fortschritt speichern
      const today = new Date().toISOString().slice(0, 10);
      await AsyncStorage.setItem(`done_word_${today}`, 'true');

      // Eingabe zurücksetzen
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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.dailyWordContainer}>
        <Text style={styles.word}>{item.word}</Text>
        <Text style={styles.definition}>{item.definition}</Text>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.promptText}>Use this word in your own sentence:</Text>
          {feedback && !feedback.isSuccess && (
              <View style={[styles.feedbackContainer, styles.errorFeedback]}>
                <Text style={[styles.feedbackText, styles.errorText]}>
                  {feedback.message}
                </Text>
              </View>
          )}
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

              <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                  <View style={[styles.button, {
                    backgroundColor:
                    userSentence.trim().length === 0 ? agreeColorLight : agreeColor
                  }]}>
                    <Button title="Submit" color="#333" onPress={() => handleSubmit()} disabled={userSentence.trim().length === 0} />
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}


//Styles für WortdesTagesScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  dailyWordContainer: {
    marginTop: 40,
    marginBottom: 60,
    padding: 20,
    backgroundColor: '#fcf8cb',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fdf7a9',
    minHeight: 100,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  word: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333'
  },
  definition: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    color: '#333'
  },
  inputSection: {
    width: '100%',
    marginBottom: 30
  },
  promptText: {
    fontSize: 18,
    fontWeight: '700',
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
  buttons: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
});


