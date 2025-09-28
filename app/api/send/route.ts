import React from "react"
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { ContactEmail } from '@/hooks/contact-email'

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

const sendRouteSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(2),
});

export async function POST(req: NextRequest) {
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
      from: `Contact Form <onboarding@resend.dev>`,
      to: ['amirumanserver@gmail.com'],
      subject: `New Message from ${fullName}`,
      react: ContactEmail({ fullName, email, message }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ message: "Email sending failed", error }, { status: 400 });
    }

    return NextResponse.json({ message: "Email sent successfully", data }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ message: "Failed to send email", error }, { status: 500 });
  }
}