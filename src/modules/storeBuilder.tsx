import React, { useState } from 'react';
import { askGPT } from '../utils/gpt';

export default function StoreBuilder() {
  const [niche, setNiche] = useState('');
  const [ideas, setIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState('');
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSuggestIdeas = async () => {
    setLoading(true);
    const prompt = `Suggest 5 high-potential product ideas in the niche: ${niche}. Focus on items that sell well on Shopee Malaysia.`;
    const result = await askGPT(prompt);
    const splitIdeas = result?.split('\n').filter(i => i.trim());
    setIdeas(splitIdeas || []);
    setLoading(false);
  };

  const handleGenerateListing = async (idea: string) => {
    setLoading(true);
    const prompt = `Create a Shopee product listing for "${idea}". Include: 
1. Product Title 
2. SEO Description 
3. 3 Selling Points 
4. 5 SEO Tags`;
    const result = await askGPT(prompt);
    const [title, ...rest] = result.split('\n');
    setListing({ idea, title, content: rest.join('\n') });
    setLoading(false);
  };

  return (
    <div className="p-4 font-sans text-sm max-w-md">
      <h2 className="text-xl font-bold mb-2">🧠 Auto Store Builder</h2>

      <input
        className="border w-full p-2 mb-2"
        placeholder="Enter niche (e.g., home gadgets)"
        value={niche}
        onChange={(e) => setNiche(e.target.value)}
      />

      <button
        onClick={handleSuggestIdeas}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-3"
      >
        {loading ? 'Thinking...' : 'Suggest Product Ideas'}
      </button>

      {ideas.length > 0 && (
        <div className="mb-3">
          <p className="font-bold mb-1">💡 Ideas:</p>
          {ideas.map((idea, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedIdea(idea);
                handleGenerateListing(idea);
              }}
              className="block text-left w-full bg-gray-100 hover:bg-gray-200 p-2 mb-1 rounded"
            >
              {idea}
            </button>
          ))}
        </div>
      )}

      {listing && (
        <div className="border p-3 rounded bg-white">
          <h3 className="font-semibold mb-1">📦 Listing for: {selectedIdea}</h3>
          <p className="font-bold mb-1">Title:</p>
          <p>{listing.title}</p>
          <p className="font-bold mt-2">Details:</p>
          <pre className="whitespace-pre-wrap">{listing.content}</pre>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(`${listing.title}\n\n${listing.content}`)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              📋 Copy
            </button>
            <button
              onClick={() => {
                const csv = `"Title","Description"\n"${listing.title}","${listing.content}"`;
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `listing-${Date.now()}.csv`;
                a.click();
              }}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              ⬇ Download CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
}