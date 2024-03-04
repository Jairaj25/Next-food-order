"use client";
import "./index.css";
import React from 'react';
import Image from 'next/image';

export const mockApiCards = ({ currentUsers }) => {
    return (
        <div className="explore-food-list-wrapper">
            {currentUsers.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.description}</p>
                    <Image src={user.avatar} alt={user.name} width={300} height={304.5} />
                    <p>Vehicle: {user.vehicle}</p>
                </div>
            ))}
        </div>
    )
}