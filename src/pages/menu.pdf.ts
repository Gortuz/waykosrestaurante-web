import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals, redirect }) => {
  const env = (locals as any)?.runtime?.env || {};
  const fileId = env.GOOGLE_DRIVE_MENU_ID || import.meta.env.GOOGLE_DRIVE_MENU_ID || '1GuA4iEbDHUJvWEOgKVh-uDRlrTWHOF3b';

  // If no Google Drive ID is configured, fallback to the bundled static asset
  if (!fileId) {
    return redirect('/menu-fallback.pdf', 302);
  }

  // Extract raw ID if a full Google Drive sharing URL was provided
  const cleanId = fileId.includes('/d/')
    ? fileId.split('/d/')[1].split('/')[0]
    : fileId.replace(/^id=/, '').trim();

  const driveUrls = [
    `https://drive.usercontent.google.com/download?id=${cleanId}&export=download`,
    `https://drive.google.com/uc?export=download&id=${cleanId}`,
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

    if (driveRes && driveRes.body) {
      const headers = new Headers();
      headers.set('Content-Type', 'application/pdf');
      headers.set('Content-Disposition', 'inline; filename="menu-waykos.pdf"');
      // Edge cache for 1 hour, browser cache for 30 minutes
      headers.set('Cache-Control', 'public, max-age=1800, s-maxage=3600');

      return new Response(driveRes.body, {
        status: 200,
        headers,
      });
    }

    // If Google Drive returns an error or HTML, fallback to the bundled static asset
    return redirect('/menu-fallback.pdf', 302);
  } catch {
    // If network or fetch fails, graceful fallback to static PDF
    return redirect('/menu-fallback.pdf', 302);
  }
};

