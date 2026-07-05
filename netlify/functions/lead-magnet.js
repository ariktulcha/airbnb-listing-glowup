import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail, SCORECARD_URL } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');
  console.log('lead-magnet-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));
  try {
    await notifyRyan({ type: 'lead magnet download', fields, subject: `Scorecard lead — ${fields.email || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'Your Airbnb Listing Scorecard',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nHere is the Airbnb Listing Scorecard:\n${SCORECARD_URL}\n\nUse it to check the cover photo, first five photos, title, description, captions, and trust gaps before lowering price.\n\nRyan\nListing Glow Studio`,
        html: `<p>Hi ${fields.name || 'there'},</p><p>Here is the Airbnb Listing Scorecard:</p><p><a href="${SCORECARD_URL}">${SCORECARD_URL}</a></p><p>Use it to check the cover photo, first five photos, title, description, captions, and trust gaps before lowering price.</p><p>Ryan<br/>Listing Glow Studio</p>`
      });
    }
  } catch (error) { console.error('lead-magnet-email-error', error.message); }
  return redirect('/thank-you/');
}
