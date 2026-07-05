import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');

  console.log('listing-score-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));

  try {
    await notifyRyan({ type: 'free listing score request', fields, subject: `New free listing score — ${fields.city || fields['airbnb-url'] || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'Got your listing score request',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nGot it — I’ll review the listing and look at the parts that usually create the biggest booking-confidence leak: cover photo, first five photos, title, description, captions, guest objections, and competitor context.\n\nI’ll send the notes as soon as they’re ready.\n\nNo fake guarantees here — the goal is to make the listing clearer and more professional so guests understand the stay faster.\n\nRyan\nListing Glow Studio`,
        html: `<p>Hi ${fields.name || 'there'},</p><p>Got it — I’ll review the listing and look at the parts that usually create the biggest booking-confidence leak: cover photo, first five photos, title, description, captions, guest objections, and competitor context.</p><p>I’ll send the notes as soon as they’re ready.</p><p>No fake guarantees here — the goal is to make the listing clearer and more professional so guests understand the stay faster.</p><p>Ryan<br/>Listing Glow Studio</p>`
      });
    }
  } catch (error) {
    console.error('listing-score-email-error', error.message);
  }

  return redirect('/thank-you/');
}
