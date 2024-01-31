
import React from 'react';
import { getUser } from '../../features/auth/authSlice';
import avatar from '../../assets/avatar.png'
import emailPng from '../../assets/email.png'

const Profile = () => {
    const { user } = getUser()
    return (
        <div className="flex items-center justify-center min-h-page ">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full grid place-content-center ">
                <img
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                    src={user.picture[0] || avatar}
                    alt="Profile Picture"
                />
                <h1 className="text-2xl font-bold text-teal-600 mb-2 text-center capitalize">{user.name}</h1>
                <div className="text-gray-600 mb-6f flex items-center gap-2">
                    <img src={emailPng} alt="email icon" width="25px" height="25px" />
                    <span>{user.email}</span></div>

            </div>
        </div>
    );
};

export default Profile;
