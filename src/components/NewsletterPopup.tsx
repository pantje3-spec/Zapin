import React, { useState, useEffect, useRef } from 'react';
import { Mail, X, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const NewsletterPopup: React.FC = () => {
  const { currentPage } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  const adContainerRef = useRef<HTMLDivElement>(null);

  // Timed delay & scroll depth trigger logic
  useEffect(() => {
    if (currentPage === 'admin') return;

    // Check session dismissal
    const dismissed = sessionStorage.getItem('zapin_newsletter_dismissed');
    if (dismissed) return;

    let triggered = false;

    const triggerPopup = () => {
      if (!triggered) {
        triggered = true;
        setIsOpen(true);
      }
    };

    // 1. Timed Delay Trigger (5 seconds)
    const timer = setTimeout(() => {
      triggerPopup();
    }, 5000);

    // 2. Scroll-Depth Trigger (25% scroll depth)
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const scrolledPercentage = (window.scrollY / scrollHeight) * 100;
        if (scrolledPercentage >= 25) {
          triggerPopup();
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage]);

  // Inject user-requested ad script dynamically when popup is opened
  useEffect(() => {
    if (!isOpen || !adContainerRef.current) return;

    const container = adContainerRef.current;
    container.innerHTML = ''; // clear previous

    const scriptEl = document.createElement('script');
    scriptEl.type = 'text/javascript';
    scriptEl.src = 'https://pl30523299.effectivecpmnetwork.com/0d/e7/24/0de724a8a1397bdac25450cdd9e86a34.js';
    scriptEl.async = true;

    container.appendChild(scriptEl);

    return () => {
      container.innerHTML = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('zapin_newsletter_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitted(true);

    // Save lead to local storage
    try {
      const existingLeads = JSON.parse(localStorage.getItem('zapin_newsletter_leads') || '[]');
      existingLeads.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('zapin_newsletter_leads', JSON.stringify(existingLeads));
    } catch {
      // Ignore storage errors
    }

    sessionStorage.setItem('zapin_newsletter_dismissed', 'true');
  };

  const handleCopyDiscount = () => {
    navigator.clipboard.writeText('WELCOME15');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-neutral-950 text-white rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden font-sans">
        {/* Top Decorative Gradient Line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 rounded-full transition-colors z-10"
          aria-label="Close Newsletter Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {!isSubmitted ? (
            <div>
              {/* Header Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LIMITED TIME VIP ACCESS</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white mb-2">
                Get 15% Off Your First Drop
              </h2>

              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
                Subscribe to the official Zapin VIP Newsletter to receive secret discount codes, instant drop alerts, and partner offers.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your best email address..."
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                    />
                  </div>
                  {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold py-3 px-6 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-amber-400/20"
                >
                  <span>Claim 15% VIP Discount</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-4 pt-4 border-t border-neutral-900">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  No spam. Unsubscribe anytime.
                </span>
                <button
                  onClick={handleClose}
                  className="hover:underline text-neutral-500 hover:text-neutral-300"
                >
                  No thanks, continue shopping
                </button>
              </div>

              {/* Container for User-Provided Ad Network Script */}
              <div className="mt-4 pt-3 border-t border-neutral-900 text-center min-h-[40px] flex items-center justify-center">
                <div ref={adContainerRef} id="zapin-newsletter-ad-slot" className="w-full" />
              </div>
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-serif font-bold text-white">You're On The VIP List!</h3>

              <p className="text-xs text-neutral-300">
                Use your exclusive welcome discount code at checkout for 15% off your entire cart:
              </p>

              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex items-center justify-between gap-2 max-w-xs mx-auto">
                <div className="flex items-center gap-2 font-mono font-bold text-amber-400 text-sm">
                  <Gift className="w-4 h-4" />
                  <span>WELCOME15</span>
                </div>
                <button
                  onClick={handleCopyDiscount}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copiedCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium py-2.5 rounded-xl text-xs transition-colors mt-4"
              >
                Start Shopping Now
              </button>

              {/* Container for User-Provided Ad Network Script in Success View */}
              <div className="mt-4 pt-3 border-t border-neutral-900 min-h-[40px]">
                <div ref={adContainerRef} id="zapin-newsletter-ad-slot-success" className="w-full" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
