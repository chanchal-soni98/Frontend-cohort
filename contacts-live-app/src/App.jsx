import React, { useState, useMemo, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { useDebounce } from './useDebounce';
import ContactForm from './components/ContactForm';
import ContactCard from './components/ContactCard';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const addContact = (contact) => {
    setContacts([...contacts, contact]);
  };

  const deleteContact = useCallback((email) => {
    setContacts(contacts.filter(c => c.email !== email));
  }, [contacts]);

  const filteredContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      contact.tags.some(tag =>
        tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
  }, [debouncedSearchTerm, contacts]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live Filtered Contacts</h1>
      <ContactForm onAdd={addContact} />
      <input
        className="border p-2 w-full mb-4"
        type="text"
        placeholder="Search by name or tag"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredContacts.map(contact => (
        <ContactCard key={contact.email} contact={contact} onDelete={deleteContact} />
      ))}
    </div>
  );
}

export default App;