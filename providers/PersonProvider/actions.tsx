import React from 'react';
import { createAction } from 'redux-actions';
import { IPerson, GeneralPersonsProps, IPersonsStateContext } from './context';

export enum PersonActionEnum {
  getPersonsRequest = 'GET',
  createPersonRequest = 'CREATE',
  getPersonByIdRequest = 'GET_BY_ID',
  deletePersonRequest = 'DELETE',
  updatePersonRequest = 'UPDATE',
  searchPersonRequest = 'SEARCH',
}

export const getPersonsRequestAction = createAction<IPersonsStateContext, GeneralPersonsProps>(
  PersonActionEnum.getPersonsRequest,
  (getPersons) => ({ getPersons })
);
export const createPersonRequestAction = createAction<IPersonsStateContext, IPerson>(
  PersonActionEnum.createPersonRequest,
  (createPerson) => ({ createPerson })
);
export const getPersonByIdRequestAction = createAction<IPersonsStateContext, string>(
  PersonActionEnum.getPersonByIdRequest,
  (getPersonsById) => ({getPersonsById})
);
export const deletePersonRequestAction = createAction<IPersonsStateContext, string>(
  PersonActionEnum.deletePersonRequest,
  (deletePersonId) => ({ deletePerson: deletePersonId })
);
export const updatePersonRequestAction = createAction<IPersonsStateContext, IPerson>(
  PersonActionEnum.updatePersonRequest,
  (updatePerson) => ({ updatePerson })
);
export const searchPersonRequestAction = createAction<IPersonsStateContext, IPerson>(
  PersonActionEnum.searchPersonRequest,
  (searchPerson) => ({ searchPerson })
);
