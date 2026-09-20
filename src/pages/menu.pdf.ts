import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any)?.runtime?.env || {};
  const fileId = env.GOOGLE_DRIVE_MENU_ID || import.meta.env.GOOGLE_DRIVE_MENU_ID || '1GuA4iEbDHUJvWEOgKVh-uDRlrTWHOF3b';

  // Extract raw ID if a full Google Drive sharing URL was provided
  const cleanId = fileId.includes('/d/')
    ? fileId.split('/d/')[1].split('/')[0]
    : fileId.replace(/^id=/, '').trim();

  const driveViewUrl = `https://drive.google.com/file/d/${cleanId}/view`;

  return Response.redirect(driveViewUrl, 302);
};

