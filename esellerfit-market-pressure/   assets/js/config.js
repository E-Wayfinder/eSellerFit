/**
 * eSellerFit Global Configuration
 * Used by all calculators
 */

window.ESF_CONFIG = {
  // Apps Script integration (when ready)
  appsScriptUrl: null, // 'https://script.google.com/macros/s/.../useTrigger'

  // Calendly booking URL
  bookingUrl: 'https://calendly.com/gio_chakhidze/new-meeting',

  // GA4 measurement ID
  ga4Id: 'G-XYYCWXC1RV'
};

// Initialize GA4 if ID is set
if (window.ESF_CONFIG.ga4Id) {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', window.ESF_CONFIG.ga4Id);
}
