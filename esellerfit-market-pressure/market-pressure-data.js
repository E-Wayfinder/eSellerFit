/**
 * Market Pressure Scanner - Data & Configuration
 * ORIGINAL METHODOLOGY - DO NOT MODIFY WITHOUT EXPLICIT APPROVAL
 * 
 * This contains all questions, scoring bands, and result interpretation
 * from the approved eSellerFit Market Cross-Pressure Framework
 */

window.MARKET_PRESSURE_DATA = {
  id: 'market-pressure',
  title: 'Market Pressure Scanner',
  description: 'Assess competitive pressure in your product category',
  answerPrefix: 'mp_q',
  totalQuestions: 12,

  // Scoring bands - ORIGINAL
  bands: {
    low: 2,
    mid: 5,
    high: 8.5
  },

  // Dimensions - ORIGINAL
  dimensions: {
    d: {
      name: 'Demand',
      tag: 'Demand Pressure',
      description: 'Buyer interest and search intent in your category'
    },
    s: {
      name: 'Supply',
      tag: 'Supply Pressure',
      description: 'Seller density and differentiation availability'
    },
    a: {
      name: 'Advertising',
      tag: 'Advertising Pressure',
      description: 'Cost and competition of paid visibility'
    },
    m: {
      name: 'Margin',
      tag: 'Margin Corridor',
      description: 'Room between price ceiling and cost floor'
    }
  },

  // Questions - ORIGINAL WORDING, ORDER, and LOGIC
  questions: [
    // DEMAND PRESSURE - 3 questions
    {
      id: 'D1',
      dimension: 'd',
      text: 'Monthly search volume for this product category (use Google Trends or Amazon search estimates)',
      nudge: "Not sure? Most sellers aren't — this is exactly what the Entry Strategy verifies with real Helium 10 data.",
      options: [
        {
          value: 'a',
          label: 'Under 10,000 searches/month',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: '10,000 – 100,000 searches/month',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Over 100,000 searches/month',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'D2',
      dimension: 'd',
      text: 'Trend direction — is demand for this category growing, stable, or declining over the past 12 months?',
      nudge: 'Not sure? Check Google Trends for your main keyword — or your best guess is fine. Your Entry Strategy verifies this with real data.',
      options: [
        {
          value: 'a',
          label: 'Declining — search and interest are dropping',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: 'Stable / flat — consistent but not growing',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Growing — clear upward trajectory',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'D3',
      dimension: 'd',
      text: 'Buyer intent quality — when people search for this category, are searches mostly informational or transactional?',
      nudge: "Not sure? Go with your gut. Intent analysis is one of the hardest signals to assess without data — it's a key part of what we verify.",
      options: [
        {
          value: 'a',
          label: 'Mostly informational ("what is", "how to use")',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: 'Mixed — both research and buying intent',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Mostly transactional ("buy", "best price", "where to get")',
          band: 'high',
          score: 8.5
        }
      ]
    },

    // SUPPLY PRESSURE - 3 questions
    {
      id: 'S1',
      dimension: 's',
      text: 'How many competing product listings exist in your primary marketplace for this category?',
      options: [
        {
          value: 'a',
          label: 'Under 500 results',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: '500 – 5,000 results',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Over 5,000 results',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'S2',
      dimension: 's',
      text: 'How fragmented is the seller landscape? (Many small sellers = high fragmentation = more noise)',
      options: [
        {
          value: 'a',
          label: '1–2 dominant brands own most of the market',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: 'A handful of established brands with some smaller sellers',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Many small sellers — no clear dominant player',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'S3',
      dimension: 's',
      text: 'Is there visible differentiation opportunity — unmet buyer needs, poor reviews, product gaps?',
      options: [
        {
          value: 'a',
          label: 'Clear white space — obvious unmet needs or gaps',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: 'Some gaps visible — requires deeper analysis',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Fully saturated — products are largely homogeneous',
          band: 'high',
          score: 8.5
        }
      ]
    },

    // ADVERTISING PRESSURE - 3 questions
    {
      id: 'A1',
      dimension: 'a',
      text: 'Estimated cost-per-click (CPC) for paid ads in this category (check Amazon suggested bids or Google Keyword Planner)',
      nudge: "Don't have this number? Most sellers don't. Make your best guess — CPC is one of the most important signals we verify with real data.",
      options: [
        {
          value: 'a',
          label: 'Under $0.50 per click',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: '$0.50 – $1.50 per click',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Over $1.50 per click',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'A2',
      dimension: 'a',
      text: 'What percentage of page 1 results on your primary marketplace are sponsored / paid listings?',
      nudge: 'Go check right now if you can — search your main keyword and count the "Sponsored" labels on page 1. If not, estimate.',
      options: [
        {
          value: 'a',
          label: 'Under 20% — mostly organic results',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: '20–50% — mixed organic and sponsored',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Over 50% — page 1 is dominated by ads',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'A3',
      dimension: 'a',
      text: 'Can a new seller realistically achieve organic search ranking within 3–6 months without heavy ad spend?',
      nudge: 'Hard to know without data. This is one of the most commonly misjudged signals — sellers almost always overestimate organic achievability.',
      options: [
        {
          value: 'a',
          label: 'Yes — organic ranking achievable with good listing quality',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: 'Partial — both organic effort and some paid spend needed',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'No — paid advertising is the only realistic path to visibility',
          band: 'high',
          score: 8.5
        }
      ]
    },

    // MARGIN CORRIDOR - 3 questions
    {
      id: 'M1',
      dimension: 'm',
      text: 'Price spread in your category — what is the range between the highest and lowest price for comparable products?',
      options: [
        {
          value: 'a',
          label: 'Wide spread — top price is 3x or more the lowest price',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: 'Moderate spread — top price is 1.5x to 3x the lowest',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Narrow spread — prices are clustered, race-to-bottom dynamic',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'M2',
      dimension: 'm',
      text: 'Estimated gross margin at typical market price (price minus landed cost / price)',
      options: [
        {
          value: 'a',
          label: 'Over 50% gross margin at market price',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: '30–50% gross margin at market price',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Under 30% gross margin at market price',
          band: 'high',
          score: 8.5
        }
      ]
    },
    {
      id: 'M3',
      dimension: 'm',
      text: 'Combined fee burden — platform fees, fulfillment, and estimated ad spend as % of sale price',
      options: [
        {
          value: 'a',
          label: 'Under 35% of sale price consumed by fees and ads',
          band: 'low',
          score: 2
        },
        {
          value: 'b',
          label: '35–50% of sale price consumed by fees and ads',
          band: 'mid',
          score: 5
        },
        {
          value: 'c',
          label: 'Over 50% of sale price consumed by fees and ads',
          band: 'high',
          score: 8.5
        }
      ]
    }
  ]
};
