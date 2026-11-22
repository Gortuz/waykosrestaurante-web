// Datos del negocio: única fuente para SEO, contacto, mapas y horario
export const SITE_URL = 'https://waykosrestaurante.com';
export const SITE_NAME = "Wayko's Restaurante Rural";

export const WHATSAPP_NUMBER: string = import.meta.env.PUBLIC_WHATSAPP_NUMBER || '593969143757';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const PHONE = `+${WHATSAPP_NUMBER}`;

export const INSTAGRAM_URL = 'https://www.instagram.com/waykosrestaurante/';
export const FACEBOOK_URL = 'https://www.facebook.com/waykosrestaurante';

export const GEO = { lat: 0.2858276, lng: -78.1106109 };
export const GOOGLE_MAPS_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.76867422638!2d-78.1106109!3d0.2858276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2a1802839c0005%3A0x5646ba7265b2f694!2sWayko's!5e0!3m2!1ses!2sec!4v1789878435237!5m2!1ses!2sec";
export const GOOGLE_MAPS_NAV_URL = `https://maps.google.com/?q=Wayko's&ll=${GEO.lat},${GEO.lng}`;
export const WAZE_NAV_URL = `https://waze.com/ul?ll=${GEO.lat},${GEO.lng}&navigate=yes`;

// Horario de atención (además de feriados). Días con numeración de Date.getDay(): 0 = domingo
export const OPENING_HOURS = {
  days: ['Friday', 'Saturday', 'Sunday'],
  dayNumbers: [5, 6, 0],
  opens: '11:00',
  closes: '18:00',
  lastBooking: '17:00',
};

export const MENU_PDF_PATH = '/menu.pdf';
