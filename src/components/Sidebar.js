// import React from 'react'

import DashboardToggle from './dashboard/DashboardToggle';
import CreateRoomBtnModal from './dashboard/CreateRoomBtnModal';
import { Divider } from 'rsuite';
import ChatRoomList from './rooms/ChatRoomList';
import { useEffect, useRef, useState } from 'react';

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal />
        <Divider>Join Conversation </Divider>
      </div>
      <ChatRoomList aboveElHeight={height} />
    </div>
  );
};

export default Sidebar;
