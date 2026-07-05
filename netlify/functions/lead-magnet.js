import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail, brandedEmail, esc, SCORECARD_URL } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');
  console.log('lead-magnet-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));
  const name = esc(fields.name || 'there');
  try {
    await notifyRyan({ type: 'lead magnet download', fields, subject: `Scorecard lead — ${fields.email || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'Your Airbnb Listing Scorecard',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nHere’s the Airbnb Listing Scorecard — the same one I use to grade listings:\n${SCORECARD_URL}\n\nUse it to check the cover photo, first five photos, title, description, captions, and trust gaps before you lower your price.\n\nWhen you want me to run it on your actual listing, just reply to this email.\n\nRyan\nListing Glow Studio`,
        html: brandedEmail({
          heading: 'Here’s your Listing Scorecard.',
          preheader: 'The same scorecard I use to grade listings — grab it below.',
          bodyHtml: `<p style="margin:0 0 16px;">Hi ${name},</p>
<p style="margin:0 0 16px;">Here’s the Airbnb Listing Scorecard — the same one I use to grade listings. Use it to check the cover photo, first five photos, title, description, captions, and trust gaps <strong>before you lower your price.</strong></p>
<p style="margin:0;">When you want me to run it on your actual listing, just reply to this email.</p>`,
          ctaLabel: 'Download the scorecard',
          ctaHref: SCORECARD_URL
        })
      });
    }
  } catch (error) { console.error('lead-magnet-email-error', error.message); }
  return redirect('/thank-you/');
}
