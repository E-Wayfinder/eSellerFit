/**
 * Marketplace Fit Calculator — Data Layer
 * PROTECTED IP: Questions, platforms, weights, all methodology preserved
 */

window.MARKETPLACE_FIT_DATA = {
  id: 'marketplace-fit',
  title: 'Marketplace Fit Calculator',
  description: 'Understand which platform aligns with your business',
  totalQuestions: 12,
  answerPrefix: 'mf_',

  // 3-Layer Framework: Customer Fit (Q1-4), Operational Fit (Q5-8), Financial Fit (Q9-12)
  questions: [
    // LAYER 1: CUSTOMER FIT (Q1-Q4)
    {
      id: 'Q1',
      text: 'Where does your ideal customer primarily shop for products like yours?',
      layer: 'cf',
      options: [
        { label: 'Heavily on marketplaces (Amazon, Etsy, Shopify)', value: '8.5' },
        { label: 'Mix of marketplaces and brand websites', value: '5' },
        { label: 'Mostly direct to brand or specialty retailers', value: '2' }
      ]
    },
    {
      id: 'Q2',
      text: 'How price-sensitive is your target customer?',
      layer: 'cf',
      options: [
        { label: 'Very price-sensitive — they compare and buy the cheapest', value: '8.5' },
        { label: 'Moderately price-sensitive — value matters but not dominant', value: '5' },
        { label: 'Price-insensitive — they prioritize brand, quality, uniqueness', value: '2' }
      ]
    },
    {
      id: 'Q3',
      text: 'Is your product category actively trending on social media or search?',
      layer: 'cf',
      options: [
        { label: 'Yes — strong viral/search interest driving discovery', value: '8.5' },
        { label: 'Some — steady interest but not trending', value: '5' },
        { label: 'No — requires active customer outreach to discover', value: '2' }
      ]
    },
    {
      id: 'Q4',
      text: 'How niche is your product compared to commodity alternatives?',
      layer: 'cf',
      options: [
        { label: "Unique/differentiated — solves specific problem others don't", value: '2' },
        { label: 'Somewhat differentiated — better but has competitors', value: '5' },
        { label: 'Commodity — many interchangeable alternatives exist', value: '8.5' }
      ]
    },

    // LAYER 2: OPERATIONAL FIT (Q5-Q8)
    {
      id: 'Q5',
      text: 'How complex is your fulfillment operation?',
      layer: 'of',
      options: [
        { label: 'Simple — single SKU or simple variants, standard shipping', value: '2' },
        { label: 'Moderate — multiple SKUs, some customization, standard shipping', value: '5' },
        { label: 'Complex — many SKUs, customization, custom packaging, returns', value: '8.5' }
      ]
    },
    {
      id: 'Q6',
      text: 'How much customer support/communication does your product require?',
      layer: 'of',
      options: [
        { label: 'Minimal — self-explanatory product, few questions', value: '2' },
        { label: 'Moderate — some guidance needed, standard inquiries', value: '5' },
        { label: 'High — requires education, customization discussions, hand-holding', value: '8.5' }
      ]
    },
    {
      id: 'Q7',
      text: 'How important is brand storytelling and community for your product?',
      layer: 'of',
      options: [
        { label: 'Not important — product speaks for itself', value: '2' },
        { label: 'Somewhat important — helps differentiate', value: '5' },
        { label: 'Critical — brand story and community are core to value prop', value: '8.5' }
      ]
    },
    {
      id: 'Q8',
      text: 'What is your product return/quality issue rate expected to be?',
      layer: 'of',
      options: [
        { label: 'Low (0-2%) — high quality, simple product, easy satisfaction', value: '2' },
        { label: 'Moderate (2-5%) — standard return rate for category', value: '5' },
        { label: 'High (5%+) — complexity, new product, known pain points', value: '8.5' }
      ]
    },

    // LAYER 3: FINANCIAL FIT (Q9-Q12)
    {
      id: 'Q9',
      text: 'What is your product\'s gross margin (revenue minus COGS)?',
      layer: 'ff',
      options: [
        { label: '60%+ — high margin, can absorb fees', value: '2' },
        { label: '40-60% — moderate margin, fees are material', value: '5' },
        { label: 'Below 40% — low margin, fees are prohibitive', value: '8.5' }
      ]
    },
    {
      id: 'Q10',
      text: 'What is your expected customer acquisition cost (CAC) budget?',
      layer: 'ff',
      options: [
        { label: 'High budget (20%+ of first order value) — can invest in ads', value: '2' },
        { label: 'Moderate budget (10-20%) — selective paid spend', value: '5' },
        { label: 'Low/no budget — organic discovery only', value: '8.5' }
      ]
    },
    {
      id: 'Q11',
      text: 'How much working capital can you allocate to inventory?',
      layer: 'ff',
      options: [
        { label: 'Significant ($10k+) — can pre-stock inventory', value: '2' },
        { label: 'Moderate ($5-10k) — can stock but not deeply', value: '5' },
        { label: 'Minimal (under $5k) — need just-in-time or drop-ship', value: '8.5' }
      ]
    },
    {
      id: 'Q12',
      text: 'How many sales per month do you realistically expect in year 1?',
      layer: 'ff',
      options: [
        { label: '500+ sales/month — scale justifies platform investment', value: '2' },
        { label: '100-500 sales/month — moderate scale, fees are meaningful', value: '5' },
        { label: 'Under 100 sales/month — low volume, fees may dominate', value: '8.5' }
      ]
    }
  ],

  // PLATFORMS: Amazon, Shopify, Etsy
  platforms: {
    amazon: {
      name: 'Amazon',
      icon: '📦',
      color: '#FF9900',
      weights: [0.30, 0.40, 0.30],
      flags: [
        { label: 'High volume', hex: '#FF9900' },
        { label: 'Commodity-friendly', hex: '#FF9900' },
        { label: 'FBA available', hex: '#FF9900' }
      ]
    },
    shopify: {
      name: 'Shopify',
      icon: '🛍️',
      color: '#96BE3D',
      weights: [0.45, 0.20, 0.35],
      flags: [
        { label: 'Brand building', hex: '#96BE3D' },
        { label: 'Full control', hex: '#96BE3D' },
        { label: 'Monthly fees', hex: '#96BE3D' }
      ]
    },
    etsy: {
      name: 'Etsy',
      icon: '🎨',
      color: '#F1641E',
      weights: [0.50, 0.20, 0.30],
      flags: [
        { label: 'Niche buyers', hex: '#F1641E' },
        { label: 'Handmade friendly', hex: '#F1641E' },
        { label: 'Built-in audience', hex: '#F1641E' }
      ]
    }
  },

  // LAYER METADATA
  layerMeta: {
    cf: { name: 'Customer Fit', hex: '#3a72b0', label: 'Does your buyer exist & buy here?' },
    of: { name: 'Operational Fit', hex: '#b8620a', label: 'Can you operationally handle this platform?' },
    ff: { name: 'Financial Fit', hex: '#2a6a3a', label: 'Can you afford the fees & advertising?' }
  }
};
