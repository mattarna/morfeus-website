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

    // Log for debugging (visible in Vercel logs)
    console.log("Form submission process started...");
    console.log("Slack Webhook URL configured:", !!process.env.SLACK_WEBHOOK_URL);
    console.log("Brevo API Key configured:", !!process.env.BREVO_API_KEY);

    // 1. Send Email via Brevo
    const brevoKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (brevoKey) {
      try {
        console.log("Attempting to send email via Brevo...");
        const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            // Name matched to your Brevo screenshot exactly
            sender: { name: "Morfeus", email: "noreply@morfeushub.com" },
            to: (process.env.CONTACT_EMAIL_TO || "hello@morfeushub.com,simone@morfeushub.com")
              .split(',')
              .map(email => ({ email: email.trim() })),
            subject: emailSubject,
            textContent: emailBody,
            replyTo: { email: data.email, name: data.fullName }
          }),
        });

        const responseData = await brevoResponse.text();
        if (!brevoResponse.ok) {
          console.error("Brevo error status:", brevoResponse.status);
          console.error("Brevo error body:", responseData);
        } else {
          console.log("Brevo success response:", responseData);
        }
      } catch (error) {
        console.error("Brevo fetch failed completely:", error);
      }
    }

    // 2. Send Notification to Slack
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        console.log("Attempting to send Slack notification...");
        const slackResponse = await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🚀 *New Contact Form Submission*

*📋 Contact Information*
• *Name:* ${data.fullName}
• *Email:* ${data.email}
• *Company:* ${data.company}
• *Role:* ${data.role}

*🎯 Interest & Context*
• *Services:* ${data.services.join(", ")}
• *AI Maturity:* ${data.aiMaturity}
• *Team Size:* ${data.teamSize}

*📝 Project Details*
• *Challenge:* ${data.challenge}
• *Timeline:* ${data.timeline}
• *Budget:* ${data.budget || "Not specified"}

*Notes:* ${data.notes || "None"}

──────────────────────────
*Language:* ${data.locale?.toUpperCase()} | *Time:* ${data.submittedAt}`,
          }),
        });
        
        if (!slackResponse.ok) {
          const slackError = await slackResponse.text();
          console.error("Slack error:", slackResponse.status, slackError);
        } else {
          console.log("Slack notification sent successfully");
        }
      } catch (error) {
        console.error("Slack fetch failed completely:", error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully"
    });

  } catch (error) {
    console.error("Global form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form" },
      { status: 500 }
    );
  }
}
