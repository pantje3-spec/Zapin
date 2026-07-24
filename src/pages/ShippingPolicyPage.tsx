import React from 'react';

export const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 text-neutral-800 font-sans text-xs sm:text-sm leading-relaxed">
      <div className="border-b border-neutral-200 pb-4">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">ZAPIN POLICIES</span>
        <h1 className="text-3xl font-light font-serif uppercase tracking-tight text-neutral-950 mt-1">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-1">Express Courier Worldwide</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">1. Complimentary Shipping</h2>
        <p>
          Complimentary express courier shipping is applied automatically to all orders over ₹3,000. For orders below ₹3,000, a flat nominal delivery fee of ₹150 applies.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">2. Delivery Timelines</h2>
        <p>
          Domestic Express Orders: 3-5 Business Days.
          International Air Courier: 5-7 Business Days with end-to-end live tracking.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-mono font-bold uppercase text-neutral-950">3. Cash on Delivery (COD)</h2>
        <p>
          COD is available across 25,000+ pin codes in India. Please ensure exact cash payment upon doorstep courier verification.
        </p>
      </section>
    </div>
  );
};
