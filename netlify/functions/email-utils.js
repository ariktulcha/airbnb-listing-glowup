const DEFAULT_FROM = 'Ryan Ashford <Ryan@listingglowstudio.com>';
const DEFAULT_NOTIFY_TO = 'Ryan@listingglowstudio.com';
export const SCORECARD_URL = 'https://listingglowstudio.com/downloads/airbnb-listing-scorecard.pdf';

export function parseFields(event) {
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '');
  const contentType = event.headers?.['content-type'] || event.headers?.['Content-Type'] || '';
  if (contentType.includes('application/json')) {
    try { return JSON.parse(raw || '{}'); } catch { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(raw));
}

function esc(value = '') {
  return String(value).replace(/[&<>"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
}

function textList(fields) {
  return Object.entries(fields)
    .filter(([key, value]) => value && key !== 'bot-field' && key !== 'form-name')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}

function htmlList(fields) {
  return `<dl>${Object.entries(fields)
    .filter(([key, value]) => value && key !== 'bot-field' && key !== 'form-name')
    .map(([key, value]) => `<dt><strong>${esc(key)}</strong></dt><dd>${esc(value)}</dd>`)
    .join('')}</dl>`;
}

export function isEmail(value = '') {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export async function sendEmail({ to, subject, text, html, replyTo }) {
  if (!process.env.RESEND_API_KEY) {
    console.log('resend-disabled', JSON.stringify({ to, subject, reason: 'missing RESEND_API_KEY' }));
    return { skipped: true, reason: 'missing RESEND_API_KEY' };
  }
  const payload = {
    from: process.env.RESEND_FROM || DEFAULT_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    text,
    html,
    ...(replyTo ? { reply_to: replyTo } : {})
  };
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const resultText = await response.text();
  if (!response.ok) {
    console.error('resend-error', response.status, resultText);
    throw new Error(`Resend failed with ${response.status}`);
  }
  console.log('resend-sent', resultText);
  return { ok: true, resultText };
}

export async function notifyRyan({ type, fields, subject }) {
  const to = process.env.RESEND_NOTIFY_TO || DEFAULT_NOTIFY_TO;
  return sendEmail({
    to,
    subject: subject || `New ${type} — Listing Glow Studio`,
    replyTo: isEmail(fields.email) ? fields.email : undefined,
    text: `New ${type}\n\n${textList(fields)}\n\nReceived: ${new Date().toISOString()}`,
    html: `<h2>New ${esc(type)}</h2>${htmlList(fields)}<p><strong>Received:</strong> ${new Date().toISOString()}</p>`
  });
}

export function redirect(location = '/thank-you/') {
  return { statusCode: 303, headers: { Location: location }, body: '' };
}

export function methodGuard(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: 'Method Not Allowed' };
  }
  return null;
}
