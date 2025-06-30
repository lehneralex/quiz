import { View, Text, Button, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

type WordItem = { 
  word: string; 
  definition: string;
  example?: string;
};

// Kuratierte Liste mit interessanten englischen Wörtern
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

  const fetchWordOfDay = async () => {
    setLoading(true);
    setError(false);
    setItem(null);

    try {
      // Wähle ein Wort aus der kuratierten Liste
      const selectedWord = curiousWords[currentIndex % curiousWords.length];
      
      console.log('Fetching word:', selectedWord);
      
      // Hole Definition von der Free Dictionary API
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

  const getNewWord = () => {
    setCurrentIndex(prev => prev + 1);
  };

  useEffect(() => {
    fetchWordOfDay();
  }, [currentIndex]);

  if (loading) {
    return <ActivityIndicator style={styles.center} />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 12 }}>Fehler beim Laden 😕</Text>
        <Button title="Erneut versuchen" onPress={fetchWordOfDay} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 12 }}>Kein Wort geladen</Text>
        <Button title="Neu laden" onPress={fetchWordOfDay} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Wort des Tages</Text>
      <Text style={styles.word}>{item.word}</Text>
      <Text style={styles.definition}>{item.definition}</Text>
      {item.example && (
        <Text style={styles.example}>Beispiel: "{item.example}"</Text>
      )}
      <Button title="Neues Wort" onPress={getNewWord} />
      <Button title="Zurück" onPress={() => router.back()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  center: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
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
    textAlign: 'center'
  },
  definition: { 
    fontSize: 18, 
    textAlign: 'center', 
    lineHeight: 24,
    marginBottom: 16
  },
  example: { 
    fontSize: 16, 
    fontStyle: 'italic', 
    color: '#666', 
    textAlign: 'center',
    marginBottom: 30
  },
});