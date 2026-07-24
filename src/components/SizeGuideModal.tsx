import React, { useState } from 'react';
import { X, Ruler, Info } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [activeTab, setActiveTab] = useState<'men' | 'women'>('men');
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  if (!isSizeGuideOpen) return null;

  const menSizes = [
    { size: 'S', chestCm: '98-102', shoulderCm: '48-50', lengthCm: '72', waistCm: '76-80' },
    { size: 'M', chestCm: '104-108', shoulderCm: '51-53', lengthCm: '74', waistCm: '82-86' },
    { size: 'L', chestCm: '110-114', shoulderCm: '54-56', lengthCm: '76', waistCm: '88-92' },
    { size: 'XL', chestCm: '116-120', shoulderCm: '57-59', lengthCm: '78', waistCm: '94-98' },
    { size: 'Free Size', chestCm: '112-118', shoulderCm: '55-58', lengthCm: '76', waistCm: 'Adjustable' },
  ];

  const womenSizes = [
    { size: 'S', chestCm: '88-92', shoulderCm: '42-44', lengthCm: '68', waistCm: '64-68' },
    { size: 'M', chestCm: '94-98', shoulderCm: '45-47', lengthCm: '70', waistCm: '70-74' },
    { size: 'L', chestCm: '100-104', shoulderCm: '48-50', lengthCm: '72', waistCm: '76-80' },
    { size: 'Free Size', chestCm: '102-108', shoulderCm: '47-49', lengthCm: '71', waistCm: 'Elastic' },
  ];

  const activeData = activeTab === 'men' ? menSizes : womenSizes;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden border border-neutral-200">
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-950 text-white">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-amber-300 stroke-[1.5]" />
            <h3 className="text-sm font-mono tracking-widest uppercase text-white">
              Zapin Korean Tailoring Size Guide
            </h3>
          </div>
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="p-1 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Info Banner */}
          <div className="p-4 bg-neutral-50 border border-neutral-200 rounded flex items-start gap-3 text-xs text-neutral-600">
            <Info className="w-4 h-4 text-neutral-900 shrink-0 mt-0.5" />
            <p>
              <strong className="text-neutral-900 font-mono">Seoul Fit Philosophy:</strong> Zapin outerwear and tops feature our signature relaxed Korean drop-shoulder silhouette. For a standard structured fit, consider ordering one size down.
            </p>
          </div>

          {/* Toggles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-200 pb-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('men')}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded ${
                  activeTab === 'men'
                    ? 'bg-neutral-950 text-white font-bold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Men's Fit
              </button>
              <button
                onClick={() => setActiveTab('women')}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded ${
                  activeTab === 'women'
                    ? 'bg-neutral-950 text-white font-bold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Women's Fit
              </button>
            </div>

            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded font-mono text-[11px]">
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded ${unit === 'cm' ? 'bg-white font-bold shadow-xs text-black' : 'text-neutral-500'}`}
              >
                CM
              </button>
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 rounded ${unit === 'inches' ? 'bg-white font-bold shadow-xs text-black' : 'text-neutral-500'}`}
              >
                INCHES
              </button>
            </div>
          </div>

          {/* Size Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-neutral-700 font-mono">
              <thead className="text-[11px] uppercase bg-neutral-100 text-neutral-900 border-b border-neutral-200">
                <tr>
                  <th className="py-3 px-4">Size</th>
                  <th className="py-3 px-4">Chest</th>
                  <th className="py-3 px-4">Shoulder</th>
                  <th className="py-3 px-4">Length</th>
                  <th className="py-3 px-4">Waist</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {activeData.map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-50">
                    <td className="py-3 px-4 font-bold text-neutral-950">{row.size}</td>
                    <td className="py-3 px-4">{row.chestCm} {unit}</td>
                    <td className="py-3 px-4">{row.shoulderCm} {unit}</td>
                    <td className="py-3 px-4">{row.lengthCm} {unit}</td>
                    <td className="py-3 px-4">{row.waistCm} {unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 border-t border-neutral-200 text-right">
          <button
            onClick={() => setIsSizeGuideOpen(false)}
            className="bg-neutral-950 text-white text-xs px-6 py-2.5 font-mono tracking-wider uppercase rounded hover:bg-neutral-800"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
