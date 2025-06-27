import React from "react";



const  UserCard=({ user, onRemove })=> {
  const { fullName, email, profileUrl, city, country } = user;
  const location = city || country ? `${city || ''}, ${country || ''}` : 'Location: Not provided';

  return (
    <div className="bg-green-200 p-4 rounded shadow text-center relative">
      <img
        src={profileUrl}
        alt={fullName}
        className="w-20 h-20 rounded-full mx-auto mb-2 object-cover border"
      />
      <h2 className="font-semibold text-lg">{fullName}</h2>
      <a href={`mailto:${email}`} className="text-blue-600 text-sm block">{email}</a>
      <p className="text-sm text-gray-500 mt-1">{location}</p>
      <button
        onClick={() => onRemove(email)}
        aria-label={`Remove user ${fullName}`}
        className="absolute top-2 right-2 tevt-bold text-black-200 hover:text-red-500 text-lg cursor-pointer"
      >
        ✖
      </button>
    </div>
  );
}

export default UserCard;
