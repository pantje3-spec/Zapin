import React, { useState, useEffect } from 'react';
import { Sparkles, DollarSign, ExternalLink, ShieldCheck, Info, X, Tag, Copy, Check, Flame, Zap, ArrowRight, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface AdNetworkBannerProps {
  position: 'header' | 'in-feed' | 'sidebar' | 'footer' | 'anchor';
  className?: string;
}

export const AdNetworkBanner: React.FC<AdNetworkBannerProps> = ({ position, className = '' }) => {
  const { adNetworkConfig, currentPage, setCurrentPage, setSelectedCategoryFilter } = useStore();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Countdown timer simulation for flash deals
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
  const isAnchor = position === 'anchor';

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const adUrl = adNetworkConfig.smartlinkUrl || adNetworkConfig.directAdUrl || "https://www.effectivecpmnetwork.com/p6301rkg6?key=5ae6deb02a6effe7cd9e0b09f722e6a2";

  const containerClasses = isAnchor
    ? 'fixed bottom-[60px] lg:bottom-0 left-0 right-0 z-30 mx-auto max-w-5xl rounded-t-2xl border-t-2 border-amber-400 bg-neutral-950 text-white shadow-2xl backdrop-blur-md font-sans group px-1 sm:px-0'
    : `relative overflow-hidden font-sans group border border-neutral-800 rounded-2xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 text-white shadow-xl my-3 ${className}`;

  return (
    <div className={containerClasses}>
      {/* Top Publisher Bar */}
      <div className="bg-neutral-900/90 border-b border-neutral-800/80 px-3 py-1 flex items-center justify-between text-[10px] text-neutral-400">
        <div className="flex items-center gap-1.5 truncate">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="font-mono font-bold text-amber-300 uppercase tracking-wider">{adNetworkConfig.networkProvider}</span>
          <span className="hidden sm:inline text-neutral-500 font-mono">• Slot #{position.toUpperCase()} • {adNetworkConfig.publisherId}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="hover:text-amber-300 flex items-center gap-1 transition-colors text-[10px]"
            title="Ad Choices & Monetization Info"
          >
            <Info className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">Ads by Google</span>
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="hover:text-white text-neutral-400 p-1 hover:bg-neutral-800 rounded-full transition-colors"
            title="Close Banner Ad"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Ad Info Drawer */}
      {showInfo && (
        <div className="p-2.5 bg-amber-950/90 border-b border-amber-800 text-[11px] text-amber-200 flex items-center justify-between gap-2">
          <span>
            <strong>Monetization Active:</strong> Live Publisher Ad Unit ({adNetworkConfig.publisherId}) optimized for mobile & desktop CTR.
          </span>
          <button
            onClick={() => setShowInfo(false)}
            className="underline font-bold text-white shrink-0"
          >
            Close
          </button>
        </div>
      )}

      {/* Main Banner Body */}
      <div className={`p-3 sm:p-4 flex ${isLeaderboard || isAnchor ? 'flex-col sm:flex-row sm:items-center justify-between gap-3' : 'flex-col gap-3'}`}>
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="bg-amber-400 text-neutral-950 font-mono font-extrabold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-950" /> SPONSORED AD
            </span>
            <span className="bg-red-600/90 text-white font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current text-amber-300" /> HOT DEAL
            </span>
            <span className="text-emerald-400 font-mono font-bold flex items-center gap-1 hidden sm:flex">
              <DollarSign className="w-3 h-3" /> VERIFIED REVENUE SLOT
            </span>
          </div>

          <h4 className="text-xs sm:text-base font-serif font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
            {position === 'header' && 'Exclusive Korean Streetwear & Luxury Tailoring Drop — Up to 50% Off'}
            {position === 'in-feed' && 'Featured Apparel Spotlight — Extra ₹500 Cashback with Code ZAPIN500'}
            {position === 'sidebar' && 'Limited Time Free Worldwide Express Shipping Offer'}
            {position === 'footer' && 'Archival Collection VIP Drops — Join & Redeem Instant Store Credits'}
            {position === 'anchor' && '🔥 Special Mobile Offer: Click to Unlock Exclusive Partner Discount!'}
          </h4>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-0.5">
            <div className="flex items-center gap-1 text-amber-300 font-mono text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Expires in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cash on Delivery (COD) & Free Returns
            </div>
          </div>
        </div>

        {/* CTA & Actions */}
        <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-center pt-1 sm:pt-0">
          <button
            onClick={() => handleCopyCode('ZAPIN500')}
            className="bg-neutral-800 hover:bg-neutral-700 text-amber-300 border border-amber-500/30 px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0"
            title="Copy Promo Code"
          >
            {copiedCode === 'ZAPIN500' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Tag className="w-3.5 h-3.5" />}
            <span>{copiedCode === 'ZAPIN500' ? 'COPIED!' : 'ZAPIN500'}</span>
          </button>

          <a
            href={adUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-initial bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
          >
            <span>Visit Ad Offer</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Embedded Custom Script Snippet container */}
      {adNetworkConfig.customScriptSnippet && (
        <div className="hidden">
          <div dangerouslySetInnerHTML={{ __html: adNetworkConfig.customScriptSnippet }} />
        </div>
      )}
    </div>
  );
};

