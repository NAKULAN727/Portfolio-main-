import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Configure your email transporter here
    const pass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : '';
    
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Upgrades to TLS automatically via STARTTLS
      auth: {
        user: process.env.EMAIL_USER, 
        pass: pass, 
      },
      tls: {
        rejectUnauthorized: false // Bypass strict cert issues on local windows networks
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,    // Sent from your authenticated email
      to: process.env.EMAIL_USER,      // Sent TO yourself
      replyTo: email,                  // allows you to hit "reply" and email the user back directly
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
