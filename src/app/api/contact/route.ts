import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Format the email content
    const emailSubject = `New Request from ${data.fullName} - ${data.company}`;
    
    const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW MORFEUS CONSULTATION REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 CONTACT INFORMATION
─────────────────────────────────────────
Name:      ${data.fullName}
Email:     ${data.email}
Company:   ${data.company}
Role:      ${data.role}

🎯 INTEREST & CONTEXT
─────────────────────────────────────────
Services:     ${data.services.join(", ")}
AI Maturity:  ${data.aiMaturity}
Team Size:    ${data.teamSize}

📝 PROJECT DETAILS
─────────────────────────────────────────
Challenge:
${data.challenge}

Timeline:  ${data.timeline}
Budget:    ${data.budget || "Not specified"}

Additional Notes:
${data.notes || "None"}

─────────────────────────────────────────
Submitted at: ${data.submittedAt}
Language: ${data.locale?.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // For now, we'll use a mailto fallback approach
    // In production, you'd integrate with:
    // - Resend (resend.com) - Modern email API
    // - SendGrid - Enterprise email
    // - Nodemailer with SMTP
    // - Formspree/Getform - Simple form backend

    // Log the submission (useful for debugging)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📧 NEW CONTACT FORM SUBMISSION");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(emailBody);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // 1. Send Email via Brevo
    if (process.env.BREVO_API_KEY) {
      try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: "Morfeus Website", email: "noreply@morfeushub.com" },
            to: (process.env.CONTACT_EMAIL_TO || "hello@morfeushub.com,simone@morfeushub.com")
              .split(',')
              .map(email => ({ email: email.trim() })),
            subject: emailSubject,
            textContent: emailBody,
            replyTo: { email: data.email, name: data.fullName }
          }),
        });

        if (!brevoResponse.ok) {
          const errorData = await brevoResponse.json();
          console.error("Brevo API error:", errorData);
        }
      } catch (error) {
        console.error("Failed to send email via Brevo:", error);
      }
    }

    // 2. Send Notification to Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚀 *New Contact Form Submission*\n\n*From:* ${data.fullName} (${data.company})\n*Email:* ${data.email}\n*Challenge:* ${data.challenge}\n\n_Check email for full details._`,
          }),
        });
      } catch (error) {
        console.error("Failed to send Slack notification:", error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully",
      mailto: {
        to: process.env.CONTACT_EMAIL_TO || "hello@morfeushub.com,simone@morfeushub.com",
        subject: emailSubject,
        body: emailBody,
      }
    });

  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    );
  }
}


