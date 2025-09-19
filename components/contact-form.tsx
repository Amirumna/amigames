'use client';

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Notification from '@/components/ui/notification'

type FormInput = {
  fullName: string;
  email: string;
  message: string;
};

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactForm({ open, onClose }: ContactFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInput>();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  async function onSubmit(formData: FormInput) {
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json() as { message?: string; error?: any };

      if (res.ok) {
        setNotification({ message: 'Your message has been sent successfully!', type: 'success' });
        reset();
      } else {
        setNotification({
          message: `Error: ${data.message}${data.error ? `\n${JSON.stringify(data.error, null, 2)}` : ''}`,
          type: 'error'
        });
      }
    } catch (error: any) {
      setNotification({
        message: `There was an error sending your message. ${error?.message ? error.message : ''}`,
        type: 'error'
      });
    }
  }

  const handleCloseNotification = () => {
    setNotification(null);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
    >
      <div className="liquid-glass-header rounded-2xl shadow-2xl p-4 sm:p-8 w-full max-w-md relative border border-gray-800 mx-2">
        <button
          className="absolute top-3 right-3 text-gray-300 hover:text-lime-400 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close contact form"
        >
          ×
        </button>
        <h2
          id="contact-dialog-title"
          className="text-2xl font-bold mb-4 text-white tracking-wide"
        >
          Contact Me
        </h2>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onclose={handleCloseNotification}
          />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            {...register('fullName', { required: "Name is required" })}
            placeholder="Your Name"
            className="border border-gray-700 bg-gray-900/70 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400"
          />
          {errors.fullName && <span className="text-red-400 text-xs">{errors.fullName.message}</span>}
          <Input
            {...register('email', {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address"
              }
            })}
            type="email"
            placeholder="Your Email"
            className="border border-gray-700 bg-gray-900/70 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400"
          />
          {errors.email && <span className="text-red-400 text-xs">{errors.email.message}</span>}
          <Textarea
            {...register('message', { required: "Message is required" })}
            placeholder="Your Message"
            className="border border-gray-700 bg-gray-900/70 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-lime-400"
            rows={4}
          />
          {errors.message && <span className="text-red-400 text-xs">{errors.message.message}</span>}
          <Button type="submit" className="bg-lime-400 text-black font-medium rounded-lg px-6 py-2.5 hover:bg-lime-300 transition-all">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}