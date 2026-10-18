/**
 * Google & Search Engine Sitemap Auto-Ping Client
 * Automatically notifies search engines when new articles or releases are published.
 */

export async function pingSearchEngines(): Promise<{
  google: boolean;
  bing: boolean;
  timestamp: string;
}> {
  const sitemapUrl = encodeURIComponent("https://modernisum.com/sitemap.xml");
  const newsSitemapUrl = encodeURIComponent("https://modernisum.com/news-sitemap.xml");

  const results = {
    google: false,
    bing: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // 1. Google Sitemap & News Sitemap Ping
    const googlePingPromise = fetch(`https://www.google.com/ping?sitemap=${newsSitemapUrl}`)
      .then((res) => {
        results.google = res.ok || res.status === 200;
      })
      .catch((err) => {
        console.warn("⚠️ Google ping network warning:", err.message);
      });

    // 2. Bing Sitemap Ping
    const bingPingPromise = fetch(`https://www.bing.com/ping?sitemap=${sitemapUrl}`)
      .then((res) => {
        results.bing = res.ok || res.status === 200;
      })
      .catch((err) => {
        console.warn("⚠️ Bing ping network warning:", err.message);
      });

    await Promise.allSettled([googlePingPromise, bingPingPromise]);
  } catch (error: any) {
    console.warn("⚠️ Search engine auto-ping notice:", error.message || error);
  }

  return results;
}
