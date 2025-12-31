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
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #050505; color: #ffffff; padding: 0; border: 1px solid #1a1a1a;">
            <!-- Header with Logo -->
            <div style="padding: 40px 20px; text-align: center; background-color: #000000;">
              <img src="https://www.morfeushub.com/icon.png" alt="Morfeus Logo" style="width: 80px; height: 80px; margin-bottom: 20px;">
              <h1 style="color: #ffffff; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; margin: 0; font-weight: 300;">MORFEUS</h1>
              <div style="height: 1px; width: 60px; background-color: #a855f7; margin: 20px auto;"></div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <p style="font-size: 16px; line-height: 1.6; color: #a0a0a0; margin-bottom: 30px;">
                ${data.locale === 'it' 
                  ? `Gentile <strong>${clientFirstName}</strong>,` 
                  : `Dear <strong>${clientFirstName}</strong>,`}
              </p>
              
              <h2 style="font-size: 22px; line-height: 1.4; color: #ffffff; font-weight: 400; margin-bottom: 20px;">
                ${data.locale === 'it'
                  ? "La tua richiesta di trasformazione è stata presa in carico."
                  : "Your transformation request has been successfully received."}
              </h2>

              <p style="font-size: 16px; line-height: 1.8; color: #d1d1d1; margin-bottom: 30px;">
                ${data.locale === 'it'
                  ? "In Morfeus, crediamo che l'intelligenza artificiale non sia solo uno strumento, ma un moltiplicatore di potenziale umano. Il nostro team sta già analizzando i dettagli della tua sfida per delineare il percorso più efficace verso i tuoi obiettivi."
                  : "At Morfeus, we believe AI is not just a tool, but a multiplier of human potential. Our team is already analyzing your challenge details to outline the most effective path toward your goals."}
              </p>

              <!-- Next Steps Box -->
              <div style="background-color: #0a0a0a; padding: 25px; border: 1px solid #1a1a1a; border-radius: 4px; margin: 40px 0;">
                <p style="margin: 0 0 15px 0; color: #a855f7; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">
                  ${data.locale === 'it' ? "Prossimi Passaggi" : "What to expect"}
                </p>
                <p style="margin: 0; color: #ffffff; line-height: 1.6; font-size: 15px;">
                  ${data.locale === 'it'
                    ? "Entro le prossime 24/48 ore, un nostro Solution Architect ti contatterà personalmente per approfondire la tua visione e discutere le prime opportunità d'azione."
                    : "Within the next 24/48 hours, one of our Solution Architects will contact you personally to explore your vision and discuss the first opportunities for action."}
                </p>
              </div>

              <p style="font-size: 16px; line-height: 1.8; color: #d1d1d1;">
                ${data.locale === 'it'
                  ? "Siamo pronti ad andare oltre. Benvenuto a bordo."
                  : "We are ready to go beyond. Welcome aboard."}
              </p>

              <p style="margin-top: 50px; font-size: 14px; color: #a855f7; font-weight: 500; letter-spacing: 1px;">
                Team Morfeus Hub
              </p>
            </div>

            <!-- Footer -->
            <div style="padding: 30px; background-color: #000000; text-align: center; border-top: 1px solid #1a1a1a;">
              <p style="font-size: 11px; color: #444444; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
                Artificial Intelligence • Strategic Transformation • Human Potential
              </p>
              <div style="margin-top: 20px;">
                <a href="https://www.morfeushub.com" style="color: #666666; text-decoration: none; font-size: 11px;">www.morfeushub.com</a>
              </div>
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
