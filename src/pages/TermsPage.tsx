import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 text-neutral-800 font-sans text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-neutral-200 pb-4">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">ZAPIN POLICIES</span>
        <h1 className="text-3xl font-light font-serif uppercase tracking-tight text-neutral-950 mt-1">
          Terms & Conditions
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-1">Last updated: July 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">1. Acceptance of Terms</h2>
        <p>
          By accessing and purchasing from the Zapin digital store, you agree to comply with our commercial terms, Korean sizing guidelines, and return policies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">2. Order Acceptance & Pricing</h2>
        <p>
          All product listings are subject to real-time stock availability. Zapin reserves the right to cancel orders in case of pricing errors or fraudulent transaction detection.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">3. Intellectual Property</h2>
        <p>
          All typography, lookbooks, photography, brand logos, and garment designs are the exclusive property of Zapin Studio Inc.
        </p>
      </section>
    </div>
  );
};
