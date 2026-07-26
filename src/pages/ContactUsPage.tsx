import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { SEO } from '../components/SEO';
import { AdNetworkBanner } from '../components/AdNetworkBanner';

export const ContactUsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <SEO
        title="Contact Us & Client Concierge | Zapin"
        description="Contact Zapin's client service team for sizing assistance, order support, and atelier inquiries."
        keywords="Contact Zapin, Zapin support, Zapin customer care, Zapin email"
      />
      {/* Top Banner Ad */}
      <AdNetworkBanner position="header" />

      <div className="text-center space-y-2">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
          CLIENT CONCIERGE
        </span>
        <h1 className="text-3xl font-light font-serif uppercase tracking-tight text-neutral-950">
          Get in Touch with Zapin
        </h1>
        <p className="text-xs text-neutral-500 font-mono">
          Have questions about sizing, drops, or order status? Our client service team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Info & Locations */}
        <div className="space-y-6 font-mono text-xs">
          <div className="p-6 bg-neutral-950 text-white rounded-lg space-y-4 shadow-xl">
            <h3 className="font-bold uppercase tracking-widest border-b border-neutral-800 pb-2">
              Seoul Flagship Atelier
            </h3>
            <p className="text-neutral-300 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
              14 Seongsu-yi-ro 20-gil, Seongdong-gu, Seoul, South Korea
            </p>
            <p className="text-neutral-300 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-300 shrink-0" />
              concierge@zapin.com
            </p>
            <p className="text-neutral-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-300 shrink-0" />
              +82 2 1234 5678 (Mon - Sat 10:00 - 19:00 KST)
            </p>
          </div>

          <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-lg space-y-2">
            <h4 className="font-bold uppercase text-neutral-900">India Customer Support</h4>
            <p className="text-neutral-600">Express Delivery & Local Returns Desk: Mumbai / New Delhi</p>
            <p className="text-neutral-600">WhatsApp Hotline: +82 10 1234 5678</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-sm space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-900">
            Send an Online Inquiry
          </h3>

          {sent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono rounded flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              Message transmitted successfully! Our client concierge will respond within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-600 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="client@gmail.com"
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="block text-neutral-600 mb-1">Message / Order Inquiry *</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Inquire about size recommendation or custom order status..."
                  className="w-full bg-neutral-50 border border-neutral-300 px-3.5 py-2.5 rounded focus:outline-none focus:border-black font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-950 text-white py-3.5 text-xs font-mono font-bold tracking-widest uppercase rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Transmit Message
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer Publisher Ad Unit */}
      <AdNetworkBanner position="footer" className="mt-8" />
    </div>
  );
};
