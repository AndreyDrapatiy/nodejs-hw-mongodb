import {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parseNumberParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSchema } from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, contactSchema);
  const { contactType, isFavourite } = req.query;
  const { _id: userId } = req.user;

  const data = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    contactType,
    isFavourite,
    userId,
  });

  res.send({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const data = await getContact({
    id,
    userId,
  });

  if (!data) throw createHttpError(404, 'Contact not found');

  res.send({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await createContact({ ...req.body, userId });

  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const result = await updateContact(id, userId, { ...req.body, userId });

  if (!result) throw createHttpError(404, 'Contact not found');

  res.json({
    status: 200,
    message: 'Successfully patched contact!',
    data: result,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;

  const contact = await deleteContact(id, userId);

  if (!contact) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};
