interface InquiryEnvironment {
  RESEND_API_KEY?: string;
}

interface InquiryPayload {
  name?: unknown;
  company?: unknown;
  country?: unknown;
  email?: unknown;
  phone?: unknown;
  inquiryType?: unknown;
  message?: unknown;
  website?: unknown;
}

const allowedInquiryTypes = new Set([
  'Product Inquiry',
  'Quote Request',
  'Distribution Partnership',
  'Other',
]);

const fieldLimits = {
  name: 120,
  company: 160,
  country: 120,
  email: 254,
  phone: 60,
  inquiryType: 80,
  message: 5000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=UTF-8',
      'cache-control': 'no-store',
    },
  });
}

function readText(
  value: unknown,
  field: keyof typeof fieldLimits,
): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed.length <= fieldLimits[field]
    ? trimmed
    : null;
}

function normalizeSubjectPart(value: string) {
  return value.replace(/[\r\n]+/g, ' ').slice(0, 120);
}

export const onRequestPost = async ({
  request,
  env,
}: {
  request: Request;
  env: InquiryEnvironment;
}) => {
  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return jsonResponse({ error: 'Email service is not configured.' }, 503);
  }

  let payload: InquiryPayload;
  try {
    payload = (await request.json()) as InquiryPayload;
  } catch {
    return jsonResponse({ error: 'Invalid request body.' }, 400);
  }

  // This field is not shown to visitors. A filled honeypot indicates a bot;
  // return success without sending mail so the endpoint does not teach bots
  // which validation rule they triggered.
  if (typeof payload.website === 'string' && payload.website.trim()) {
    return jsonResponse({ ok: true });
  }

  const name = readText(payload.name, 'name');
  const company = readText(payload.company, 'company');
  const country = readText(payload.country, 'country');
  const email = readText(payload.email, 'email');
  const phone = readText(payload.phone, 'phone');
  const inquiryType = readText(payload.inquiryType, 'inquiryType');
  const message = readText(payload.message, 'message');

  if (
    !name ||
    !company ||
    !country ||
    !email ||
    !phone ||
    !inquiryType ||
    !message ||
    !emailPattern.test(email) ||
    !allowedInquiryTypes.has(inquiryType)
  ) {
    return jsonResponse({ error: 'Please check the inquiry fields.' }, 400);
  }

  const recipient =
    inquiryType === 'Quote Request'
      ? 'orders@powerlinkus.com'
      : 'info@powerlinkus.com';
  const subject = `[POWERLYNX] ${normalizeSubjectPart(inquiryType)} — ${normalizeSubjectPart(name)}`;
  const text = [
    'POWERLYNX — Website inquiry',
    '',
    `Full Name: ${name}`,
    `Company: ${company}`,
    `Country: ${country}`,
    `Email Address: ${email}`,
    `Phone Number: ${phone}`,
    `Inquiry Type: ${inquiryType}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: 'POWERLYNX Website <website@mail.powerlinkus.com>',
      to: [recipient],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!resendResponse.ok) {
    console.error('Resend rejected inquiry', {
      status: resendResponse.status,
      response: await resendResponse.text(),
    });
    return jsonResponse(
      { error: 'Unable to send the inquiry right now.' },
      502,
    );
  }

  return jsonResponse({ ok: true });
};