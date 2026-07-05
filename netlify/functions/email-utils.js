const DEFAULT_FROM = 'Ryan Ashford <Ryan@listingglowstudio.com>';
const DEFAULT_NOTIFY_TO = 'Ryan@listingglowstudio.com';
const SITE_URL = 'https://listingglowstudio.com';
const REPLY_EMAIL = 'Ryan@listingglowstudio.com';
export const SCORECARD_URL = 'https://listingglowstudio.com/downloads/airbnb-listing-scorecard.pdf';

/**
 * Wrap body content in a branded, email-client-safe HTML shell.
 * Table-based + inline styles so it renders in Gmail, Outlook, Apple Mail.
 * @param {object} opts
 * @param {string} opts.heading   - Big headline at the top of the card.
 * @param {string} opts.bodyHtml  - Inner HTML (paragraphs already marked up).
 * @param {string} [opts.ctaLabel]- Optional button label.
 * @param {string} [opts.ctaHref] - Optional button link.
 * @param {string} [opts.preheader] - Hidden inbox-preview text.
 */
export function brandedEmail({ heading, bodyHtml, ctaLabel, ctaHref, preheader }) {
  const button = ctaLabel && ctaHref
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px 0 6px;">
         <tr><td style="border-radius:999px;background:linear-gradient(135deg,#c9843f,#a55a24);">
           <a href="${esc(ctaHref)}" style="display:inline-block;padding:14px 30px;font-family:Georgia,'Times New Roman',serif;font-size:16px;font-weight:bold;color:#fffaf2;text-decoration:none;border-radius:999px;">${esc(ctaLabel)}</a>
         </td></tr>
       </table>`
    : '';
  const hidden = preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>`
    : '';
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#f3eadc;">
  ${hidden}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3eadc;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffaf2;border:1px solid #ded1bd;border-radius:24px;overflow:hidden;box-shadow:0 20px 50px rgba(37,32,27,.10);">
        <tr><td style="background:linear-gradient(135deg,#1c1712,#2c2118);padding:26px 32px;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="width:40px;height:40px;background:#c9843f;border-radius:50%;text-align:center;vertical-align:middle;font-family:Georgia,serif;font-size:14px;font-weight:bold;color:#fffaf2;">LG</td>
            <td style="padding-left:12px;font-family:Georgia,serif;font-size:17px;font-weight:bold;color:#fffaf2;">Listing Glow Studio</td>
          </tr></table>
        </td></tr>
        <tr><td style="height:4px;background:linear-gradient(90deg,#b7793f,#f0c38c,#53604a);font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:36px 32px 32px;">
          <h1 style="margin:0 0 18px;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.2;color:#17130f;font-weight:bold;">${esc(heading)}</h1>
          <div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:#3d352c;">${bodyHtml}</div>
          ${button}
        </td></tr>
        <tr><td style="padding:22px 32px 30px;border-top:1px solid #ece0cd;">
          <p style="margin:0 0 4px;font-family:Georgia,serif;font-size:15px;font-weight:bold;color:#17130f;">Ryan Ashford</p>
          <p style="margin:0 0 14px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:13px;color:#8a7c6b;">Listing transformation specialist · Listing Glow Studio</p>
          <p style="margin:0;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:12px;color:#a89a86;line-height:1.5;">
            <a href="${SITE_URL}" style="color:#8a5a2c;text-decoration:none;">listingglowstudio.com</a>
            &nbsp;·&nbsp;<a href="mailto:${REPLY_EMAIL}" style="color:#8a5a2c;text-decoration:none;">${REPLY_EMAIL}</a><br>
            I'm not affiliated with Airbnb, and I don't guarantee rankings, occupancy, or revenue.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

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

export function esc(value = '') {
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
