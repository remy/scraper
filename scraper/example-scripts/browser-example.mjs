/**
 * Example script using Puppeteer browser
 *
 * This example shows how to:
 * - Navigate to a page
 * - Extract data using page.evaluate()
 * - (Optional) Run on a schedule using cron
 *
 * OPTIONAL SCHEDULING:
 * You can export a 'cron' variable to run this script automatically.
 * The cron format is: "minute hour day month weekday"
 *
 * Examples:
 *   export const cron = "0 * * * *";        // Every hour at minute 0
 *   export const cron = "0 0 * * *";        // Daily at midnight
 *   export const cron = "0 9,17 * * 1-5";   // 9am and 5pm on weekdays
 *
 * When run on a schedule, context.request and context.response are undefined.
 * You can check context.isScheduled to determine if running in scheduled mode.
 */

// Uncomment to enable automatic scheduling:
// export const cron = "*/15 * * * *";     // Every 15 minutes

/**
 *
 * @param {object} context
 * @param {import('../hass.mjs').HomeAssistantAPI} context.hass - Home Assistant API client (if running in HA)
 * @param {import('puppeteer')} context.browser - Puppeteer browser instance
 * @param {boolean} context.isScheduled - True if running in scheduled mode
 * @returns
 */
export default async function handler(context) {
  const { hass, browser, isScheduled } = context;
  const page = await browser.newPage();

  try {
    // Navigate to a website
    await page.goto('https://example.com', { waitUntil: 'networkidle2' });

    // Extract data from the page
    const data = await page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        headings: Array.from(document.querySelectorAll('h1, h2')).map((h) =>
          h.textContent.trim()
        ),
      };
    });

    if (success) {
      hass.setState('sensor.scraper_browser_example', data.title, {
        friendly_name: 'Browser Example',
        headings: data.headings,
      });
    }
  } finally {
    await page.close();
  }
}
