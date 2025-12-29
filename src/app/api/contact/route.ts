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

    // OPTION 1: Using Resend (recommended for production)
    // Uncomment and configure with your Resend API key
    /*
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'Morfeus Website <noreply@morfeushub.com>',
      to: ['hello@morfeushub.com', 'simone@morfeushub.com'],
      subject: emailSubject,
      text: emailBody,
      replyTo: data.email,
    });
    */

    // OPTION 2: Using Formspree (simple, no-code solution)
    // Uncomment and replace YOUR_FORM_ID with your Formspree form ID
    /*
    const formspreeResponse = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: emailSubject,
        ...data,
      }),
    });
    
    if (!formspreeResponse.ok) {
      throw new Error('Formspree submission failed');
    }
    */

    // For demo purposes, we return success
    // The frontend will handle the fallback mailto if needed
    return NextResponse.json({ 
      success: true, 
      message: "Form submitted successfully",
      // Include mailto as fallback data
      mailto: {
        to: "hello@morfeushub.com,simone@morfeushub.com",
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


