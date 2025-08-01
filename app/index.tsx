import React, { useState } from 'react';
import {
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useVoiceInput } from '@/hooks/useVoiceInput';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVoiceResult = (text: string) => {
    setInput((prev) => (prev ? `${prev} ${text}` : text));
  };

  const { start, stop, listening, supported } = useVoiceInput(handleVoiceResult);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      // TODO: Call your backend or OpenAI here
      Alert.alert('Submitted!', input);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧠 Health Journal</Text>
      <ScrollView contentContainerStyle={styles.inputContainer}>
        <Text style={styles.label}>Describe your day:</Text>
        <TextInput
          style={styles.textArea}
          multiline
          placeholder="Type or speak your journal entry here..."
          value={input}
          onChangeText={setInput}
        />
        {Platform.OS === 'web' && supported && (
          <Button
            title={listening ? 'Stop Recording' : 'Start Recording'}
            onPress={listening ? stop : start}
          />
        )}
        <Button
          title={loading ? 'Submitting...' : 'Submit'}
          onPress={handleSubmit}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexGrow: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  textArea: {
    height: 150,
    borderColor: '#aaa',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
});
