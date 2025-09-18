'use client';

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Notification from '@/components/ui/notification'

type FormInput = {
  fullName: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const { register, handleSubmit, reset } = useForm<FormInput>();
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  async function onSubmit(formData: FormInput) {
    await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        setNotification({ message: 'Your message has been sent successfully!', type: 'success' });
        reset();
      })
      .catch(() => {
        setNotification({ message: 'There was an error sending your message.', type: 'error' });
      });
  }

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onclose={handleCloseNotification}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input {...register('fullName')} placeholder="Your Name" required />
        <Input {...register('email')} type="email" placeholder="Your Email" required />
        <Textarea {...register('message')} placeholder="Your Message" required />
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}