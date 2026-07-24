import React from 'react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 text-neutral-800 font-sans text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-neutral-200 pb-4">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">ZAPIN POLICIES</span>
        <h1 className="text-3xl font-light font-serif uppercase tracking-tight text-neutral-950 mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-1">Last updated: July 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">1. Information We Collect</h2>
        <p>
          Zapin Studio Inc. collects personal details required to process your fashion orders securely. This includes your name, shipping address, contact phone number, email address, and payment preferences.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">2. How We Use Information</h2>
        <p>
          Your information is strictly used for order fulfillment, shipment tracking updates via SMS/Email, processing returns, and delivering exclusive member newsletter passes (if opted in).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">3. Data Security & Encryption</h2>
        <p>
          We employ 256-bit SSL encryption across all transaction workflows. Payment tokens are safely processed via Razorpay without storing raw credit card details on our servers.
        </p>
      </section>
    </div>
  );
};
