import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail, brandedEmail, esc } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');

  console.log('listing-score-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));

  const name = esc(fields.name || 'there');
  try {
    await notifyRyan({ type: 'free listing score request', fields, subject: `New free listing score — ${fields.city || fields['airbnb-url'] || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'Got your listing score request',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nGot it — I’ll review the listing myself and look at the parts that usually create the biggest booking-confidence leak: cover photo, first five photos, title, description, captions, guest objections, and competitor context.\n\nI’ll send your notes as soon as they’re ready, usually within a day.\n\nNo fake guarantees here — the goal is to make the listing clearer and more professional so guests understand the stay faster.\n\nRyan\nListing Glow Studio`,
        html: brandedEmail({
          heading: 'Got it — I’m on your listing.',
          preheader: 'I’ll review your listing myself and send your notes, usually within a day.',
          bodyHtml: `<p style="margin:0 0 16px;">Hi ${name},</p>
<p style="margin:0 0 16px;">Got it — I’ll review the listing myself and look at the parts that usually create the biggest booking-confidence leak: cover photo, first five photos, title, description, captions, guest objections, and competitor context.</p>
<p style="margin:0 0 16px;">I’ll send your notes as soon as they’re ready, usually within a day.</p>
<p style="margin:0;">No fake guarantees here — my goal is to make the listing clearer and more professional so guests understand the stay faster.</p>`,
          ctaLabel: 'See a real before/after',
          ctaHref: 'https://listingglowstudio.com/sample/'
        })
      });
    }
  } catch (error) {
    console.error('listing-score-email-error', error.message);
  }

  return redirect('/thank-you/');
}
