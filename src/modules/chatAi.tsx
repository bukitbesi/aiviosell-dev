import React, { useEffect, useState } from 'react';
import { askGPT } from '../utils/gpt';

export default function ChatAssistant() {
  const [buyerMsg, setBuyerMsg] = useState('');
  const [reply, setReply] = useState('');
  const [tone, setTone] = useState('Friendly');
  const [tag, setTag] = useState('');

  const handleGenerateReply = async () => {
    const prompt = `
A Shopee buyer sent this message: "${buyerMsg}"
Respond in a "${tone}" tone. Make it natural, polite, and helpful.
Include soft persuasion if possible.
`;

    const result = await askGPT(prompt);
    setReply(result || 'No reply generated.');
  };

  const handleClassifyIntent = async () => {
    const prompt = `Classify the following Shopee buyer message into one of these tags: 
- Ready to Buy
- Price-Sensitive
- Just Curious
- Spam

Message: "${buyerMsg}"`;
    const result = await askGPT(prompt);
    setTag(result?.trim());
  };

  return (
    <div className="fixed right-2 top-20 w-96 bg-white border shadow-lg z-50 p-4 rounded text-sm font-sans">
      <h3 className="font-bold text-lg mb-2">💬 AivioSell Chat Assistant</h3>

      <label className="block mb-1 font-semibold">Buyer Message:</label>
      <textarea
        className="w-full p-2 border mb-2"
        rows={3}
        value={buyerMsg}
        onChange={(e) => setBuyerMsg(e.target.value)}
        placeholder="Paste buyer message here..."
      />

      <label className="block mb-1 font-semibold">Reply Tone:</label>
      <select
        className="w-full border p-2 mb-2"
        value={tone}
        onChange={(e) => setTone(e.target.value)}
      >
        <option>Friendly</option>
        <option>Formal</option>
        <option>Playful</option>
        <option>Urgent</option>
      </select>

      <button
        onClick={handleGenerateReply}
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
      >
        🧠 Generate Reply
      </button>

      <button
        onClick={handleClassifyIntent}
        className="bg-purple-500 text-white px-3 py-1 rounded"
      >
        🔍 Analyze Intent
      </button>

      {reply && (
        <div className="mt-4 bg-gray-100 p-2 rounded">
          <p className="font-bold">Suggested Reply:</p>
          <p className="italic">{reply}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(reply);
              const chatInput = document.querySelector('textarea') as HTMLTextAreaElement;
              if (chatInput) chatInput.value = reply;
            }}
            className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
          >
            📋 Paste to Chat
          </button>
        </div>
      )}

      {tag && (
        <div className="mt-2 text-sm text-gray-700">
          🔖 Buyer Tag: <strong>{tag}</strong>
        </div>
      )}
    </div>
  );
}