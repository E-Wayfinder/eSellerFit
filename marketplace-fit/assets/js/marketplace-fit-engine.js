/**
 * Marketplace Fit Calculator — Engine Layer
 * PROTECTED IP: Scoring logic, classification, interpretation
 */

window.MARKETPLACE_FIT_ENGINE = {
  // Calculate layer scores
  calculate(answers, data) {
    // Initialize layer scores
    const layerScores = { cf: 0, of: 0, ff: 0 };
    const layerCounts = { cf: 0, of: 0, ff: 0 };

    // Sum scores by layer
    Object.entries(answers).forEach(([key, value]) => {
      const qIdx = parseInt(key.replace(data.answerPrefix, '')) - 1;
      const question = data.questions[qIdx];
      if (question) {
        const layer = question.layer;
        layerScores[layer] += parseFloat(value);
        layerCounts[layer]++;
      }
    });

    // Average by layer
    const cf = layerScores.cf / layerCounts.cf;
    const of = layerScores.of / layerCounts.of;
    const ff = layerScores.ff / layerCounts.ff;

    // Calculate platform scores
    const platformScores = this.calculatePlatformScores(cf, of, ff, data);

    // Determine top platform
    const topPlatform = Object.entries(platformScores).sort((a, b) => b[1] - a[1])[0][0];

    return {
      layerScores: { cf, of, ff },
      platformScores,
      topPlatform
    };
  },

  // Calculate per-platform scores using weights
  calculatePlatformScores(cf, of, ff, data) {
    const scores = {};
    
    Object.entries(data.platforms).forEach(([key, platform]) => {
      const [wcf, wof, wff] = platform.weights;
      scores[key] = (cf * wcf) + (of * wof) + (ff * wff);
    });

    return scores;
  },

  // Get insight for each layer
  getLayerInsight(layer, score) {
    const insights = {
      cf: {
        low: 'Your customers are not marketplace-native — you may need direct marketing.',
        mid: 'Your customers have moderate marketplace presence — viable with effort.',
        high: 'Your customers actively shop on marketplaces — strong fit.'
      },
      of: {
        low: 'You have significant operational complexity — marketplaces may not be ideal yet.',
        mid: 'Your operations are manageable — marketplaces can work with standard tooling.',
        high: 'Your operations are marketplace-friendly — easy to integrate and scale.'
      },
      ff: {
        low: 'Your margins may struggle with platform fees — focus on volume or premium positioning.',
        mid: 'Platform fees are manageable but meaningful — optimize unit economics.',
        high: 'Your margins support platform fees easily — financial fit is strong.'
      }
    };

    if (score >= 7) return insights[layer].high;
    if (score >= 4) return insights[layer].mid;
    return insights[layer].low;
  },

  // Platform-specific explanation
  getPlatformExplanation(platform, layerScores, data) {
    const explanations = {
      amazon: 'Strongest when: high volume, commodity/price-sensitive, simple ops, high margins',
      shopify: 'Strongest when: brand story matters, you can drive your own traffic, willing to invest',
      etsy: 'Strongest when: niche product, handmade/artisan appeal, community-driven, lower CAC'
    };
    return explanations[platform] || '';
  }
};
