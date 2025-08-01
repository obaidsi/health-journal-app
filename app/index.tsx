import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setLoading(true);
    try {
      // TODO: Call your backend or OpenAI here
      Alert.alert("Submitted!", input);
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Describe your day:</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g., I had a headache..."
        multiline
        value={input}
        onChangeText={setInput}
      />
      <Button title={loading ? "Submitting..." : "Submit"} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
    borderRadius: 6,
    textAlignVertical: 'top',
  },
});
