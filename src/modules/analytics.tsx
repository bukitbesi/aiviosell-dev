import React, { useEffect, useState } from 'react';
import { askGPT } from '../utils/gpt';

export default function AnalyticsPanel() {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [salesEstimate, setSalesEstimate] = useState('');
  const [opportunity, setOpportunity] = useState('');

  useEffect(() => {
    const titleEl = document.querySelector('.attM6y'); // Shopee title class
    const priceEl = document.querySelector('.pqTWkA'); // Shopee price class

    if (titleEl && priceEl) {
      setProductName(titleEl.textContent || '');
      setPrice(priceEl.textContent || '');
      estimateSales(titleEl.textContent || '');
    }
  }, []);

  const estimateSales = async (title: string) => {
    const prompt = `Based on this Shopee product title: "${title}", estimate monthly units sold in Malaysia and give a short reason why it performs well or not. Classify its opportunity level as High, Medium, or Low.`;
    const result = await askGPT(prompt);
    const match = result?.match(/Estimate: (.*?) units/i);
    const opp = result?.match(/Opportunity: (High|Medium|Low)/i);

    setSalesEstimate(match?.[1] || 'N/A');
    setOpportunity(opp?.[1] || 'Unknown');
  };

  return (
    <div className="fixed right-2 top-20 w-80 bg-white border shadow-lg p-4 rounded text-sm z-50 font-sans">
      <h3 className="font-bold text-lg mb-2">📊 AivioSell Analytics</h3>

      <p className="text-xs text-gray-600 mb-1">Product:</p>
      <p className="mb-2 font-medium">{productName}</p>

      <p><strong>Price:</strong> {price}</p>
      <p><strong>Est. Monthly Sales:</strong> {salesEstimate} units</p>
      <p><strong>AI Score:</strong> <span className={`text-${opportunity === 'High' ? 'green' : opportunity === 'Medium' ? 'yellow' : 'red'}-600`}>{opportunity}</span></p>

      <button
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
        onClick={() => navigator.clipboard.writeText(`${productName}\nPrice: ${price}\nSales Estimate: ${salesEstimate} units\nOpportunity: ${opportunity}`)}
      >
        📋 Copy Insight
      </button>
    </div>
  );
}