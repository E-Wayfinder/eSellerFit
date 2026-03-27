/**
 * Marketplace Fit Calculator — Render Layer
 * OPTION A: Keeps original dark results design (proven elegant presentation)
 * UI/presentation layer only — no methodology changes
 */

window.MARKETPLACE_FIT_RENDER = {
  renderResults(containerId, result, category) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = MARKETPLACE_FIT_DATA;
    const layerScores = result.layerScores;
    const platformScores = result.platformScores;
    const topPlatform = result.topPlatform;

    // Sort platforms by score
    const sorted = Object.entries(platformScores).sort((a, b) => b[1] - a[1]);

    // Build results HTML
    let html = `
      <div style="background: #1a1a22; color: #e8e8f0; padding: 40px 32px; border-radius: 12px; margin-bottom: 40px;">
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; margin-bottom: 12px;">Your Results</div>
          <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #e8e8f0; margin: 0 0 16px 0;">Marketplace Fit Analysis</h1>
          <p style="font-size: 13px; color: #b8b8c8; margin: 0; max-width: 600px; margin: 0 auto;">
            Scanning: <strong>"${category}"</strong> across Amazon, Shopify, and Etsy. Based on your answers to customer, operational, and financial fit questions.
          </p>
        </div>

        <!-- Platform Cards Grid -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 48px;">
    `;

    sorted.forEach(([key, score]) => {
      const platform = data.platforms[key];
      const isTop = key === topPlatform;
      const topBadge = isTop ? '<div style="position: absolute; top: 12px; right: 12px; background: #0f6e56; color: #fff; font-size: 11px; padding: 6px 12px; border-radius: 4px; font-family: \'JetBrains Mono\', monospace; font-weight: 600;">TOP PICK</div>' : '';

      html += `
        <div style="background: #222230; border: 1px solid #2e3838; border-radius: 10px; padding: 24px; position: relative; ${isTop ? 'border: 2px solid #0f6e56;' : ''}">
          ${topBadge}
          <div style="font-size: 32px; margin-bottom: 12px;">${platform.icon}</div>
          <div style="font-size: 18px; font-family: 'Playfair Display', serif; color: ${platform.color}; margin-bottom: 16px; font-weight: 600;">${platform.name}</div>
          
          <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 20px;">
            <div style="font-size: 28px; font-weight: 700; color: ${platform.color};">${score.toFixed(1)}</div>
            <div style="font-size: 12px; color: #888898; font-family: 'JetBrains Mono', monospace;">/10</div>
          </div>

          <div style="height: 4px; background: #2e2e3e; border-radius: 2px; margin-bottom: 20px; overflow: hidden;">
            <div style="height: 4px; background: ${platform.color}; width: ${score * 10}%; border-radius: 2px; transition: width 0.4s ease;"></div>
          </div>

          <div style="font-size: 12px; color: #888898; line-height: 1.6; margin-bottom: 16px;">
            ${this.getPlatformWhy(key, layerScores, data)}
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${platform.flags.map(f => `<span style="background: ${f.hex}18; color: ${f.hex}; font-size: 11px; padding: 4px 10px; border-radius: 4px; font-family: 'JetBrains Mono', monospace;">${f.label}</span>`).join('')}
          </div>
        </div>
      `;
    });

    html += `
        </div>

        <!-- Layer Breakdown -->
        <div style="background: #0c1810; padding: 20px; border-radius: 8px; margin-bottom: 32px;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; margin-bottom: 20px; font-weight: 600;">Your Layer Scores</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
            <div>
              <div style="font-size: 11px; color: #3a72b0; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px;">CUSTOMER FIT</div>
              <div style="font-size: 20px; font-weight: 700; color: #3a72b0; margin-bottom: 8px;">${layerScores.cf.toFixed(1)}</div>
              <div style="height: 4px; background: #2e2e3e; border-radius: 2px; overflow: hidden;">
                <div style="height: 4px; background: #3a72b0; width: ${layerScores.cf * 10}%; border-radius: 2px;"></div>
              </div>
              <div style="font-size: 11px; color: #888898; margin-top: 12px; line-height: 1.5;">
                ${MARKETPLACE_FIT_ENGINE.getLayerInsight('cf', layerScores.cf)}
              </div>
            </div>

            <div>
              <div style="font-size: 11px; color: #b8620a; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px;">OPERATIONAL FIT</div>
              <div style="font-size: 20px; font-weight: 700; color: #b8620a; margin-bottom: 8px;">${layerScores.of.toFixed(1)}</div>
              <div style="height: 4px; background: #2e2e3e; border-radius: 2px; overflow: hidden;">
                <div style="height: 4px; background: #b8620a; width: ${layerScores.of * 10}%; border-radius: 2px;"></div>
              </div>
              <div style="font-size: 11px; color: #888898; margin-top: 12px; line-height: 1.5;">
                ${MARKETPLACE_FIT_ENGINE.getLayerInsight('of', layerScores.of)}
              </div>
            </div>

            <div>
              <div style="font-size: 11px; color: #2a6a3a; font-family: 'JetBrains Mono', monospace; margin-bottom: 8px;">FINANCIAL FIT</div>
              <div style="font-size: 20px; font-weight: 700; color: #2a6a3a; margin-bottom: 8px;">${layerScores.ff.toFixed(1)}</div>
              <div style="height: 4px; background: #2e2e3e; border-radius: 2px; overflow: hidden;">
                <div style="height: 4px; background: #2a6a3a; width: ${layerScores.ff * 10}%; border-radius: 2px;"></div>
              </div>
              <div style="font-size: 11px; color: #888898; margin-top: 12px; line-height: 1.5;">
                ${MARKETPLACE_FIT_ENGINE.getLayerInsight('ff', layerScores.ff)}
              </div>
            </div>
          </div>
        </div>

        <!-- Top Pick Detail -->
        <div style="background: #0c1810; padding: 20px; border-radius: 8px;">
          <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #0f6e56; margin-bottom: 12px; font-weight: 600;">Why ${data.platforms[topPlatform].name} fits you best</div>
          <p style="font-size: 13px; color: #b8b8c8; line-height: 1.7; margin: 0;">
            ${MARKETPLACE_FIT_ENGINE.getPlatformExplanation(topPlatform, layerScores, data)}
          </p>
        </div>
      </div>

      <!-- CTA Section -->
      <div style="background: #fff; border: 1px solid #d8d0c4; border-radius: 12px; padding: 40px; margin-bottom: 40px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: #1a1a1a; margin: 0 0 28px 0;">
          Next Step — Entry Strategy
        </h2>

        <div style="border: 2px solid #0f6e56; border-radius: 10px; padding: 28px; margin-bottom: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #0f6e56; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; font-weight: 600;">
            ✓ Used the Free Tools · Save $100
          </div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #1a1a1a; margin: 0 0 8px 0;">
            Entry Strategy Dossier
          </h3>
          <p style="font-size: 12px; color: #7a7065; margin-bottom: 16px;">
            You did the work. Here's your reward.
          </p>
          <div style="background: #f5f2eb; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
            <p style="font-size: 13px; color: #1a1a1a; margin: 0; font-weight: 600;">
              $449 <span style="text-decoration: line-through; color: #bbb;">~~$549~~</span>
            </p>
            <p style="font-size: 12px; color: #7a7065; margin: 4px 0 0 0;">
              Full intake + written dossier + 60-minute session
            </p>
          </div>
          <ul style="font-size: 13px; color: #7a7065; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
            <li>All three fit layers verified with real platform data</li>
            <li>2–3 realistic product directions matched to your profile</li>
            <li>Platform selection with fees and ad requirements calculated</li>
            <li>90-day execution roadmap</li>
            <li>Risk register — top 3 risks and how to manage them</li>
          </ul>
          <a href="https://calendly.com/gio_chakhidze/new-meeting" target="_blank" style="display: block; padding: 14px 28px; background: #0f6e56; color: white; text-align: center; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px;">
            Book Entry Strategy · $449 →
          </a>
        </div>
      </div>

      <!-- Advisory Notice -->
      <div style="background: #f5f2eb; border: 1px solid #d8d0c4; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; font-weight: 600;">
          Advisory Notice
        </div>
        <p style="font-size: 12px; color: #7a7065; line-height: 1.7; margin: 0;">
          This calculator provides directional insight based on user inputs. It does not constitute legal, financial, or investment advice. All business decisions remain the sole responsibility of the user. A live session helps you interpret these results.
        </p>
      </div>
    `;

    container.innerHTML = html;
  },

  // Get platform explanation
  getPlatformWhy(platform, layerScores, data) {
    const cfs = layerScores.cf;
    const ofs = layerScores.of;
    const ffs = layerScores.ff;

    const explanations = {
      amazon: `Strong for commodity-driven, price-sensitive buyers. Your operational score (${ofs.toFixed(1)}) is most critical for Amazon's logistics demands.`,
      shopify: `Best for building your brand and keeping customer relationships. Your ability to drive traffic matters more than platform logistics.`,
      etsy: `Ideal if your product appeals to niche, community-driven buyers. Lower operational complexity, built-in audience seeking your type of product.`
    };

    return explanations[platform] || '';
  }
};
