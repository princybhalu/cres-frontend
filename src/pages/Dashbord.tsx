import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  if (!user) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
        <p className="mb-2"><strong>Username:</strong> {user.username}</p>
        <p className="mb-2"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p className="mb-2"><strong>Age:</strong> {user.age}</p>
        <p className="mb-2"><strong>Date of Birth:</strong> {user.dob}</p>
      </div>
    </div>
  );
};

export default Dashboard;