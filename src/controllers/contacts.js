import {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await getContacts();

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactController = async (req, res) => {
  const { id } = req.params;

  const data = await getContact(id);

  if (!data) throw createHttpError(404, 'Contact not found');

  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;

  const result = await updateContact(id, req.body);

  if (!result) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;

  const contact = await deleteContact(id);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};
