/**
 * Example script using Cheerio for HTML parsing
 *
 * This example shows how to:
 * - Fetch HTML content from a URL
 * - Parse it with Cheerio
 * - Extract structured data using CSS selectors
 * - (Optional) Run on a schedule using cron
 *
 * OPTIONAL SCHEDULING:
 * You can export a 'cron' variable to run this script automatically.
 * The cron format is: "minute hour day month weekday"
 *
 * Examples:
 *   export const cron = "0 * * * *";        // Every hour at minute 0
 *   export const cron = "*/15 * * * *";     // Every 15 minutes
 *   export const cron = "0 0 * * *";        // Daily at midnight
 *   export const cron = "0 9,17 * * 1-5";   // 9am and 5pm on weekdays
 *
 * When run on a schedule, context.request and context.response are undefined.
 * You can check context.isScheduled to determine if running in scheduled mode.
 */

// Uncomment to enable automatic scheduling:
// export const cron = "0 */6 * * *";  // Every 6 hours

export default async function handler(context) {
  const { request, response, cheerio, isScheduled } = context;

  try {
    // Fetch HTML content from a website
    const response = await fetch('https://example.com');
    const html = await response.text();

    // Parse with Cheerio
    const $ = cheerio.load(html);

    // Extract data using CSS selectors
    const data = {
      title: $('title').text(),
      url: 'https://example.com',
      paragraphs: $('p')
        .slice(0, 3) // Get first 3 paragraphs
        .map((_, el) => $(el).text())
        .get(),
      links: $('a[href]')
        .slice(0, 5) // Get first 5 links
        .map((_, el) => ({
          text: $(el).text(),
          href: $(el).attr('href'),
        }))
        .get(),
    };

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
