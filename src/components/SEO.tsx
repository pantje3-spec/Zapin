import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  productData?: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency?: string;
    availability?: string;
    category?: string;
    ratingValue?: number;
    reviewCount?: number;
    sku?: string;
  };
  breadcrumbItems?: Array<{ name: string; url: string }>;
}

export const SEO: React.FC<SEOProps> = ({
  title = 'Zapin | Premium Korean Fashion & Luxury Apparel',
  description = 'Shop authentic Korean streetwear, oversized blazers, designer wool coats, and Seongsu high-street fashion at Zapin. Express worldwide shipping.',
  keywords = 'Zapin fashion, Korean clothes, oversized blazer, Seoul streetwear, luxury apparel, Korean style outfit, Zapin store',
  canonicalUrl = window.location.href,
  ogImage = 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop',
  ogType = 'website',
  productData,
  breadcrumbItems
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes('Zapin') ? title : `${title} | Zapin Seoul`;
    document.title = formattedTitle;

    // Helper to set meta tag
    const setMeta = (selector: string, content: string) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name=')) {
          const nameMatch = selector.match(/name="([^"]+)"/);
          if (nameMatch) el.setAttribute('name', nameMatch[1]);
        } else if (selector.startsWith('meta[property=')) {
          const propMatch = selector.match(/property="([^"]+)"/);
          if (propMatch) el.setAttribute('property', propMatch[1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to set link tag
    const setLink = (rel: string, href: string) => {
      let el = document.head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Standard Meta Tags
    setMeta('meta[name="description"]', description);
    setMeta('meta[name="keywords"]', keywords);
    setMeta('meta[name="author"]', 'Zapin Seoul Atelier');
    setMeta('meta[name="robots"]', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLink('canonical', canonicalUrl);

    // Open Graph Tags
    setMeta('meta[property="og:title"]', formattedTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:url"]', canonicalUrl);
    setMeta('meta[property="og:site_name"]', 'Zapin');
    setMeta('meta[property="og:locale"]', 'en_US');

    // Twitter Tags
    setMeta('meta[name="twitter:card"]', 'summary_large_image');
    setMeta('meta[name="twitter:site"]', '@zapinstore');
    setMeta('meta[name="twitter:title"]', formattedTitle);
    setMeta('meta[name="twitter:description"]', description);
    setMeta('meta[name="twitter:image"]', ogImage);

    // Dynamic JSON-LD Schema Insertion
    const schemaScriptId = 'zapin-jsonld-schema';
    let scriptEl = document.getElementById(schemaScriptId) as HTMLScriptElement;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaScriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemas: any[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'ClothingStore',
        'name': 'Zapin',
        'url': window.location.origin,
        'logo': 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=600',
        'description': 'Premium Korean Fashion & Luxury Apparel Store Structure',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Seongsu-dong 2-ga',
          'addressLocality': 'Seongdong-gu',
          'addressRegion': 'Seoul',
          'postalCode': '04781',
          'addressCountry': 'KR'
        },
        'priceRange': '₹₹₹',
        'telephone': '+82-2-555-0199'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Zapin',
        'url': window.location.origin,
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${window.location.origin}/?search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      }
    ];

    if (productData) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': productData.name,
        'description': productData.description,
        'image': [productData.image],
        'sku': productData.sku || productData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        'brand': {
          '@type': 'Brand',
          'name': 'Zapin'
        },
        'offers': {
          '@type': 'Offer',
          'price': productData.price,
          'priceCurrency': productData.currency || 'INR',
          'availability': productData.availability || 'https://schema.org/InStock',
          'url': canonicalUrl,
          'seller': {
            '@type': 'Organization',
            'name': 'Zapin'
          }
        },
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': productData.ratingValue || 4.9,
          'reviewCount': productData.reviewCount || 12,
          'bestRating': '5',
          'worstRating': '1'
        }
      });
    }

    if (breadcrumbItems && breadcrumbItems.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems.map((item, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': item.name,
          'item': item.url
        }))
      });
    }

    scriptEl.text = JSON.stringify(schemas, null, 2);

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, productData, breadcrumbItems]);

  return null;
};
