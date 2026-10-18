/**
 * IndexNow Instant Search Engine Indexing Client
 * Supported by Microsoft Bing, Yandex, Seznam.cz, and Naver
 */

export interface IndexNowPayload {
  host: string;
  key?: string;
  urlList: string[];
}

export async function pingIndexNow(urls: string[]): Promise<{ success: boolean; status: number; message: string }> {
  try {
    if (!urls || urls.length === 0) {
      return { success: false, status: 400, message: "No URLs provided" };
    }

    const host = "modernisum.com";
    // Canonical IndexNow API key (or environment key)
    const apiKey = process.env.INDEXNOW_API_KEY || "modernisum_indexnow_key_2026";
    const keyLocation = `https://${host}/${apiKey}.txt`;

    const body = {
      host,
      key: apiKey,
      keyLocation,
      urlList: urls,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return {
        success: true,
        status: response.status,
        message: `Successfully notified IndexNow for ${urls.length} URLs`,
      };
    }

    const err = await response.text();
    return {
      success: false,
      status: response.status,
      message: `IndexNow returned status ${response.status}: ${err}`,
    };
  } catch (error: any) {
    console.warn("⚠️ IndexNow ping network error:", error.message || error);
    return {
      success: false,
      status: 500,
      message: error.message || "Failed to dispatch IndexNow ping",
    };
  }
}
