import React, { useState } from 'react';
import { X, Globe, Copy, Check, FileCode, Search, Code, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const { products } = useStore();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'xml' | 'jsonld' | 'pages'>('xml');

  if (!isOpen) return null;

  const baseUrl = window.location.origin;

  const pages = [
    { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily', title: 'Home — Zapin Seoul' },
    { loc: `${baseUrl}/?page=shop`, priority: '0.9', changefreq: 'daily', title: 'Shop All Catalog' },
    { loc: `${baseUrl}/?page=men`, priority: '0.8', changefreq: 'weekly', title: "Men's Apparel" },
    { loc: `${baseUrl}/?page=women`, priority: '0.8', changefreq: 'weekly', title: "Women's Collection" },
    { loc: `${baseUrl}/?page=new-arrivals`, priority: '0.8', changefreq: 'daily', title: 'New Arrivals & Drops' },
    { loc: `${baseUrl}/?page=about`, priority: '0.5', changefreq: 'monthly', title: 'About Zapin Atelier' },
    { loc: `${baseUrl}/?page=contact`, priority: '0.5', changefreq: 'monthly', title: 'Contact Support' },
    { loc: `${baseUrl}/?page=order-tracking`, priority: '0.6', changefreq: 'weekly', title: 'Order Tracker' },
    ...products.map((p) => ({
      loc: `${baseUrl}/?product=${p.id}`,
      priority: '0.8',
      changefreq: 'weekly',
      title: p.title
    }))
  ];

  const xmlSitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages
  .map(
    (p) => `  <url>
    <loc>${p.loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const jsonLdSample = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "Zapin",
    "url": baseUrl,
    "description": "Premium Korean Fashion & High-Street Apparel Store",
    "telephone": "+82-2-555-0199",
    "currenciesAccepted": "INR, USD, KRW",
    "paymentAccepted": "Credit Card, UPI, NetBanking, COD"
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlSitemapContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-mono uppercase font-bold tracking-widest text-white">
                Zapin SEO & XML Sitemap Engine
              </h2>
              <p className="text-[11px] text-neutral-400 font-mono">
                Full Search Engine Indexing & Schema.org Structured Data
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-neutral-800 bg-neutral-950 px-4 pt-3 gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab('xml')}
            className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'xml'
                ? 'border-emerald-400 text-emerald-400 bg-neutral-900/60 rounded-t'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" /> sitemap.xml
          </button>

          <button
            onClick={() => setActiveTab('jsonld')}
            className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'jsonld'
                ? 'border-emerald-400 text-emerald-400 bg-neutral-900/60 rounded-t'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" /> Schema.org JSON-LD
          </button>

          <button
            onClick={() => setActiveTab('pages')}
            className={`px-4 py-2 border-b-2 font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'pages'
                ? 'border-emerald-400 text-emerald-400 bg-neutral-900/60 rounded-t'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" /> Indexed URLs ({pages.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 font-mono text-xs">
          {activeTab === 'xml' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center bg-neutral-950 p-3 rounded border border-neutral-800">
                <span className="text-neutral-400 text-[11px]">
                  Google Search Console & Bing Webmaster Sitemap Format
                </span>
                <button
                  onClick={handleCopy}
                  className="bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 px-3 py-1.5 rounded border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied XML' : 'Copy Sitemap XML'}
                </button>
              </div>
              <pre className="p-4 bg-black rounded-lg border border-neutral-800 text-emerald-400 text-[11px] overflow-x-auto leading-relaxed max-h-[350px]">
                {xmlSitemapContent}
              </pre>
            </div>
          )}

          {activeTab === 'jsonld' && (
            <div className="space-y-3">
              <div className="bg-neutral-950 p-3 rounded border border-neutral-800 text-[11px] text-neutral-300">
                Zapin dynamically injects Google-compliant Rich Snippets (Breadcrumbs, Products, Ratings, Store Info) on every page view.
              </div>
              <pre className="p-4 bg-black rounded-lg border border-neutral-800 text-amber-300 text-[11px] overflow-x-auto leading-relaxed max-h-[350px]">
                {JSON.stringify(jsonLdSample, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'pages' && (
            <div className="space-y-2">
              <div className="text-[11px] text-neutral-400 pb-2">
                All live endpoints currently submitted for search indexing:
              </div>
              <div className="space-y-1.5 max-h-[350px] overflow-y-auto pr-1">
                {pages.map((p, i) => (
                  <div
                    key={i}
                    className="p-2.5 bg-neutral-950 rounded border border-neutral-800 flex justify-between items-center text-[11px]"
                  >
                    <div>
                      <span className="font-bold text-white block">{p.title}</span>
                      <span className="text-neutral-400 break-all">{p.loc}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px] border border-emerald-800">
                        P: {p.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-950 flex justify-between items-center text-[11px] font-mono text-neutral-400">
          <span>Status: <span className="text-emerald-400 font-bold">100% SEO OPTIMIZED</span></span>
          <button
            onClick={onClose}
            className="bg-neutral-800 text-white px-4 py-2 rounded hover:bg-neutral-700 transition-colors uppercase tracking-wider font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
