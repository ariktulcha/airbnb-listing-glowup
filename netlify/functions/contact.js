import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail, brandedEmail, esc } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');
  console.log('contact-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));
  const name = esc(fields.name || 'there');
  try {
    await notifyRyan({ type: 'contact message', fields, subject: `Contact form — ${fields.subject || fields.email || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'I got your message',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nThanks — I got your message and I’ll reply personally from Ryan@listingglowstudio.com.\n\nRyan\nListing Glow Studio`,
        html: brandedEmail({
          heading: 'I got your message.',
          preheader: 'Thanks for reaching out — I’ll reply personally.',
          bodyHtml: `<p style="margin:0 0 16px;">Hi ${name},</p>
<p style="margin:0;">Thanks — I got your message and I’ll reply to you personally from <a href="mailto:Ryan@listingglowstudio.com" style="color:#8a5a2c;">Ryan@listingglowstudio.com</a>.</p>`
        })
      });
    }
  } catch (error) { console.error('contact-email-error', error.message); }
  return redirect('/thank-you/');
}
