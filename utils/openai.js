// utils/openai.js
export async function getStructuredData(userInput) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_OPENAI_KEY",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that structures health logs into JSON. Include fields like sleep_hours, exercise_minutes, meals, stress_level, medication, headache_time, caffeine_intake, and notes."
        },
        {
          role: "user",
          content: userInput
        }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
