import { useState, useEffect } from 'react';
import bus from '../../utils/bus';

import styles from './Message.module.css';

const Message = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    bus.addListener('flashMessage', ({ message, type }) => {
      setVisible(true);
      setMessage(message);
      setType(type);

      setTimeout(() => {
        setVisible(false);
      }, 3000);
    });
  }, []);

  return (
    visible && (
      <div className={`${styles.message} ${styles[type]}`}>
        <span>{message}</span>
      </div>
    )
  );
};

export default Message;
