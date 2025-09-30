import React from "react"
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { ContactEmail } from '@/hooks/contact-email'

const sendRouteSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(2),
});

export async function POST(req: NextRequest) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const RESEND_FROM = process.env.RESEND_FROM || 'Contact Form <onboarding@resend.dev>'
  const RESEND_TO = process.env.CONTACT_TO_EMAIL
  if (!RESEND_API_KEY) {
    return NextResponse.json({ message: 'RESEND_API_KEY is missing' }, { status: 500 })
  }
  if (!RESEND_TO) {
    return NextResponse.json({ message: 'CONTACT_TO_EMAIL is missing' }, { status: 500 })
  }
  const resend = new Resend(RESEND_API_KEY)
  interface SendRouteRequestBody {
    fullName: string;
    email: string;
    message: string;
  }

  let fullName, email, message;
  try {
    const body: unknown = await req.json();
    const parsed = sendRouteSchema.parse(body);
    fullName = parsed.fullName;
    email = parsed.email;
    message = parsed.message;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        message: "Validation error",
        error: error.issues,
      }, { status: 400 });
    }
    return NextResponse.json({
      message: "Invalid request",
      error,
    }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: RESEND_FROM,
      to: [RESEND_TO],
      subject: `New Message from ${fullName}`,
      react: ContactEmail({ fullName, email, message }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ message: "Email sending failed", error }, { status: 400 });
    }

    return NextResponse.json({ message: "Email sent successfully", data }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error?.message || error);
    return NextResponse.json({ message: "Failed to send email" }, { status: 500 });
  }
}