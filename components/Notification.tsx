import React, { useEffect } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-0 right-0 mx-auto max-w-md z-50">
      <div className="bg-orange-500 text-white px-4 py-3 rounded-lg shadow-lg animate-fade-in text-center">
        {message}
      </div>
    </div>
  );
};

export default Notification;
