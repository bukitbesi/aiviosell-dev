import React, { useState } from 'react';

export default function ProfitCalc() {
  const [cost, setCost] = useState(0);
  const [packaging, setPackaging] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [feePercent, setFeePercent] = useState(8); // Shopee default
  const [targetMargin, setTargetMargin] = useState(30);

  const totalCost = cost + packaging + shipping;
  const feeMultiplier = 1 - feePercent / 100;
  const suggestedPrice = totalCost / feeMultiplier / (1 - targetMargin / 100);
  const breakEven = totalCost / feeMultiplier;

  return (
    <div className="p-4 font-sans text-sm max-w-md">
      <h2 className="text-xl font-bold mb-3">💰 Smart Profit Calculator</h2>

      <div className="grid grid-cols-2 gap-4">
        <label>Product Cost (RM)
          <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="border p-1 w-full" />
        </label>

        <label>Packaging (RM)
          <input type="number" value={packaging} onChange={e => setPackaging(Number(e.target.value))} className="border p-1 w-full" />
        </label>

        <label>Shipping Cost (RM)
          <input type="number" value={shipping} onChange={e => setShipping(Number(e.target.value))} className="border p-1 w-full" />
        </label>

        <label>Shopee Fee % (Default 8%)
          <input type="number" value={feePercent} onChange={e => setFeePercent(Number(e.target.value))} className="border p-1 w-full" />
        </label>

        <label>Target Margin % (e.g. 30%)
          <input type="number" value={targetMargin} onChange={e => setTargetMargin(Number(e.target.value))} className="border p-1 w-full" />
        </label>
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <p><strong>📈 Break-Even Price:</strong> RM {breakEven.toFixed(2)}</p>
        <p><strong>💵 Suggested Selling Price:</strong> RM {suggestedPrice.toFixed(2)}</p>
        {suggestedPrice - breakEven < 2 && (
          <p className="text-red-600 mt-1">⚠️ Warning: Low profit margin!</p>
        )}
      </div>
    </div>
  );
}