// import React from 'react';

import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';
import { Alert } from 'rsuite';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');

    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());
        setMessages(data);
      });

    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

  const handleAdmin = useCallback(
    async uid => {
      const adminsRef = database.ref(`/rooms/${chatId}/admins`);
      let alerMsg;

      await adminsRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alerMsg = 'Admin permission removed';
          } else {
            admins[uid] = true;
            alerMsg = 'Admin permission granted';
          }
        }

        return admins;
      });

      Alert.info(alerMsg, 4000);
    },
    [chatId]
  );

  return (
    <div className="msg-list custom-scroll">
      {isChatEmpty && <li>No messages yet </li>}

      {canShowMessages &&
        messages.map(msg => (
          <MessageItem key={msg.id} message={msg} handleAdmin={handleAdmin} />
        ))}
    </div>
  );
};

export default Messages;
