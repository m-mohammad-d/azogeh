import React from "react";

interface UserCardProps {
  name: string;
  email: string;
  onBan: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, email, onBan }) => {
  return (
    <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img
        src="https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png"
        alt={`${name}'s profile`}
        className="w-16 h-16 rounded-full object-cover mr-4"
        onError={e => (e.currentTarget.src = "path/to/default-image.jpg")}
      />
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-xs text-gray-500">{email}</p>
      </div>
      <button onClick={onBan} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
        بن
      </button>
    </div>
  );
};

export default UserCard;
