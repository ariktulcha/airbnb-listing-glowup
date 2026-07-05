# Email and domain setup — Listing Glow Studio

## Current verified state

- Production site on Netlify: `listing-glowup-studio`
- Public domain: `https://listingglowstudio.com`
- DNS nameservers: Cloudflare (`sierra.ns.cloudflare.com`, `huxley.ns.cloudflare.com`)
- Current MX records point to Namecheap forwarding (`eforward*.registrar-servers.com`)
- No `RESEND_API_KEY` is currently configured in Netlify env vars.

## App-side email flows now wired

All forms are implemented as Netlify Functions. If `RESEND_API_KEY` is missing, the request is still logged in Netlify Function logs and the user is redirected to `/thank-you/`.

1. Contact form: `/contact/` → `/.netlify/functions/contact`
2. Order request form: `/order/` → `/.netlify/functions/order`
3. Free listing score form: `/score/` → `/.netlify/functions/listing-score`
4. Lead magnet form: site CTA → `/.netlify/functions/lead-magnet`

## Required Resend variables

Set these in Netlify for the `listing-glowup-studio` site:

```bash
netlify env:set RESEND_API_KEY 're_...'
netlify env:set RESEND_FROM 'Ryan Ashford <Ryan@listingglowstudio.com>'
netlify env:set RESEND_REPLY_TO 'Ryan@listingglowstudio.com'
netlify env:set RESEND_NOTIFY_TO 'Ryan@listingglowstudio.com'
```

## DNS records still needed for Resend

In Resend, add and verify `listingglowstudio.com`. Resend will provide DKIM/SPF/return-path DNS records. Add those records in Cloudflare. Do not remove the existing MX records unless changing the inbox provider.

## Inbox for Ryan@listingglowstudio.com

Resend handles outbound sending; it is not a full mailbox. The domain currently has Namecheap email-forwarding MX records. To make `Ryan@listingglowstudio.com` a real receive-capable address, configure one of these:

- Namecheap Private Email mailbox or forwarding alias
- Google Workspace mailbox
- Zoho Mail mailbox
- Cloudflare Email Routing alias to Arik's preferred inbox

After the mailbox/alias exists, send a real test email to `Ryan@listingglowstudio.com` and reply to a form autoresponder.
