// Show a message when someone clicks a stall button.
const message = document.getElementById('booking-message');

document.querySelectorAll('[data-umami-event="Book stall"]').forEach(button => {
  button.addEventListener('click', () => {
    message.textContent = 'You selected: ' + button.dataset.stallName +
      '. This is a demonstration, not a confirmed booking.';
    message.hidden = false;
  });
});

// Optional Umami connection. Leave the configuration empty until Umami is ready.
// The tracker records clicks from the HTML attributes, so do not also call
// umami.track('Book stall') here, which would count a click twice.
const config = window.PAISLEY_UMAMI || {};

if (config.scriptUrl && config.websiteId) {
  try {
    const source = new URL(config.scriptUrl, window.location.href);
    if (!['http:', 'https:'].includes(source.protocol)) {
      throw new Error('The tracking script must use HTTP or HTTPS.');
    }
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(config.websiteId)) {
      throw new Error('Copy the Website ID from your Umami tracking code.');
    }
    const script = document.createElement('script');
    script.src = source.href;
    script.defer = true;
    script.setAttribute('data-website-id', config.websiteId);
    script.addEventListener('error', () => console.warn('Could not load Umami. Check umami-config.js.'));
    document.head.appendChild(script);
  } catch (error) {
    console.warn('Umami is not configured:', error.message);
  }
}
