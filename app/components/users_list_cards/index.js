"use client";
import React from 'react';
import Image from 'next/image';

export const UserCard = ({ user, onUpdateUser, onDeleteUser }) => {
  return (
    <div className="explore-user-list-cards" key={user.id}>
      <div className="user-list-image">
        <Image src={user.avatar} alt={user.name} width={300} height={304.5} />
      </div>
      <div className="mock-user-list-text">
        <div className="user-list-info-wrapper">
          <div className="user-list-name-desc">
            <div className="user-list-name">
              <p>{user.name}</p>
            </div>
            <div className="user-list-description">
              <p>{user.description?.length > 70 ? `${user.description.substring(0, 50)}...` : user.description}</p>
            </div>
          </div>
          <div className="user-list-vehicle">
            <p>{user.vehicle}</p>
          </div>
        </div>
        <div className="user-list-action">
          <button onClick={() => onUpdateUser(user)}>Update</button>
          <button onClick={() => onDeleteUser(user)}>Delete</button>
        </div>
      </div>
    </div>
  );
};
