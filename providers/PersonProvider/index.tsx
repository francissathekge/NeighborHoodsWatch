import React, { FC, PropsWithChildren, useReducer, useContext, useEffect } from 'react';
import { PersonReducer } from './reducer';
import { INITIAL_STATE, IPerson, PersonActionContext, PersonContext } from './context';
import { getPersonsRequestAction, getPersonByIdRequestAction, deletePersonRequestAction, updatePersonRequestAction, createPersonRequestAction, searchPersonRequestAction } from './actions';
import { message } from 'antd';
import { useGet, useMutate } from 'restful-react';

const PersonsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(PersonReducer, INITIAL_STATE);

  const { data: personsData, refetch: getPersonsHttp } = useGet({
    path: 'Person/GetAll',
  });
  const { mutate: createPersonHttp } = useMutate({
    path: 'Person/Create',
    verb: 'POST',
  });
  const { data: personData, refetch: getPersonHttp } = useGet({
    path: `Person/Get`,
    lazy: true
  });

  useEffect(() => {
    if (personsData) {
      dispatch(getPersonsRequestAction(personsData.result));
    }
  }, [personsData, dispatch]);

  const getPerson = () => getPersonsHttp();

  const createPerson = async (payload: FormData) => {
    console.log("payload:", payload);
    try {
      const response = await createPersonHttp(payload);
      console.log("response:", response);
      if (response.success) {
        message.success("Person successfully created");
        dispatch(createPersonRequestAction(response.result));
        getPerson();
      } else {
        message.error("Failed to create person");
      }
    } catch (error) {
      console.error("Person creation error:", error);
      message.error("An error occurred during person creation");
    }
  };

  useEffect(() => {
    if (personData) {
      dispatch(getPersonByIdRequestAction(personData.result));
    }
  }, [personData, dispatch]);
  
  
  const getPersonById = (id: string) => {
    getPersonHttp({
      queryParams: { id: id }
    })
  };


  const deletePerson = async (personId: string) => {
    await fetch(`https://localhost:44311/api/services/app/Person/Delete?Id=${personId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        dispatch(deletePersonRequestAction(personId));
        getPerson();
        // message.success('Person deleted successfully.');
      });
    });
  };
  

  const updatePerson = async (person: IPerson) => {
    // Update the person
    // ...
  };

  const searchPerson = async (query: string) => {
    // Search for persons based on the query
    // ...
  };

  return (
    <PersonContext.Provider value={state}>
      <PersonActionContext.Provider
        value={{
          getPerson,
          createPerson,
          getPersonById,
          deletePerson,
          updatePerson,
          searchPerson,
        }}
      >
        {children}
      </PersonActionContext.Provider>
    </PersonContext.Provider>
  );
};

function usePersonsState() {
  const context = useContext(PersonContext);
  if (!context) {
    throw new Error("usePersonsState must be used within a PersonsProvider");
  }
  return context;
}

function usePersonsActions() {
  const context = useContext(PersonActionContext);
  if (context === undefined) {
    throw new Error("usePersonsActions must be used within a PersonsProvider");
  }
  return context;
}

function usePersons() {
  return {
    ...usePersonsActions(),
    ...usePersonsState(),
  };
}

export { PersonsProvider, usePersons };
