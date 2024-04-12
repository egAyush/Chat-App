// import React from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';
import { useMediaQuery, useModelState } from '../../misc/custom-hook';
import Dashboard from '.';
import { useCallback } from 'react';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, open, close } = useModelState();
  const isMobile = useMediaQuery('(max-width : 992px)');

  const onSignOut = useCallback(() => {
    auth.signOut();

    Alert.info('Signed Out', 4000);

    close();
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashborad" /> Dashboard
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
