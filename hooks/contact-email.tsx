import * as React from 'react';
import { Html, Body, Container, Heading, Text } from '@react-email/components';

interface ContactEmailProps {
  fullName: string;
  email: string;
  message: string;
}

export const ContactEmail: React.FC<ContactEmailProps> = ({ fullName, email, message }) => (
  <Html>
    <Body>
      <Container>
        <Heading>New Message from {fullName}</Heading>
        <Text>Email: {email}</Text>
        <Text>Message: {message}</Text>
      </Container>
    </Body>
  </Html>
);