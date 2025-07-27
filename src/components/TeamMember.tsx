import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="p-6">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-center mb-1">{name}</h3>
        <p className="text-blue-600 text-center font-medium mb-3">{role}</p>
        <p className="text-gray-600 text-center">{bio}</p>
      </div>
    </div>
  );
};
