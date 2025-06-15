import React, { useState } from 'react';
import { askGPT } from '../utils/gpt';

export default function VideoGenerator() {
  const [productName, setProductName] = useState('');
  const [voice, setVoice] = useState('Female - EN');
  const [script, setScript] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateScript = async () => {
    setLoading(true);
    const prompt = `Create a short 20-second TikTok-style product promo script for: "${productName}". 
Use this format:
- Hook
- Benefit highlight
- Call to action
Keep it trendy, short, and punchy.`;
    const result = await askGPT(prompt);
    setScript(result || '');
    setLoading(false);
  };

  return (
    <div className="p-4 font-sans text-sm max-w-md">
      <h2 className="text-xl font-bold mb-2">🎬 Product Video Generator</h2>

      <input
        className="border w-full p-2 mb-2"
        placeholder="Enter product name (e.g., Wireless Mini Blender)"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label className="block mb-1 font-semibold">Voice:</label>
      <select
        className="border p-2 w-full mb-2"
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
      >
        <option>Female - EN</option>
        <option>Male - EN</option>
        <option>Female - BM</option>
        <option>Male - CN</option>
      </select>

      <button
        onClick={handleGenerateScript}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        {loading ? 'Thinking...' : 'Generate Script'}
      </button>

      {script && (
        <div className="mt-3 p-3 bg-gray-100 rounded">
          <p className="font-semibold mb-1">📜 AI Script:</p>
          <pre className="whitespace-pre-wrap">{script}</pre>
          <button
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => navigator.clipboard.writeText(script)}
          >
            📋 Copy Script
          </button>
        </div>
      )}
    </div>
  );
}