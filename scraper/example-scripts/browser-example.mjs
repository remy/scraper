/**
 * Example script using Puppeteer browser
 *
 * This example shows how to:
 * - Navigate to a page
 * - Extract data using page.evaluate()
 * - Take a screenshot (optional)
 */

export default async function handler(context) {
  const { request, response, browser } = context;

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

    return {
      success: true,
      data,
    };
  } finally {
    await page.close();
  }
}
