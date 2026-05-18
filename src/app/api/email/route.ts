import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const RECIPIENT_EMAIL = process.env.FORM_RECIPIENT_EMAIL || 'noreply@example.com';

// Helper: Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

// Helper: Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Helper: Validate text length (max 5000 chars)
function isValidText(text: string, maxLength: number = 5000): boolean {
  return typeof text === 'string' && text.length > 0 && text.length <= maxLength;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Validation: Ensure we have a type and data object
    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }

    // Validate sender email
    if (!isValidEmail(data.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Dynamic Subject & Body Generation
    let emailSubject = '';
    let emailHtml = '';

    switch (type) {
      case 'proposal':
        if (!isValidText(data.title, 200) || !isValidText(data.problem) || !isValidText(data.solution)) {
          return NextResponse.json({ error: 'Invalid proposal data' }, { status: 400 });
        }
        emailSubject = `🚀 New Proposal: ${escapeHtml(data.title)}`;
        emailHtml = `
          <h3>New Project Proposal</h3>
          <p><strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
          <p><strong>Title:</strong> ${escapeHtml(data.title)}</p>
          <p><strong>Category:</strong> ${escapeHtml(data.category)}</p>
          <p><strong>Involvement:</strong> ${escapeHtml(data.involvement)}</p>
          <hr />
          <h4>The Problem</h4>
          <p>${escapeHtml(data.problem)}</p>
          <h4>The Solution</h4>
          <p>${escapeHtml(data.solution)}</p>
        `;
        break;

      case 'contact':
        if (!isValidText(data.subject, 200) || !isValidText(data.message)) {
          return NextResponse.json({ error: 'Invalid contact data' }, { status: 400 });
        }
        emailSubject = `📬 Contact Inquiry: ${escapeHtml(data.subject)}`;
        emailHtml = `
          <h3>New Contact Message</h3>
          <p><strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>
          <hr />
          <h4>Message</h4>
          <p>${escapeHtml(data.message)}</p>
        `;
        break;

      case 'job':
        if (!isValidText(data.role, 200) || !isValidText(data.coverLetter)) {
          return NextResponse.json({ error: 'Invalid job application data' }, { status: 400 });
        }
        const link = escapeHtml(data.link || '');
        emailSubject = `💼 Job Application: ${escapeHtml(data.role)} - ${escapeHtml(data.name)}`;
        emailHtml = `
          <h3>New Job Application</h3>
          <p><strong>Applicant:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
          <p><strong>Role:</strong> ${escapeHtml(data.role)}</p>
          ${link ? `<p><strong>Link (CV/Portfolio):</strong> <a href="${link}" target="_blank">${link}</a></p>` : ''}
          <hr />
          <h4>Cover Letter / Pitch</h4>
          <p>${escapeHtml(data.coverLetter)}</p>
        `;
        break;

      case 'pricing':
        if (!isValidText(data.package, 200) || !isValidText(data.details)) {
          return NextResponse.json({ error: 'Invalid pricing request data' }, { status: 400 });
        }
        emailSubject = `💰 Pricing Request: ${escapeHtml(data.package)}`;
        emailHtml = `
          <h3>Project Discussion Request</h3>
          <p><strong>Client:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
          <p><strong>Interested Package:</strong> ${escapeHtml(data.package)}</p>
          <p><strong>Budget Range:</strong> ${data.budget ? escapeHtml(data.budget) : 'Not specified'}</p>
          <hr />
          <h4>Project Details</h4>
          <p>${escapeHtml(data.details)}</p>
        `;
        break;

      default:
        return NextResponse.json({ error: 'Invalid form type' }, { status: 400 });
    }

    // Send the Email
    const { error } = await resend.emails.send({
      from: 'CoBuild Forms <onboarding@resend.dev>',
      to: [RECIPIENT_EMAIL],
      replyTo: data.email,
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}