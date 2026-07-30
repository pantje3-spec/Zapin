import React, { useState } from 'react';
import { Megaphone, Sparkles, X, Tag, Copy, Check, ArrowRight, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OptimizedImage } from './OptimizedImage';

export const WebsiteAdWidget: React.FC = () => {
  const { adCampaigns, currentPage, setCurrentPage, setSelectedCategoryFilter } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Filter active ad campaigns
  const activeAds = adCampaigns.filter((ad) => ad.status === 'active');

  // Do not display widget inside Admin panel
  if (currentPage === 'admin' || activeAds.length === 0) {
    return null;
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <>
      {/* Floating Pill Button on Left Bottom */}
      <div className="fixed bottom-6 left-6 z-40 font-mono">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-neutral-950 text-white border border-amber-500/50 hover:border-amber-400 p-3 sm:px-4 sm:py-2.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
        >
          <div className="relative flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline text-amber-300">
            Live Store Ads ({activeAds.length})
          </span>
          <span className="bg-amber-400 text-neutral-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            OFFERS
          </span>
        </button>
      </div>

      {/* Slide-Up Ad Offers Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fade-in font-mono">
          <div className="bg-neutral-950 border border-neutral-800 text-white rounded-3xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden relative">
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-950 text-amber-400 border border-amber-800/80 rounded-xl">
                  <Megaphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-serif uppercase tracking-wider text-white">Active Website Ad Campaigns</h3>
                  <p className="text-[10px] text-neutral-400">Synced directly from Zapin Admin Marketing Hub</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-neutral-400 hover:text-white bg-neutral-900 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of Active Ads */}
            <div className="p-5 space-y-4 overflow-y-auto flex-1">
              {activeAds.map((ad) => (
                <div
                  key={ad.id}
                  className="p-4 bg-neutral-900 rounded-2xl border border-neutral-800 space-y-3 relative overflow-hidden group hover:border-amber-400/40 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[9px] bg-neutral-950 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase">
                        {ad.platform}
                      </span>
                      <h4 className="font-bold text-xs text-white leading-snug">{ad.title}</h4>
                    </div>

                    {ad.promoCode && (
                      <button
                        onClick={() => handleCopyCode(ad.promoCode!)}
                        className="bg-amber-400 hover:bg-amber-300 text-neutral-950 px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 shrink-0 transition-colors"
                      >
                        {copiedCode === ad.promoCode ? <Check className="w-3 h-3 text-emerald-950" /> : <Tag className="w-3 h-3" />}
                        <span>{copiedCode === ad.promoCode ? 'COPIED' : ad.promoCode}</span>
                      </button>
                    )}
                  </div>

                  {ad.imageUrl && (
                    <div className="h-28 rounded-xl overflow-hidden bg-neutral-950 relative">
                      <OptimizedImage
                        src={ad.imageUrl}
                        alt={ad.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 500px"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-800/80">
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-current" /> Active Campaign Live
                    </span>

                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setSelectedCategoryFilter('all');
                        setCurrentPage('shop');
                      }}
                      className="text-amber-300 hover:text-amber-200 font-bold text-[11px] flex items-center gap-1"
                    >
                      <span>Shop Ad Collection</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 bg-neutral-900/80 border-t border-neutral-800 text-center">
              <p className="text-[10px] text-neutral-400">
                All promotional discounts & coupons automatically apply at checkout.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
