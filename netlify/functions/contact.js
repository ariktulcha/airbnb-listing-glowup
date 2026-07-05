import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');
  console.log('contact-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));
  try {
    await notifyRyan({ type: 'contact message', fields, subject: `Contact form — ${fields.subject || fields.email || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'Ryan got your message',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nThanks — I got your message and will reply from Ryan@listingglowstudio.com.\n\nRyan\nListing Glow Studio`,
        html: `<p>Hi ${fields.name || 'there'},</p><p>Thanks — I got your message and will reply from <a href="mailto:Ryan@listingglowstudio.com">Ryan@listingglowstudio.com</a>.</p><p>Ryan<br/>Listing Glow Studio</p>`
      });
    }
  } catch (error) { console.error('contact-email-error', error.message); }
  return redirect('/thank-you/');
}
