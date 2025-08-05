import Constants from 'expo-constants';

export async function fetchStructuredData(prompt: string) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Constants.manifest?.extra?.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
      messages: [
        { role: 'system', content: 'Extract structured data as JSON...' },
        { role: 'user', content: prompt },
      ],
    }),
  });
  const json = await res.json();
  return JSON.parse(json.choices[0].message.content);
}
