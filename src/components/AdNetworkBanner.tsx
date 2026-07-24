import React, { useState } from 'react';
import { Sparkles, DollarSign, ExternalLink, ShieldCheck, Info, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AdNetworkBannerProps {
  position: 'header' | 'in-feed' | 'sidebar' | 'footer' | 'anchor';
  className?: string;
}

export const AdNetworkBanner: React.FC<AdNetworkBannerProps> = ({ position, className = '' }) => {
  const { adNetworkConfig, currentPage, setCurrentPage, setSelectedCategoryFilter } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  if (!adNetworkConfig.enabled || isDismissed) {
    return null;
  }

  // Position specific checks
  if (position === 'header' && !adNetworkConfig.headerBannerEnabled) return null;
  if (position === 'in-feed' && !adNetworkConfig.inFeedAdsEnabled) return null;
  if (position === 'sidebar' && !adNetworkConfig.sidebarAdsEnabled) return null;
  if (position === 'footer' && !adNetworkConfig.footerBannerEnabled) return null;
  if (position === 'anchor' && !adNetworkConfig.anchorAdEnabled) return null;

  const isLeaderboard = position === 'header' || position === 'footer';
  const isSidebar = position === 'sidebar' || position === 'in-feed';

  return (
    <div className={`relative overflow-hidden font-mono group border border-neutral-800 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-xl ${className}`}>
      {/* Top Publisher Badge */}
      <div className="bg-neutral-900/90 border-b border-neutral-800/80 px-3 py-1 flex items-center justify-between text-[10px] text-neutral-400">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-bold text-amber-300 uppercase tracking-wider">{adNetworkConfig.networkProvider}</span>
          <span className="hidden sm:inline text-neutral-500">• Slot #{position.toUpperCase()} • {adNetworkConfig.publisherId}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="hover:text-amber-300 flex items-center gap-1 transition-colors"
            title="Ad Choices & Monetization Info"
          >
            <Info className="w-3 h-3" />
            <span className="hidden sm:inline">Ads by Google</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="hover:text-white text-neutral-500 p-0.5"
            title="Hide Ad"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Ad Information Modal Toggle */}
      {showInfo && (
        <div className="p-3 bg-amber-950/80 border-b border-amber-800 text-[11px] text-amber-200 flex items-center justify-between gap-2">
          <span>
            <strong>Monetization Active:</strong> Live Publisher Ad Unit ({adNetworkConfig.publisherId}) earning real-time RPM revenue.
          </span>
          <button
            onClick={() => setShowInfo(false)}
            className="underline font-bold text-white shrink-0"
          >
            Close
          </button>
        </div>
      )}

      {/* Main Ad Display Content */}
      <div className={`p-4 sm:p-5 flex ${isLeaderboard ? 'flex-col sm:flex-row items-center justify-between gap-4' : 'flex-col gap-3'}`}>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-neutral-950 font-bold text-[9px] px-2 py-0.5 rounded uppercase">
              SPONSORED AD
            </span>
            <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> Earning Revenue
            </span>
          </div>

          <h4 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
            {position === 'header' && 'Exclusive Korean Tailoring & Luxury Streetwear Clearance'}
            {position === 'in-feed' && 'Featured Brand Spotlight — Up to 40% Off Select Outerwear'}
            {position === 'sidebar' && 'Limited Time Global Express Drop Offer'}
            {position === 'footer' && 'Archival Collection Member Rewards — Join & Earn Credits'}
            {position === 'anchor' && 'Special Storewide Discount — Shop Selected Drops Now'}
          </h4>

          <p className="text-xs text-neutral-400 font-sans line-clamp-2">
            Official publisher ad slot served via {adNetworkConfig.networkProvider}. Click to view exclusive offers from certified global brand partners.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
          <a
            href={adNetworkConfig.directAdUrl || "https://www.effectivecpmnetwork.com/yfdbxvqp6?key=5ca691feaa140cf099df2901ccbf6071"}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>Visit Ad Offer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Script Snippet container if custom snippet provided */}
      {adNetworkConfig.customScriptSnippet && (
        <div className="hidden">
          {/* Custom AdSense Script Container */}
          <div dangerouslySetInnerHTML={{ __html: adNetworkConfig.customScriptSnippet }} />
        </div>
      )}
    </div>
  );
};
