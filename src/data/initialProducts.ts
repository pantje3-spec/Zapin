import { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: 'prod-001',
    title: 'Seoul Pink Vertical Stripe Relaxed Seersucker Shirt',
    slug: 'seoul-pink-vertical-stripe-relaxed-seersucker-shirt',
    category: 'men',
    price: 599,
    compareAtPrice: 999,
    description: 'Lightweight pink vertical stripe relaxed long-sleeve linen shirt. Crafted from airy cotton-linen seersucker for effortless summer styling. Features loose cuffs, casual spread collar, and chest pocket.',
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 28,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pink Stripe', hex: '#F472B6' },
      { name: 'Navy Blue', hex: '#1E3A8A' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aarav Sharma',
        rating: 5,
        comment: 'Amazing fabric! Extremely light and comfortable for warm weather.',
        date: '2026-07-20',
        verifiedBuyer: true
      }
    ]
  },
  {
    id: 'prod-002',
    title: 'Oversized Beige Resort Linen Camp Collar Shirt',
    slug: 'oversized-beige-resort-linen-camp-collar-shirt',
    category: 'men',
    price: 499,
    compareAtPrice: 899,
    description: 'Breathable sand beige short-sleeve resort collar shirt with loose boxy cut. Designed with drop shoulders and real mother-of-pearl buttons. Ideal paired with matching linen shorts.',
    images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 34,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Sand Beige', hex: '#E5D3B3' },
      { name: 'Off White', hex: '#FAF9F6' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-003',
    title: 'Olive Green Floral Stamp Relaxed Linen Button-Down',
    slug: 'olive-green-floral-stamp-relaxed-linen-button-down',
    category: 'men',
    price: 699,
    compareAtPrice: 1199,
    description: 'Earthy olive green long-sleeve shirt featuring subtle geometric floral stamp motifs throughout. Cut for a fluid, relaxed fit over tank tops or worn solo.',
    images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 22,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Olive Green', hex: '#556B2F' }
    ],
    tags: ['new'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-004',
    title: 'Slate Chambray Utility Shirt & Linen Trousers',
    slug: 'slate-chambray-utility-shirt-linen-trousers',
    category: 'men',
    price: 799,
    compareAtPrice: 1299,
    description: 'Dark slate grey chambray long-sleeve overshirt with soft brushed finish. Layered design with chest pocket and contrast button stitching.',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 19,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Slate Grey', hex: '#4A5568' }
    ],
    tags: ['featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-005',
    title: 'Butter Yellow Relaxed Poplin Shirt',
    slug: 'butter-yellow-relaxed-poplin-shirt',
    category: 'men',
    price: 399,
    compareAtPrice: 699,
    description: 'Soft pastel yellow relaxed long-sleeve poplin shirt crafted from 100% long-staple organic cotton. Crisp collar and relaxed tailored hem.',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 40,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Pastel Yellow', hex: '#FEF08A' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-006',
    title: 'Jet Black Pure Linen Relaxed Button-Down',
    slug: 'jet-black-pure-linen-relaxed-button-down',
    category: 'men',
    price: 899,
    compareAtPrice: 1499,
    description: 'Classic jet black pure linen shirt with natural garment wash texture. Breathable, durable, and styled for effortless minimal street tailoring.',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Jet Black', hex: '#111827' }
    ],
    tags: ['bestseller'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-007',
    title: 'Contrast Navy Collar Ribbed Knit Polo',
    slug: 'contrast-navy-collar-ribbed-knit-polo',
    category: 'men',
    price: 299,
    compareAtPrice: 499,
    description: 'Off-white fine ribbed knit short-sleeve polo shirt featuring a contrast navy ribbed collar and sleeve cuffs. Retro sporty elegance.',
    images: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 30,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Off-White / Navy', hex: '#F3F4F6' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-008',
    title: 'Tan Vertical Stripe Linen Shirt',
    slug: 'tan-vertical-stripe-linen-shirt',
    category: 'men',
    price: 649,
    compareAtPrice: 999,
    description: 'Warm tan & beige vertical stripe long-sleeve linen shirt with roll-up sleeve tab details and single spade chest pocket.',
    images: ['https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 21,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Tan Stripe', hex: '#D97706' }
    ],
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-009',
    title: 'Minimalist Heavyweight White Long-Sleeve Tee',
    slug: 'minimalist-heavyweight-white-long-sleeve-tee',
    category: 'men',
    price: 199,
    compareAtPrice: 399,
    description: 'Ultra-clean premium 240 GSM heavy cotton long-sleeve crewneck tee in crisp white. Seamless sides and ribbed neck line.',
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 50,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    tags: ['bestseller', 'new'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-010',
    title: 'Sky Blue Striped Pocket Utility Shirt',
    slug: 'sky-blue-striped-pocket-utility-shirt',
    category: 'men',
    price: 549,
    compareAtPrice: 899,
    description: 'Sky blue and white Bengal stripe long-sleeve shirt with dual flap chest pockets. Tailored cut with curved shirt tail hem.',
    images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 18,
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Sky Blue Stripe', hex: '#3B82F6' }
    ],
    tags: ['new'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-011',
    title: 'Espresso Brown Textured Linen Shirt',
    slug: 'espresso-brown-textured-linen-shirt',
    category: 'men',
    price: 999,
    compareAtPrice: 1599,
    description: 'Rich espresso dark brown long-sleeve textured linen shirt. Crafted with slub yarn weave for distinct luxury hand-feel.',
    images: ['https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 15,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Brown', hex: '#44281D' }
    ],
    tags: ['featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-012',
    title: 'Asymmetric Draped White Top with Shoulder Scarf',
    slug: 'asymmetric-draped-white-top-with-shoulder-scarf',
    category: 'women',
    price: 449,
    compareAtPrice: 799,
    description: 'Modern architectural white short-sleeve tee featuring a diagonal asymmetric hem and a contrast navy shoulder drape scarf.',
    images: ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 26,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'White / Navy', hex: '#FFFFFF' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-013',
    title: 'Butter Cream Asymmetric Drape Tee',
    slug: 'butter-cream-asymmetric-drape-tee',
    category: 'women',
    price: 349,
    compareAtPrice: 599,
    description: 'Soft butter yellow relaxed short-sleeve top featuring an elegant slant asymmetric hemline and dropped shoulder seam.',
    images: ['https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 32,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Butter Cream', hex: '#FEF08A' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-014',
    title: 'Ivory Ribbed Button Henley Short-Sleeve Top',
    slug: 'ivory-ribbed-button-henley-short-sleeve-top',
    category: 'women',
    price: 299,
    compareAtPrice: 499,
    description: 'Sculptural ivory off-white fine ribbed henley top with a partial button placket, high jewel neckline, and tailored cuffs.',
    images: ['https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 35,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Off-White', hex: '#FAF9F6' }
    ],
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-015',
    title: 'Chartreuse Lime Oversized Split Collar Polo Tunic',
    slug: 'chartreuse-lime-oversized-split-collar-polo-tunic',
    category: 'women',
    price: 599,
    compareAtPrice: 999,
    description: 'Vibrant chartreuse lime green oversized polo tunic shirt featuring an open V-cut collar neckline and dual chest patch pockets.',
    images: ['https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 16,
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Chartreuse Lime', hex: '#84CC16' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-016',
    title: 'Pale Sage Cape Sleeve Sculptural Top',
    slug: 'pale-sage-cape-sleeve-sculptural-top',
    category: 'women',
    price: 699,
    compareAtPrice: 1099,
    description: 'Architectural pale ice blue / sage green top with dramatic cascading cape sleeves and a smooth minimal crew neckline.',
    images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 24,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Pale Sage', hex: '#CBD5E1' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-017',
    title: 'Ivory Cream Cape Sleeve Flutter Top',
    slug: 'ivory-cream-cape-sleeve-flutter-top',
    category: 'women',
    price: 749,
    compareAtPrice: 1199,
    description: 'Elegantly draped off-white cream architectural top featuring flowing cape flutter sleeves. Ideal for modern minimal tailoring.',
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 29,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory Cream', hex: '#FFFBEB' }
    ],
    tags: ['featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-018',
    title: 'Midnight Navy Fitted Pleated Waistcoat Vest',
    slug: 'midnight-navy-fitted-pleated-waistcoat-vest',
    category: 'women',
    price: 849,
    compareAtPrice: 1299,
    description: 'Sleek dark navy blue button-front fitted suit vest with vertical structural waist darts and a flared peplum hemline.',
    images: ['https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 20,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight Navy', hex: '#0F172A' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-019',
    title: 'Butter Cream Tailored Peplum Waistcoat Vest',
    slug: 'butter-cream-tailored-peplum-waistcoat-vest',
    category: 'women',
    price: 799,
    compareAtPrice: 1299,
    description: 'Soft butter yellow / cream tailored sleeveless suit vest with button placket, tailored seams, and flared waist silhouette.',
    images: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 18,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Butter Cream', hex: '#FEF3C7' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  },
  {
    id: 'prod-020',
    title: 'Crisp White Tailored Peplum Waistcoat Vest',
    slug: 'crisp-white-tailored-peplum-waistcoat-vest',
    category: 'women',
    price: 899,
    compareAtPrice: 1399,
    description: 'Monochrome crisp white fitted suit vest with tone-on-tone buttons, sharp vertical seam paneling, and peplum flare waist line.',
    images: ['https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800&auto=format&fit=crop'],
    stockQuantity: 27,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    tags: ['new', 'featured'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    reviews: []
  }
];
