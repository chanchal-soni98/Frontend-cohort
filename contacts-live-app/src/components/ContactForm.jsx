import React, { useState } from 'react';

const ContactForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', email: '', tags: '', favorite: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()),
    };
    onAdd(newContact);
    setFormData({ name: '', email: '', tags: '', favorite: false });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Tags (comma separated)"
        value={formData.tags}
        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
      />
      <label className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          checked={formData.favorite}
          onChange={(e) => setFormData({ ...formData, favorite: e.target.checked })}
        />
        Favorite
      </label>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;