import React from 'react';

const ContactCard = React.memo(({ contact, onDelete }) => {
  return (
    <div className="border p-4 mb-2 rounded shadow">
      <h3 className="text-lg font-semibold">{contact.name}</h3>
      <p>{contact.email}</p>
      <p className="text-sm text-gray-600">Tags: {contact.tags.join(', ')}</p>
      <p className="text-sm">Favorite: {contact.favorite ? 'Yes' : 'No'}</p>
      <button
        className="text-red-500 mt-2"
        onClick={() => onDelete(contact.email)}
      >
        Delete
      </button>
    </div>
  );
});

export default ContactCard;