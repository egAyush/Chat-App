// import React from 'react';

import { Button, Icon, Drawer } from 'rsuite';
import { useModelState } from '../../misc/custom-hook';
import Dashboard from '.';
const DashboardToggle = () => {
  const { isOpen, open, close } = useModelState();

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashborad" /> Dashboard
      </Button>

      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
