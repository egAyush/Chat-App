// import React from 'react'

import { useState } from 'react';
import { auth } from '../../misc/firebase';
import firebase from 'firebase/app';

import { Tag, Icon, Button, Alert } from 'rsuite';

const ProviderBlock = () => {
  //   console.log(auth.currentUser);

  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return { ...p, [providerId]: value };
    });
  };

  const unlink = async providerId => {
    try {
      if (auth.currentUser.providerData.length === 1) {
        throw new Error(`You can't disconnect from ${providerId}`);
      }

      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);
      Alert.info(`Disconnecte from ${providerId}`, 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const unlinkFacebook = () => {
    unlink('facebook.com');
  };

  const unlinKGoogle = () => {
    unlink('google.com');
  };

  const link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);

      Alert.info(`Linked to ${provider.providerId}`, 4000);

      updateIsConnected(provider.providerId, true);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const linkFacebook = () => {
    link(new firebase.auth.FacebookAuthProvider());
  };
  const linKGoogle = () => {
    link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag color="green" closable onClose={unlinKGoogle}>
          <Icon icon="google" /> Connected
        </Tag>
      )}

      {isConnected['facebook.com'] && (
        <Tag color="blue" closable onClose={unlinkFacebook}>
          <Icon icon="facebook" /> Connected
        </Tag>
      )}

      <div className="mt-2">
        {!isConnected['google.com'] && (
          <Button block color="green" onClick={linKGoogle}>
            <Icon icon="google" /> Link to Google
          </Button>
        )}
      </div>

      <div className="mt-2">
        {!isConnected['facebook.com'] && (
          <Button block color="blue" onClick={linkFacebook}>
            <Icon icon="facebook" /> Link to facebook
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProviderBlock;
