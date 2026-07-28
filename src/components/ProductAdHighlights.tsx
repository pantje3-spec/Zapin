import React, { useState } from 'react';
import { Sparkles, Banknote, ShieldCheck, Check, Copy, Flame, BadgePercent, Truck, Award } from 'lucide-react';

interface ProductCardAdBadgesProps {
  className?: string;
  showCod?: boolean;
  showQualityBadge?: boolean;
  isSponsored?: boolean;
}

export const ProductCardAdBadges: React.FC<ProductCardAdBadgesProps> = ({
  className = '',
  showCod = true,
  showQualityBadge = true,
  isSponsored = true
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {isSponsored && (
        <span className="bg-amber-400 text-neutral-950 text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
          <Sparkles className="w-2.5 h-2.5" /> AD
        </span>
      )}
      {showCod && (
        <span className="bg-emerald-600 text-white text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
          <Banknote className="w-2.5 h-2.5" /> COD
        </span>
      )}
      {showQualityBadge && (
        <span className="bg-blue-600 text-white text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
          <Award className="w-2.5 h-2.5" /> TOP QUALITY
        </span>
      )}
    </div>
  );
};

interface ProductDetailAdBannerProps {
  productTitle: string;
  price: number;
}

export const ProductDetailAdBanner: React.FC<ProductDetailAdBannerProps> = ({ productTitle, price }) => {
  const [copied, setCopied] = useState(false);
  const promoCode = 'ZAPIN500';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-amber-500/30 rounded-2xl p-5 text-white shadow-xl space-y-4 font-sans">
      {/* Top Ad Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div className="flex items-center gap-2">
          <span className="bg-amber-400 text-neutral-950 text-[10px] font-mono font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
            <Flame className="w-3 h-3 text-red-600 fill-red-600 animate-pulse" /> SPONSORED PRODUCT AD
          </span>
          <span className="text-[11px] font-mono text-amber-300 font-semibold">
            VERIFIED GOOD QUALITY
          </span>
        </div>
        <span className="text-[10px] font-mono text-neutral-400">
          Ad ID: #ZAP-{Math.floor(1000 + Math.random() * 9000)}
        </span>
      </div>

      {/* Main Ad Offer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="space-y-1.5">
          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Genuine & Quality Inspected Product
          </h4>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Order <strong className="text-amber-200">{productTitle}</strong> with complete confidence. Tested for premium finish, colorfastness, and durable fabric structure.
          </p>
        </div>

        {/* COD & Promo Box */}
        <div className="bg-neutral-900/90 border border-neutral-700/80 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Banknote className="w-4 h-4 text-emerald-400" /> Cash on Delivery (COD) Available
            </span>
            <span className="text-neutral-400 text-[10px]">No advance payment</span>
          </div>

          <div className="flex items-center justify-between bg-black/60 p-2 rounded-lg border border-neutral-800">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <BadgePercent className="w-4 h-4 text-amber-400" />
              <span className="text-neutral-300">Code:</span>
              <strong className="text-amber-300 font-extrabold">{promoCode}</strong>
            </div>
            <button
              onClick={handleCopy}
              className="bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold px-2.5 py-1 rounded text-[10px] font-mono flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'COPIED' : 'COPY COUPON'}
            </button>
          </div>
        </div>
      </div>

      {/* Feature Bullet Points */}
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono text-neutral-300 pt-1 border-t border-neutral-800 text-center">
        <div className="flex items-center justify-center gap-1 bg-neutral-900/50 p-1.5 rounded">
          <Banknote className="w-3 h-3 text-emerald-400" /> Pay Cash at Door (COD)
        </div>
        <div className="flex items-center justify-center gap-1 bg-neutral-900/50 p-1.5 rounded">
          <Truck className="w-3 h-3 text-blue-400" /> Fast Express Shipping
        </div>
        <div className="flex items-center justify-center gap-1 bg-neutral-900/50 p-1.5 rounded">
          <ShieldCheck className="w-3 h-3 text-amber-400" /> Good Product Guarantee
        </div>
      </div>
    </div>
  );
};
