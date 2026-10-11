import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://prokateka.kz";

  return {
    rules: [
      // Allow all standard search engines
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
      // Google bots
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-News",
          "Googlebot-Video",
          "Storebot-Google",
          "Google-InspectionTool",
        ],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
      // Yandex bots
      {
        userAgent: ["Yandex", "YandexBot", "YandexImages", "YandexMedia"],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
      // Bing & other traditional search engines
      {
        userAgent: ["Bingbot", "msnbot", "Applebot", "DuckDuckBot", "Slurp"],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
      // AI Search Bots — explicitly allow so AI sees the site
      {
        userAgent: [
          "OAI-SearchBot",       // OpenAI Search (ChatGPT search)
          "GPTBot",              // OpenAI GPTBot (training/browsing)
          "ChatGPT-User",       // ChatGPT user-initiated browsing
          "PerplexityBot",      // Perplexity AI search
          "ClaudeBot",          // Anthropic Claude
          "Claude-Web",         // Claude web browsing
          "Bytespider",         // ByteDance / TikTok AI
          "CCBot",              // Common Crawl (used by many AI)
          "anthropic-ai",       // Anthropic direct
          "cohere-ai",          // Cohere AI
          "Google-Extended",    // Google Gemini / Bard
          "FacebookBot",        // Meta AI
          "meta-externalagent", // Meta AI agent
          "Amazonbot",          // Amazon Alexa AI
          "YouBot",             // You.com AI search
          "AI2Bot",             // Allen AI
          "Timpibot",           // Timpi search
          "PetalBot",           // Huawei Petal Search
          "Applebot-Extended",  // Apple Intelligence
        ],
        allow: "/",
        disallow: ["/admin", "/admin/*", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
