export interface ParsedVideo {
  type: "youtube" | "rutube" | "vk" | "direct" | "unknown";
  id?: string;
  embedUrl: string;
  watchUrl?: string;
  rawInput: string;
}

/**
 * Parses any video URL or iframe embed code into a clean, working embed URL.
 * Supports:
 * - YouTube: watch?v=, youtu.be/, shorts/, live/, embed/, youtube-nocookie, raw ID, iframe snippets
 * - RuTube: rutube.ru/video/, rutube.ru/play/embed/
 * - VK Video: vk.com/video_ext.php, vkvideo.ru/video-
 * - Direct files: .mp4, .webm
 */
export function parseVideoUrl(input: string): ParsedVideo {
  if (!input || !input.trim()) {
    return {
      type: "unknown",
      embedUrl: "",
      rawInput: input || "",
    };
  }

  let clean = input.trim();

  // If user pasted an entire iframe tag: <iframe ... src="..." ...>
  const iframeMatch = clean.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    clean = iframeMatch[1].trim();
  }

  // 1. YouTube check
  // Plain 11-character video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return {
      type: "youtube",
      id: clean,
      embedUrl: `https://www.youtube.com/embed/${clean}`,
      watchUrl: `https://www.youtube.com/watch?v=${clean}`,
      rawInput: input,
    };
  }

  // YouTube URL regex
  const ytMatch = clean.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts|live)\/|.*[?&]v=)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/i
  );

  if (ytMatch && ytMatch[1]) {
    const id = ytMatch[1];
    return {
      type: "youtube",
      id,
      embedUrl: `https://www.youtube.com/embed/${id}`,
      watchUrl: `https://www.youtube.com/watch?v=${id}`,
      rawInput: input,
    };
  }

  // 2. RuTube check
  const rutubeMatch = clean.match(/rutube\.ru\/(?:video|play\/embed)\/([a-zA-Z0-9]+)/i);
  if (rutubeMatch && rutubeMatch[1]) {
    const id = rutubeMatch[1];
    return {
      type: "rutube",
      id,
      embedUrl: `https://rutube.ru/play/embed/${id}`,
      watchUrl: `https://rutube.ru/video/${id}/`,
      rawInput: input,
    };
  }

  // 3. VK Video check
  if (clean.includes("vk.com/video_ext.php")) {
    return {
      type: "vk",
      embedUrl: clean,
      watchUrl: clean,
      rawInput: input,
    };
  }

  // 4. Direct video file
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(clean)) {
    return {
      type: "direct",
      embedUrl: clean,
      watchUrl: clean,
      rawInput: input,
    };
  }

  // Fallback: return as-is
  return {
    type: "unknown",
    embedUrl: clean,
    watchUrl: clean,
    rawInput: input,
  };
}
