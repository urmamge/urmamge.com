import { useEffect, useState } from 'react';

/** A paragraph from a version's notes, with the "  - " lines listed under it. */
export interface ChangelogBlock {
  text: string;
  items: string[];
}

export interface ChangelogVersion {
  version: string;
  blocks: ChangelogBlock[];
}

/**
 * Reads a changelog laid out like overwatchbot's CHANGELOG.txt: a "Version X"
 * line underlined with dashes, then paragraphs with "  - " list items under them.
 * Anything before the first version (the file's own title) is skipped.
 */
export function parseChangelog(source: string): ChangelogVersion[] {
  const lines = source.replace(/\r\n?/g, '\n').split('\n');
  const versions: ChangelogVersion[] = [];
  let block: ChangelogBlock | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const heading = /^version\s+(.+)$/i.exec(line);
    if (heading && /^-{3,}$/.test(lines[i + 1]?.trim() ?? '')) {
      versions.push({ version: heading[1], blocks: [] });
      block = undefined;
      i++;
      continue;
    }
    const current = versions[versions.length - 1];
    if (!current) continue;
    if (!line) {
      block = undefined;
    } else if (line.startsWith('- ')) {
      if (!block) current.blocks.push((block = { text: '', items: [] }));
      block.items.push(line.slice(2));
    } else if (block && block.items.length === 0) {
      block.text += ` ${line}`;
    } else {
      current.blocks.push((block = { text: line, items: [] }));
    }
  }
  return versions;
}

export type ChangelogState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; versions: ChangelogVersion[] };

/**
 * Fetches the changelog from GitHub when the page loads, so the page shows the
 * latest file without a rebuild. raw.githubusercontent.com allows cross-origin
 * requests and caches for about 5 minutes.
 */
export function useChangelog(url: string): ChangelogState {
  const [state, setState] = useState<ChangelogState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        const versions = parseChangelog(text);
        if (!cancelled) setState(versions.length ? { status: 'ready', versions } : { status: 'error' });
      })
      .catch(() => !cancelled && setState({ status: 'error' }));
    return () => {
      cancelled = true;
    };
  }, [url]);

  return state;
}
