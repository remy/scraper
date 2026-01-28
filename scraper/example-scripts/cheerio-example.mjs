/**
 * Example script using Cheerio for HTML parsing
 *
 * This example shows how to:
 * - Fetch HTML content from a URL
 * - Parse it with Cheerio
 * - Extract structured data using CSS selectors
 */

export default async function handler(context) {
  const { request, response, cheerio } = context;

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
