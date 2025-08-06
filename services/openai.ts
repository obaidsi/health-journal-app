import Constants from 'expo-constants';

export async function fetchStructuredData(prompt: string) {
  console.log('[OpenAI] Prompt:', prompt);

  try {
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

    const text = await res.text();
    console.log('[OpenAI] Raw response:', text);

    if (!res.ok) {
      throw new Error(`OpenAI API error: ${res.status} ${res.statusText}`);
    }

    let json;
    try {
      json = JSON.parse(text);
    } catch (err) {
      console.error('[OpenAI] Failed to parse response JSON', err);
      throw new Error('Invalid JSON response from OpenAI');
    }

    const content = json?.choices?.[0]?.message?.content;
    console.log('[OpenAI] Message content:', content);

    const data = JSON.parse(content);
    console.log('[OpenAI] Structured data:', data);

    return data;
  } catch (error) {
    console.error('[OpenAI] fetchStructuredData error:', error);
    throw error;
  }
}
