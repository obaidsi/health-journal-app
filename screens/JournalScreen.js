import { format } from "date-fns";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import { db } from "../utils/firebase";
import { getStructuredData } from "../utils/openai";

export default function JournalScreen() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [structured, setStructured] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const jsonData = await getStructuredData(input);
      setStructured(jsonData);

      const date = format(new Date(), "yyyy-MM-dd");
      const time = format(new Date(), "HH-mm-ss");

      await setDoc(doc(db, "health_journal", date, "entries", time), JSON.parse(jsonData));
      alert("✅ Log saved!");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Daily Health Log</Text>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Describe your day here..."
        value={input}
        onChangeText={setInput}
      />
      <Button title={loading ? "Saving..." : "Save Entry"} onPress={handleSubmit} />
      {structured ? (
        <>
          <Text style={styles.previewTitle}>Structured Output</Text>
          <Text style={styles.preview}>{structured}</Text>
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 120,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: "top"
  },
  previewTitle: { marginTop: 20, fontWeight: "bold" },
  preview: { marginTop: 5, fontFamily: "monospace" }
});
