import { NextResponse } from 'next/server';

// Helper: Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Validate required environment variables - return early if missing
    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_LIST_ID;

    if (!apiKey || !listId) {
      console.error('Missing required environment variables: BREVO_API_KEY or BREVO_LIST_ID');
      return NextResponse.json({ error: 'Service configuration error' }, { status: 500 });
    }

    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    // Forward Brevo error message to client and log full response for debugging
    if (!res.ok) {
      const errorData = await res.json();
      console.error('BREVO API ERROR:', JSON.stringify(errorData, null, 2));
      return NextResponse.json({ error: errorData.message || 'Failed to subscribe' }, { status: res.status });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}