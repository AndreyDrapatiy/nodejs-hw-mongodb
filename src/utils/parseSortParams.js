import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);

  return isKnownOrder ? sortOrder : SORT_ORDER.ASC;
};

const parseSortBy = (sortBy, entitySchema) => {
  const entitySchemaKeys = Object.keys(entitySchema.obj);

  if (entitySchemaKeys.includes(sortBy)) {
    return sortBy;
  }

  return '_id';
};

export const parseSortParams = (query, entitySchema) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy, entitySchema);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
