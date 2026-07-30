import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappNumber = "+821012345678"; // Representative Zapin Seoul hotline
  const defaultMessage = encodeURIComponent("Hi Zapin Concierge! I have an inquiry about Korean size fit and order details.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-30 bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 group border border-emerald-400/30"
      aria-label="Chat on WhatsApp"
      title="Chat with Zapin Stylist on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-mono tracking-wider ml-0 group-hover:ml-2">
        STYLIST CHAT
      </span>
    </a>
  );
};
