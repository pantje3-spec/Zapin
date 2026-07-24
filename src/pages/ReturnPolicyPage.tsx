import React from 'react';

export const ReturnPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 text-neutral-800 font-sans text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-neutral-200 pb-4">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">ZAPIN POLICIES</span>
        <h1 className="text-3xl font-light font-serif uppercase tracking-tight text-neutral-950 mt-1">
          14-Day Return & Refund Policy
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-1">Hassle-Free Size Exchanges</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">1. Return Window</h2>
        <p>
          We offer a 14-day return and size exchange window from the date of doorstep package delivery. Garments must be unworn, unwashed, with original Zapin tags attached.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">2. How to Request an Exchange</h2>
        <p>
          Initiate an exchange via your Account Dashboard or by contacting our client desk at concierge@zapin.com. Our doorstep courier will pick up the item within 48 hours.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">3. Refund Processing</h2>
        <p>
          Refunds are credited back to your original payment account (or store credit for COD orders) within 5-7 business days following quality inspection at our warehouse.
        </p>
      </section>
    </div>
  );
};
