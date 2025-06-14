async function getApiKey(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('apiKey', (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(result.apiKey);
    });
  });
}

export async function askGPT(prompt: string) {
  const apiKey = await getApiKey();
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  return data.choices[0]?.message?.content.trim();
}
