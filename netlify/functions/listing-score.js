exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST' },
      body: 'Method Not Allowed'
    };
  }

  const body = event.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '');

  const fields = Object.fromEntries(new URLSearchParams(body));

  // Temporary capture until Resend is connected: visible in Netlify Function logs.
  // Do not log secrets; this form only collects listing/contact details supplied by the host.
  console.log('listing-score-submission', JSON.stringify({
    airbnbUrl: fields['airbnb-url'] || '',
    contact: fields.contact || '',
    city: fields.city || '',
    properties: fields.properties || '',
    priority: fields.priority || '',
    notes: fields.notes || '',
    receivedAt: new Date().toISOString()
  }));

  return {
    statusCode: 303,
    headers: { Location: '/thank-you/' },
    body: ''
  };
};
