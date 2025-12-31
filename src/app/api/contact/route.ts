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

    // 1. Send Email to Team via Brevo
    const brevoKey = process.env.BREVO_API_KEY_V2 || process.env.BREVO_API_KEY;
    if (brevoKey) {
      try {
        console.log("Attempting to send email via Brevo...");
        
        // --- 1a. Notification to Morfeus Team ---
        const teamResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoKey,
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

        // --- 1b. Confirmation to the Client ---
        const clientFirstName = data.fullName.split(' ')[0];
        const clientSubject = data.locale === 'it' 
          ? `Richiesta ricevuta - Benvenuto in Morfeus, ${clientFirstName}`
          : `Request Received - Welcome to Morfeus, ${clientFirstName}`;

        const clientHtmlContent = `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border: 1px solid #333;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: #a855f7; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">MORFEUS</h1>
              <div style="height: 1px; background: linear-gradient(90deg, transparent, #a855f7, transparent); margin-top: 10px;"></div>
            </div>
            
            <p style="font-size: 16px; line-height: 1.6; color: #ccc;">
              ${data.locale === 'it' 
                ? `Ciao <strong>${clientFirstName}</strong>,` 
                : `Hello <strong>${clientFirstName}</strong>,`}
            </p>
            
            <p style="font-size: 18px; line-height: 1.6;">
              ${data.locale === 'it'
                ? "Abbiamo ricevuto la tua richiesta di trasformazione. Il nostro team sta già analizzando la tua sfida per capire come l'AI può accelerare il tuo business."
                : "We have received your transformation request. Our team is already analyzing your challenge to understand how AI can accelerate your business."}
            </p>

            <div style="background-color: #111; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #a855f7;">
              <p style="margin: 0; color: #999; font-size: 14px; text-transform: uppercase;">${data.locale === 'it' ? "Cosa succede ora?" : "What happens next?"}</p>
              <p style="margin: 10px 0 0 0; color: #fff; line-height: 1.5;">
                ${data.locale === 'it'
                  ? "Entro 24/48 ore verrai ricontattato da uno dei nostri esperti per fissare un breve incontro conoscitivo."
                  : "Within 24/48 hours, one of our experts will contact you to schedule a brief introductory meeting."}
              </p>
            </div>

            <p style="font-size: 14px; color: #666; font-style: italic; margin-top: 40px; text-align: center;">
              ${data.locale === 'it'
                ? "Preparati a ridefinire i tuoi limiti."
                : "Get ready to redefine your limits."}
            </p>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #222;">
              <p style="font-size: 12px; color: #444; margin: 0;">&copy; 2025 MORFEUS HUB. All rights reserved.</p>
            </div>
          </div>
        `;

        await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': brevoKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: "Morfeus Hub", email: "hello@morfeushub.com" },
            to: [{ email: data.email, name: data.fullName }],
            subject: clientSubject,
            htmlContent: clientHtmlContent
          }),
        });

        const responseData = await teamResponse.text();
        if (!teamResponse.ok) {
          console.error("Brevo error status:", teamResponse.status);
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
