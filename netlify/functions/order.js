import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');
  console.log('order-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));
  try {
    await notifyRyan({ type: '$300 Listing Glow-Up order request', fields, subject: `Order request — ${fields.city || fields['airbnb-url'] || fields.email || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'Your Listing Glow-Up request is in',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nThanks — I got your $300 Listing Glow-Up request. I’ll check the listing, confirm fit and asset requirements, and send the next step before any payment is taken.\n\nRyan\nListing Glow Studio`,
        html: `<p>Hi ${fields.name || 'there'},</p><p>Thanks — I got your $300 Listing Glow-Up request. I’ll check the listing, confirm fit and asset requirements, and send the next step before any payment is taken.</p><p>Ryan<br/>Listing Glow Studio</p>`
      });
    }
  } catch (error) { console.error('order-email-error', error.message); }
  return redirect('/thank-you/');
}
