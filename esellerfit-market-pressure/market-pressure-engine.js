/**
 * Market Pressure Scoring Engine
 * ORIGINAL METHODOLOGY - DO NOT MODIFY WITHOUT EXPLICIT APPROVAL
 * 
 * Implements the Market Cross-Pressure Framework:
 * - Demand Pressure (D)
 * - Supply Pressure (S)  
 * - Advertising Pressure (A)
 * - Margin Corridor (M)
 */

window.MARKET_PRESSURE_ENGINE = {
  /**
   * Calculate final pressure scores from user answers
   * @param {Object} answers - User's selected answers (name -> value)
   * @param {Object} data - Calculator configuration with questions
   * @returns {Object} { d, s, a, m, index, ocean, dominant }
   */
  calculate(answers, data) {
    // Initialize force accumulators
    const forces = { d: [], s: [], a: [], m: [] };

    // Aggregate scores by dimension
    data.questions.forEach((q, index) => {
      const answerName = `${data.answerPrefix}${index + 1}`;
      const selectedValue = answers[answerName];

      if (selectedValue) {
        const selectedOption = q.options.find(opt => opt.value === selectedValue);
        if (selectedOption) {
          forces[q.dimension].push(selectedOption.score);
        }
      }
    });

    // Calculate average for each force
    const result = {};
    Object.entries(forces).forEach(([force, scores]) => {
      if (scores.length > 0) {
        const sum = scores.reduce((a, b) => a + b, 0);
        result[force] = parseFloat((sum / scores.length).toFixed(1));
      } else {
        result[force] = 0;
      }
    });

    // Calculate overall pressure index (average of all forces)
    const allScores = Object.values(result);
    const indexSum = allScores.reduce((a, b) => a + b, 0);
    result.index = parseFloat((indexSum / allScores.length).toFixed(1));

    // Determine ocean classification based on index
    result.ocean = this.getOceanClass(result.index);

    // Determine dominant force
    result.dominant = this.getDominantForce(result);

    return result;
  },

  /**
   * Classify market into Blue/Amber/Red Ocean based on pressure index
   * ORIGINAL THRESHOLDS
   */
  getOceanClass(index) {
    if (index <= 3.0) return 'blue';
    if (index <= 6.9) return 'amber';
    return 'red';
  },

  /**
   * Identify which force is highest (dominant)
   * This drives the strategy recommendation
   */
  getDominantForce(scores) {
    let maxForce = null;
    let maxValue = -1;

    ['d', 's', 'a', 'm'].forEach(force => {
      if (scores[force] > maxValue) {
        maxValue = scores[force];
        maxForce = force;
      }
    });

    return maxForce;
  },

  /**
   * Get ocean interpretation and guidance
   * ORIGINAL COPY - DO NOT MODIFY
   */
  getOceanCopy(ocean) {
    const copy = {
      blue: {
        label: 'Blue Ocean',
        body: 'Low cross-pressure. Room to enter, differentiate, and price with margin. Your main risk is underestimating the time and capital required to build visibility from scratch in a category that hasn\'t yet been heavily contested. Move with intention — blue oceans don\'t stay blue.'
      },
      amber: {
        label: 'Transitional Market',
        body: 'Mixed pressure signals. Entry is viable but requires a clear answer to the dominant force driving your score. The gap between a 4.0 and a 6.5 is significant — at 4.0 you have maneuver room and can recover from early mistakes; at 6.5 the margin for error is thin and capital requirements are higher. Understand which force is highest before committing.'
      },
      red: {
        label: 'Red Ocean',
        body: 'High structural pressure, self-reinforcing. All four forces are active and amplify each other: dense supply raises ad costs, compressed margins force price competition, price competition attracts more sellers. Entry is possible but requires strong differentiation, 12+ months of capital runway, and a specific asymmetric advantage. Your Entry Strategy will address whether your specific profile can navigate this — and what conditions need to be true before committing capital.'
      }
    };

    return copy[ocean] || copy.amber;
  },

  /**
   * Get dominant force interpretation
   * ORIGINAL COPY - DO NOT MODIFY
   */
  getDominantForceCopy(force) {
    const copy = {
      d: {
        title: 'Dominant Force: Demand Pressure',
        what: 'High buyer interest has already attracted — or is actively attracting — competitors. The market is real, but the race to capture it is intensifying. Timing advantage decays quickly in high-demand categories.',
        action: 'Move fast. Speed-to-market matters more than perfection here. Prioritize listing quality and early review velocity over margin optimization in the first 60 days. Consider entering a sub-niche within the same demand pool where competition density is lower — the overall demand signal is your friend, but the mainstream keyword is already crowded.'
      },
      s: {
        title: 'Dominant Force: Supply Pressure',
        what: 'Too many sellers, too many similar products competing for the same buyer. Visibility is structurally hard and differentiation is the only path to sustainable positioning. A me-too product will be invisible from day one.',
        action: 'Do not enter without a clearly defined differentiation angle. The most reliable method: read 3-star reviews of the top 10 competitors — that is your product brief. Buyers are telling you exactly what the market is failing to deliver. Without solving a visible gap, your listing competes on price alone, which is a race you will lose.'
      },
      a: {
        title: 'Dominant Force: Advertising Pressure',
        what: 'The cost of paid visibility in this category is structurally elevated before you have made a single sale. Customer acquisition cost (CAC) is high, and organic ranking takes longer than your capital runway allows. Ad spend is not optional — it is the entry ticket.',
        action: 'Model your unit economics assuming TACoS (Total Advertising Cost of Sale) of 20–35% from day one. If the margin math does not work at that spend level, the category does not work for you at your current capital structure. An alternative path: target long-tail keywords where CPC is lower and organic rank is achievable faster — accept lower volume in exchange for lower acquisition cost while building review history.'
      },
      m: {
        title: 'Dominant Force: Margin Corridor Pressure',
        what: 'The gap between what buyers are willing to pay and what it costs to deliver the product is dangerously thin. Price compression, high fee burden, or both are squeezing every seller in this category. Even a well-run operation struggles to maintain profitability.',
        action: 'Stress-test your unit economics before anything else. If your landed cost plus platform fees plus estimated ad spend exceeds 70% of your sale price, the category requires either premium pricing power (brand equity you don\'t have yet) or volume scale that takes 12–18 months to reach. Consider whether a higher price point variant — better materials, bundled accessories, premium positioning — changes the margin math enough to make the category viable.'
      }
    };

    return copy[force] || {};
  }
};
