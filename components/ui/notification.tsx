import { useEffect } from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onclose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onclose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onclose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onclose]);

  return (
    <Alert variant={type === 'success' ? 'default' : 'destructive'} className="mb-4">
      <AlertTitle>{type === 'success' ? 'Success' : 'Error'}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default Notification;