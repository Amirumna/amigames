import { useEffect } from 'react';
import { Alert, AlertTitle } from '@/components/ui/alert';

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
    <Alert variant={type === 'success' ? 'default' : 'destructive'}>
      <AlertTitle>{type === 'success' ? 'Success' : 'Error'}</AlertTitle>
      {message}
    </Alert>
  );
};

export default Notification;