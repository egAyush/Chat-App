// import React from 'react'

import TimeAgo from 'timeago-react';
import ProfileAvatar from '../../dashboard/ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import PresenceDot from '../../PresenceDot';
import { Button } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room.context';
import { memo } from 'react';
import { auth } from '../../../misc/firebase';
import { useHover, useMediaQuery } from '../../../misc/custom-hook';
import IconBtnControl from './IconBtnControl';
import ImgBtnModal from './ImgBtnModal';

const renderFileMsg = files => {
  if (files.contentType.includes('image')) {
    return (
      <div className="height-220">
        <ImgBtnModal src={files.url} fileName={files.name} />
      </div>
    );
  }

  return <a href={files.url}>Download {files.name}</a>;
};

const MessageItem = ({ message, handleAdmin, handleLike, handleDelete }) => {
  const { author, createdAt, text, files, likes, likeCount } = message;

  const [selfRef, isHovered] = useHover();
  const isMobile = useMediaQuery('(max-width : 992px)');

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const canShowIcons = isMobile || isHovered;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
      <div className="d-flex align-items-center font-bolder mb-1">
        <PresenceDot uid={author.uid} />

        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />

        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button block onClick={() => handleAdmin(author.uid)} color="blue">
              {isMsgAuthorAdmin
                ? 'Romove admin permission'
                : 'Give admin in this room'}
            </Button>
          )}
        </ProfileInfoBtnModal>

        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2 "
        />

        <IconBtnControl
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="like this message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />

        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete this message"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>

      <div>
        {text && <span className="word-break-all">{text}</span>}

        {files && renderFileMsg(files)}
      </div>
    </li>
  );
};

export default memo(MessageItem);
