import { useEffect, useState } from 'react';

export type LiveCheck =
  | { platform: 'twitch'; channel: string }
  | { platform: 'youtube'; channelId: string };

const REFRESH_MS = 3 * 60 * 1000;

/**
 * Twitch's preview-image CDN redirects to a "404_preview" placeholder when a
 * channel is offline, and it allows cross-origin requests, so no API key is needed.
 */
async function isTwitchLive(channel: string): Promise<boolean> {
  const res = await fetch(
    `https://static-cdn.jtvnw.net/previews-ttv/live_user_${channel.toLowerCase()}-80x45.jpg?t=${Date.now()}`,
    { cache: 'no-store' },
  );
  return res.ok && !res.url.includes('404_preview');
}

/**
 * YouTube has no keyless live check, so this uses the Data API. Set the
 * YOUTUBE_API_KEY repo secret (a browser key restricted to matthewhearst.com);
 * without it the YouTube badge never shows. Costs 2 quota units per check.
 */
const YOUTUBE_API_KEY: string | undefined = import.meta.env.VITE_YOUTUBE_API_KEY;

async function isYouTubeLive(channelId: string): Promise<boolean> {
  if (!YOUTUBE_API_KEY) return false;
  const api = 'https://www.googleapis.com/youtube/v3';
  // A channel's uploads playlist ID is its channel ID with "UC" swapped for "UU".
  const uploads = `UU${channelId.slice(2)}`;
  const playlist = await fetch(
    `${api}/playlistItems?part=contentDetails&maxResults=5&playlistId=${uploads}&key=${YOUTUBE_API_KEY}`,
  ).then((r) => r.json());
  const ids: string[] = (playlist.items ?? []).map(
    (item: { contentDetails: { videoId: string } }) => item.contentDetails.videoId,
  );
  if (ids.length === 0) return false;
  const videos = await fetch(`${api}/videos?part=snippet&id=${ids.join(',')}&key=${YOUTUBE_API_KEY}`).then((r) =>
    r.json(),
  );
  return (videos.items ?? []).some(
    (video: { snippet: { liveBroadcastContent: string } }) => video.snippet.liveBroadcastContent === 'live',
  );
}

/** Whether the channel is live right now. Re-checks every few minutes; any error counts as offline. */
export function useLiveStatus(check?: LiveCheck): boolean {
  const [live, setLive] = useState(false);
  const key = check ? JSON.stringify(check) : '';

  useEffect(() => {
    if (!key) return;
    const target = JSON.parse(key) as LiveCheck;
    let cancelled = false;

    const run = () =>
      (target.platform === 'twitch' ? isTwitchLive(target.channel) : isYouTubeLive(target.channelId))
        .then((result) => !cancelled && setLive(result))
        .catch(() => !cancelled && setLive(false));

    run();
    const timer = setInterval(run, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [key]);

  return live;
}
