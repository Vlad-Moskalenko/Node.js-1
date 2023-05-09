const fs = require('fs/promises');
const path = require('path');

const { nanoid } = require('nanoid');

const contactPath = path.join(__dirname, './db/contacts.json');

const listContacts = async () => {
  const list = await fs.readFile(contactPath);
  return JSON.parse(list);
};

const getContactById = async contactId => {
  const id = String(contactId);
  const list = await listContacts();
  return list.find(contact => contact.id === id) || null;
};

const removeContact = async contactId => {
  const list = await listContacts();
  const index = list.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = list.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(list, null, 2));
  return removedContact;
};

const addContact = async data => {
  const list = await listContacts();
  const newContact = { id: nanoid(), ...data };
  list.unshift(newContact);
  await fs.writeFile(contactPath, JSON.stringify(list, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
