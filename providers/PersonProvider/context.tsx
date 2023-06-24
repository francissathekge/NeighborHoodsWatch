import { createContext } from 'react';

export interface IPerson {
  userName: string;
  name: string;
  surname: string;
  phoneNumber: string;
  emailAddress: string;
  password: string;
  userId: number;
  address: {
    street: string;
    town: string;
    city: string;
    province: string;
    postalCode: string;
    id: string;
  };
  roleNames: string[];
  id: string;
}

export interface GeneralPersonsProps {
  items?: IPerson[];
}

export interface IPersonsStateContext {
  getPersons?: GeneralPersonsProps;
  getPersonsById?: string;
  createPerson?: IPerson;
  deletePerson?: string;
  updatePerson?: IPerson;
  searchPerson?: IPerson;
}

export interface IPersonsActionContext {
  getPerson?: () => void;
  getPersonById?: (id: string) => void;
  createPerson?: (payload: FormData) => void;
  deletePerson?: (payload: string) => void;
  updatePerson?: (payload: IPerson) => void;
  searchPerson?: (payload: string) => void;
}

export const INITIAL_STATE: IPersonsStateContext = {
  getPersons: {
    items: []
  },
};

const PersonContext = createContext<IPersonsStateContext>(INITIAL_STATE);
const PersonActionContext = createContext<IPersonsActionContext>({} as IPersonsActionContext);

export { PersonContext, PersonActionContext };
