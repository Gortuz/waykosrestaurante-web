interface Env {
  GOOGLE_DRIVE_MENU_ID?: string;
}

interface EventContext<Env> {
  request: Request;
  env: Env;
  params: Record<string, string | string[]>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
  data: Record<string, unknown>;
}

type PagesFunction<Env = unknown> = (
  context: EventContext<Env>
) => Response | Promise<Response>;

// Cloudflare Pages Function to dynamically stream and cache the PDF from Google Drive
export const onRequest: PagesFunction<Env> = async (context) => {
  const fileId = context.env.GOOGLE_DRIVE_MENU_ID || '1GuA4iEbDHUJvWEOgKVh-uDRlrTWHOF3b';

  // If no Google Drive ID is configured, fallback to the static /public/menu.pdf
  if (!fileId) {
    return context.next();
  }

  // Extract raw ID if a full Google Drive sharing URL was provided
  const cleanId = fileId.includes('/d/')
    ? fileId.split('/d/')[1].split('/')[0]
    : fileId.replace(/^id=/, '').trim();

  const driveUrls = [
    `https://drive.usercontent.google.com/download?id=${cleanId}&export=download`,
    `https://drive.google.com/uc?export=download&id=${cleanId}`
  ];

  try {
    let driveRes: Response | null = null;
    for (const url of driveUrls) {
      try {
        const res = await fetch(url);
        const contentType = res.headers.get('content-type') || '';
        if (res.ok && (contentType.includes('pdf') || contentType.includes('octet-stream'))) {
          driveRes = res;
          break;
        }
      } catch {
        continue;
      }
    }

    // If Google Drive returns an error or HTML, safely fallback to the bundled static PDF asset
    if (!driveRes) {
      return context.next();
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/pdf');
    headers.set('Content-Disposition', 'inline; filename="menu-waykos.pdf"');
    // Edge cache for 1 hour, browser cache for 30 minutes
    headers.set('Cache-Control', 'public, max-age=1800, s-maxage=3600');

    return new Response(driveRes.body, {
      status: 200,
      headers,
    });
  } catch {
    // If network or fetch fails, graceful fallback to static PDF
    return context.next();
  }
};

