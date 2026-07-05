import { parseFields, sendEmail, notifyRyan, redirect, methodGuard, isEmail, brandedEmail, esc } from './email-utils.js';

export async function handler(event) {
  const guard = methodGuard(event);
  if (guard) return guard;
  const fields = parseFields(event);
  if (fields['bot-field']) return redirect('/thank-you/');
  console.log('order-submission', JSON.stringify({ ...fields, receivedAt: new Date().toISOString() }));
  const name = esc(fields.name || 'there');
  try {
    await notifyRyan({ type: '$300 Listing Glow-Up order request', fields, subject: `Order request — ${fields.city || fields['airbnb-url'] || fields.email || 'Listing Glow Studio'}` });
    if (isEmail(fields.email)) {
      await sendEmail({
        to: fields.email,
        subject: 'Your Listing Glow-Up request is in',
        replyTo: process.env.RESEND_REPLY_TO || 'Ryan@listingglowstudio.com',
        text: `Hi ${fields.name || 'there'},\n\nThanks — I’ve got your $300 Listing Glow-Up request. Here’s what happens next: I’ll check the listing myself, confirm it’s a good fit, tell you exactly what I need from you, and send you a real preview — all before any payment is taken.\n\nI’ll be in touch shortly.\n\nRyan\nListing Glow Studio`,
        html: brandedEmail({
          heading: 'Your glow-up request is in.',
          preheader: 'Here’s exactly what happens next — and you’ll see a preview before you pay.',
          bodyHtml: `<p style="margin:0 0 16px;">Hi ${name},</p>
<p style="margin:0 0 16px;">Thanks — I’ve got your <strong>$300 Listing Glow-Up</strong> request. Here’s exactly what happens next:</p>
<ol style="margin:0 0 16px;padding-left:20px;">
  <li style="margin-bottom:8px;">I review your listing myself and confirm it’s a good fit.</li>
  <li style="margin-bottom:8px;">I tell you exactly what I need from you.</li>
  <li style="margin-bottom:0;">You see a real preview — all before any payment is taken.</li>
</ol>
<p style="margin:0;">I’ll be in touch shortly.</p>`
        })
      });
    }
  } catch (error) { console.error('order-email-error', error.message); }
  return redirect('/thank-you/');
}
