/**
 * eSellerFit Calculator Shell
 * Shared utilities for all calculators
 * Do not modify unless adding universal functionality
 */

window.ESF_SHELL = {
  // Validation
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
  },

  // DOM Utilities
  byId(id) {
    return document.getElementById(id);
  },

  showOnly(screenIds, activeId) {
    screenIds.forEach(id => {
      const el = this.byId(id);
      if (el) el.classList.toggle('esf-hidden', id !== activeId);
    });
  },

  // Form Binding
  bindStartGate({ emailId, consentId, startBtnId, extraRequiredIds = [] }) {
    const emailEl = this.byId(emailId);
    const consentEl = this.byId(consentId);
    const startBtn = this.byId(startBtnId);
    const extraEls = extraRequiredIds.map(id => this.byId(id)).filter(Boolean);

    const validate = () => {
      const emailOk = this.validateEmail(emailEl?.value || '');
      const consentOk = !!consentEl?.checked;
      const extrasOk = extraEls.every(el => String(el.value || '').trim().length > 0);
      if (startBtn) startBtn.disabled = !(emailOk && consentOk && extrasOk);
    };

    emailEl?.addEventListener('input', validate);
    consentEl?.addEventListener('change', validate);
    extraEls.forEach(el => el.addEventListener('input', validate));
    validate();
  },

  // Question Rendering
  renderQuestions(containerId, questions, answerNamePrefix) {
    const container = this.byId(containerId);
    if (!container) return;

    container.innerHTML = questions
      .map((q, index) => {
        const name = `${answerNamePrefix}${index + 1}`;
        const options = q.options
          .map(
            opt => `
          <label class="esf-option">
            <input type="radio" name="${name}" value="${opt.value}">
            <span>${opt.label}</span>
            ${opt.score ? `<span style="margin-left:auto;font-size:11px;color:#7a7065;">${opt.score}</span>` : ''}
          </label>
        `
          )
          .join('');

        const nudge = q.nudge
          ? `<div class="esf-question-nudge">💡 ${q.nudge}</div>`
          : '';

        return `
          <section class="esf-question" data-question-index="${index + 1}">
            <div class="esf-question-text">${q.id} · ${q.text}</div>
            ${nudge}
            <div class="esf-options">${options}</div>
          </section>
        `;
      })
      .join('');
  },

  // Progress Tracking
  bindProgress(answerNamePrefix, totalQuestions, progressBarId, progressTextId) {
    const progressBar = this.byId(progressBarId);
    const progressText = this.byId(progressTextId);

    const updateProgress = () => {
      const answered = Array.from(document.querySelectorAll(`input[name^="${answerNamePrefix}"]`))
        .filter(el => el.checked).length;

      const percentage = (answered / totalQuestions) * 100;
      if (progressBar) progressBar.style.width = percentage + '%';
      if (progressText) progressText.textContent = `${answered} / ${totalQuestions} questions answered`;
    };

    document.addEventListener('change', e => {
      if (e.target.name?.startsWith(answerNamePrefix)) {
        updateProgress();
      }
    });

    updateProgress();
  },

  // Answer Collection
  collectAnswers(answerNamePrefix, totalQuestions) {
    const answers = {};
    for (let i = 1; i <= totalQuestions; i++) {
      const name = `${answerNamePrefix}${i}`;
      const checked = document.querySelector(`input[name="${name}"]:checked`);
      if (checked) {
        answers[name] = checked.value;
      }
    }
    return answers;
  },

  // Validation
  allQuestionsAnswered(answerNamePrefix, totalQuestions) {
    const answers = this.collectAnswers(answerNamePrefix, totalQuestions);
    return Object.keys(answers).length === totalQuestions;
  },

  // Backend Submission
  async submitLead({ calculator, category, email, answers, result }) {
    // Log to console for now (integrate with Apps Script later)
    console.log('Lead submitted:', {
      calculator,
      category,
      email,
      answers,
      result,
      timestamp: new Date().toISOString()
    });

    // Future: Send to Apps Script
    // if (window.ESF_CONFIG?.appsScriptUrl) {
    //   try {
    //     await fetch(window.ESF_CONFIG.appsScriptUrl, {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ calculator, category, email, answers, result })
    //     });
    //   } catch (e) {
    //     console.warn('Submission failed (non-blocking):', e.message);
    //   }
    // }
  },

  // Legal Links Rendering
  renderLegalLinks(containerId, includeBooking = false) {
    const container = this.byId(containerId);
    if (!container) return;

    const links = [
      '<a href="/legal/terms.html" target="_blank">Terms of Service</a>',
      '<a href="/legal/privacy.html" target="_blank">Privacy Policy</a>',
      '<a href="/legal/disclaimer.html" target="_blank">Disclaimer</a>'
    ];

    if (includeBooking) {
      links.push('<a href="/legal/client-agreement.html" target="_blank">Client Agreement</a>');
    }

    container.innerHTML = links.join('');
  }
};
