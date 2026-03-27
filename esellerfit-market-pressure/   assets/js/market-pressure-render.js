/**
 * Market Pressure Results Renderer - REDESIGNED
 * Displays pressure index, force breakdown, and dominant force guidance
 * EXACT LAYOUT: Your custom eSF design
 */

window.MARKET_PRESSURE_RENDER = {
  renderResults(containerId, result, category) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const oceanCopy = MARKET_PRESSURE_ENGINE.getOceanCopy(result.ocean);
    const dominantCopy = MARKET_PRESSURE_ENGINE.getDominantForceCopy(result.dominant);
    const dimensionNames = {
      d: 'Demand',
      s: 'Supply',
      a: 'Advertising',
      m: 'Margin'
    };
    const dimensionColors = {
      d: '#0f6e56',
      s: '#9b8ec4',
      a: '#d48a3a',
      m: '#3a9e78'
    };

    // Build force rows HTML - your exact layout
    const forceRows = ['d', 's', 'a', 'm']
      .map(force => {
        const score = result[force];
        const isDominant = force === result.dominant;
        const color = dimensionColors[force];
        const dominantLabel = isDominant ? ` <span style="background: ${color}; color: white; font-weight: 700; font-size: 12px; padding: 6px 10px; border-radius: 4px; display: inline-block; margin-left: 8px;">dominant</span>` : '';

        return `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
            <div style="flex: 1;">
              <div style="font-size: 13px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; display: flex; align-items: center; flex-wrap: wrap;">
                ${dimensionNames[force]} Pressure${dominantLabel}
              </div>
              <div style="font-size: 24px; font-weight: 700; color: ${color};">
                ${score.toFixed(1)}
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    // Determine zone label text
    let zoneLabel = '1.0 – 3.0';
    let zoneColor = '#3a9e78';

    if (result.ocean === 'amber') {
      zoneLabel = '3.1 – 6.9';
      zoneColor = '#d48a3a';
    } else if (result.ocean === 'red') {
      zoneLabel = '7.0 – 10.0';
      zoneColor = '#c43a2a';
    }

    // YOUR EXACT NEW DESIGN
    container.innerHTML = `
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 40px;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace;">
          eSellerFit
        </div>
        <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #1a1a1a; margin: 0 0 16px 0;">
          Your Market Pressure Index
        </h1>
        <p style="font-size: 13px; color: #7a7065; line-height: 1.6; max-width: 600px; margin: 0 auto;">
          Scanning: <strong>"${category}"</strong> — this score reflects what you observed in that category. The more accurate your observations, the more useful this result.
        </p>
      </div>

      <!-- Main Index Section -->
      <div style="background: #f5f2eb; border-radius: 12px; padding: 48px 32px; margin-bottom: 40px; text-align: center;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; margin-bottom: 24px; font-family: 'JetBrains Mono', monospace;">
          Your Market Pressure
        </div>
        
        <!-- Gauge/Speedometer Dial -->
        <svg width="220" height="140" viewBox="0 0 220 140" style="margin: 0 auto 24px; display: block;">
          <!-- Background arc (gray) -->
          <path d="M 30 110 A 80 80 0 0 1 190 110" stroke="#e0e0e0" stroke-width="16" fill="none" stroke-linecap="round"/>
          
          <!-- Colored arc (percentage based on score: 0-10 scale) -->
          <path d="M 30 110 A 80 80 0 0 1 ${30 + (result.index / 10) * 160} 110" stroke="${zoneColor}" stroke-width="16" fill="none" stroke-linecap="round"/>
          
          <!-- Center circle (white background) -->
          <circle cx="110" cy="110" r="50" fill="white"/>
          
          <!-- Score number -->
          <text x="110" y="115" text-anchor="middle" font-family="'Playfair Display', serif" font-size="48" font-weight="600" fill="${zoneColor}">
            ${result.index.toFixed(1)}
          </text>
        </svg>
        
        <div style="font-size: 13px; color: ${zoneColor}; margin-bottom: 12px; font-weight: 600;">
          ${zoneLabel}
        </div>
        <div style="font-family: 'Playfair Display', serif; font-size: 24px; color: #1a1a1a; margin-bottom: 20px;">
          ${oceanCopy.label}
        </div>
        <p style="font-size: 13px; color: #7a7065; line-height: 1.7; max-width: 700px; margin: 0 auto;">
          ${oceanCopy.body}
        </p>
      </div>

      <!-- Four Forces Section -->
      <div style="background: #fff; border: 1px solid #d8d0c4; border-radius: 12px; padding: 40px; margin-bottom: 40px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 24px; color: #1a1a1a; margin: 0 0 28px 0;">
          Four Forces at Work
        </h2>
        <p style="font-size: 12px; color: #7a7065; margin-bottom: 32px;">
          Your index is the average of these four pressures
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
          ${forceRows}
        </div>
      </div>

      <!-- Dominant Force Section -->
      <div style="background: #fff; border: 1px solid #d8d0c4; border-radius: 12px; padding: 40px; margin-bottom: 40px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #0f6e56; font-family: 'JetBrains Mono', monospace; margin-bottom: 16px; font-weight: 600;">
          Primary Risk Factor — Dominant Force
        </div>
        <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: #1a1a1a; margin: 0 0 20px 0;">
          ${dominantCopy.title}
        </h2>
        <p style="font-size: 13px; color: #7a7065; line-height: 1.8; margin-bottom: 20px;">
          <strong>What it means:</strong> ${dominantCopy.what}
        </p>
        <div style="background: #f5f2eb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; font-weight: 600;">
            High-Level Strategic Prescription
          </div>
          <p style="font-size: 13px; color: #1a1a1a; line-height: 1.8; margin: 0;">
            ${dominantCopy.action}
          </p>
        </div>
        <p style="font-size: 12px; color: #7a7065;">
          Not sure what this means for your specific product?<br/>
          <a href="https://calendly.com/gio_chakhidze/new-meeting" target="_blank" style="color: #0f6e56; text-decoration: none; font-weight: 600;">Talk to Gio first — free 30 min →</a>
        </p>
      </div>

      <!-- CTA Section -->
      <div style="background: #fff; border: 1px solid #d8d0c4; border-radius: 12px; padding: 40px; margin-bottom: 40px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: #1a1a1a; margin: 0 0 28px 0;">
          Next Step · Entry Strategy
        </h2>

        <!-- Option 1: Free Call -->
        <div style="border: 1px solid #d8d0c4; border-radius: 10px; padding: 28px; margin-bottom: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; font-weight: 600;">
            Not Sure Where to Start
          </div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #1a1a1a; margin: 0 0 8px 0;">
            Talk to Gio First
          </h3>
          <p style="font-size: 12px; color: #7a7065; margin-bottom: 16px;">
            No commitment, no pitch.
          </p>
          <div style="background: #f5f2eb; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
            <p style="font-size: 13px; color: #1a1a1a; margin: 0; font-weight: 600;">
              Free · 30-minute intro call · Zoom
            </p>
          </div>
          <ul style="font-size: 13px; color: #7a7065; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
            <li>Understand where you are right now</li>
            <li>Get clarity on which path makes sense</li>
            <li>No obligation to book anything after</li>
          </ul>
          <a href="https://calendly.com/gio_chakhidze/new-meeting" target="_blank" style="display: block; padding: 14px 28px; background: #f5f2eb; color: #0f6e56; text-align: center; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; border: 1.5px solid #0f6e56;">
            Book Free Call →
          </a>
        </div>

        <!-- Option 2: $449 -->
        <div style="border: 2px solid #0f6e56; border-radius: 10px; padding: 28px; margin-bottom: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #0f6e56; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; font-weight: 600;">
            ✓ Used the Free Tools · Save \$100
          </div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #1a1a1a; margin: 0 0 8px 0;">
            Entry Strategy Dossier
          </h3>
          <p style="font-size: 12px; color: #7a7065; margin-bottom: 16px;">
            You did the work. Here's your reward.
          </p>
          <div style="background: #f5f2eb; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
            <p style="font-size: 13px; color: #1a1a1a; margin: 0; font-weight: 600;">
              \$449 <span style="text-decoration: line-through; color: #bbb;">~~\$549~~</span>
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
            Book Entry Strategy · \$449 →
          </a>
        </div>

        <!-- Option 3: $549 -->
        <div style="border: 1px solid #d8d0c4; border-radius: 10px; padding: 28px; margin-bottom: 24px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; font-weight: 600;">
            Starting From Scratch
          </div>
          <h3 style="font-family: 'Playfair Display', serif; font-size: 18px; color: #1a1a1a; margin: 0 0 8px 0;">
            Full Intake + Entry Strategy
          </h3>
          <p style="font-size: 12px; color: #7a7065; margin-bottom: 16px;">
            No prior tools. Full analysis included from the start.
          </p>
          <div style="background: #f5f2eb; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px;">
            <p style="font-size: 13px; color: #1a1a1a; margin: 0; font-weight: 600;">
              \$549
            </p>
            <p style="font-size: 12px; color: #7a7065; margin: 4px 0 0 0;">
              Full intake + written dossier + 60-minute session
            </p>
          </div>
          <ul style="font-size: 13px; color: #7a7065; line-height: 1.8; margin-bottom: 20px; padding-left: 20px;">
            <li>Complete seller profile intake</li>
            <li>Market research from scratch</li>
            <li>Everything in the \$449 dossier</li>
            <li>Extended session time for intake</li>
          </ul>
          <a href="https://calendly.com/gio_chakhidze/new-meeting" target="_blank" style="display: block; padding: 14px 28px; background: #f5f2eb; color: #0f6e56; text-align: center; border-radius: 6px; text-decoration: none; font-weight: 700; font-size: 14px; border: 1.5px solid #0f6e56;">
            Book Entry Strategy · \$549 →
          </a>
        </div>

      <!-- What Comes Next -->
      <div style="background: #fff; border: 1px solid #d8d0c4; border-radius: 12px; padding: 40px; margin-bottom: 40px;">
        <h2 style="font-family: 'Playfair Display', serif; font-size: 20px; color: #1a1a1a; margin: 0 0 20px 0;">
          What Comes Next
        </h2>
        <p style="font-size: 13px; color: #7a7065; line-height: 1.8;">
          You know the market pressure. The Entry Strategy adds your profile.
        </p>
        <p style="font-size: 13px; color: #7a7065; line-height: 1.8;">
          Market pressure tells you the structural challenges. Your Entry Strategy combines this with your seller profile and platform fit — so you know not just whether entry is possible, but whether it's possible <em>for you</em>.
        </p>
      </div>

      <!-- Advisory Notice -->
      <div style="background: #f5f2eb; border: 1px solid #d8d0c4; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #7a7065; font-family: 'JetBrains Mono', monospace; margin-bottom: 12px; font-weight: 600;">
          Advisory Notice
        </div>
        <p style="font-size: 12px; color: #7a7065; line-height: 1.7; margin: 0;">
          This calculator provides directional insight based on user inputs. It does not constitute legal, financial, or investment advice. All business decisions remain the sole responsibility of the user. A live session helps you interpret these results →
        </p>
      </div>

      <!-- Footer Links -->
      <div style="text-align: center; padding: 20px 0;">
        <a href="/legal/terms.html" target="_blank" style="font-size: 11px; color: #7a7065; text-decoration: none; margin: 0 16px;">Terms of Service</a>
        <a href="/legal/privacy.html" target="_blank" style="font-size: 11px; color: #7a7065; text-decoration: none; margin: 0 16px;">Privacy Policy</a>
        <a href="/legal/disclaimer.html" target="_blank" style="font-size: 11px; color: #7a7065; text-decoration: none; margin: 0 16px;">Disclaimer</a>
      </div>
    `;
  }
};
