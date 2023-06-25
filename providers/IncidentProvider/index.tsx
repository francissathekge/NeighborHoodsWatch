import React, { FC, PropsWithChildren, useReducer, useContext, useState, useEffect } from 'react';
import { IncidentsReducer } from './reducer';
import { INITIAL_STATE, IIncidents, IncidentsActionContext, IncidentsContext } from './context';
import { getIncidentsRequestAction, getIncidentsIdRequestAction, deleteIncidentsRequestAction, updateIncidentsRequestAction, createIncidentsRequestAction, searchIncidentsRequestAction } from './actions';
import { message } from 'antd';
import { useGet, useMutate } from 'restful-react';

const IncidentsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(IncidentsReducer, INITIAL_STATE);

  const { data: incidentsData, refetch: getIncidentsHttp } = useGet({
    path: 'Incident/GetAll',
  });
  const { mutate: createIncidentsHttp } = useMutate({
    path: '/Incident/Create',
    verb: 'POST',
  });

  useEffect(() => {
    if (incidentsData) {
      dispatch(getIncidentsRequestAction(incidentsData.result));
    }
  }, [incidentsData, dispatch]);

  const getIncident = () => getIncidentsHttp();

  const createIncident = async (payload: FormData) => {
    console.log("payload:", payload);
    try {
      const response = await createIncidentsHttp(payload);
      console.log("response:", response);
      if (response.success) {
        message.success("Incident successfully created");
        dispatch(createIncidentsRequestAction(response.result));
      } else {
        message.error("Failed to create incident");
      }
    } catch (error) {
      console.error("Incident creation error:", error);
      message.error("An error occurred during incident creation");
    }
  };
  

  const getIncidentById = async (id: number) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`https://localhost:44311/api/services/app/Movie/Get/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(getIncidentsIdRequestAction(data));
    } else if (response.status === 401) {
      // Unauthorized access
      message.error('Unauthorized access. Please log in again.');
      window.location.href = '/login';
    } else {
      // Other errors
      message.error('Failed to fetch incident.');
    }
  };

  const deleteIncident = async (incidentId: string) => {
    await fetch(`https://localhost:44311/api/services/app/Incident/Delete?Id=${incidentId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        dispatch(deleteIncidentsRequestAction(incidentId));
        getIncident();
        // message.success('Incident deleted successfully.');
      });
    });
  };

  const updateIncident = async (incident: IIncidents) => {
    const token = localStorage.getItem('token');
    const response = await fetch('https://localhost:44311/api/services/app/Movie/Update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(incident),
    });

    if (response.ok) {
      dispatch(updateIncidentsRequestAction(incident));
      message.success('Incident updated successfully.');
    } else if (response.status === 401) {
      // Unauthorized access
      message.error('Unauthorized access. Please log in again.');
      window.location.href = '/login';
    } else {
      // Other errors
      message.error('Failed to update incident.');
    }
  };

  const searchIncident = async (query: string) => {
    await fetch(`https://localhost:44311/api/services/app/Movie/GetByTitle?title=${query}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        dispatch(searchIncidentsRequestAction(data.result));
        console.log('Search results: ', data.result);
      });
    });
  };

  return (
    <IncidentsContext.Provider value={state}>
      <IncidentsActionContext.Provider
        value={{
          getIncident,
          createIncident,
          deleteIncident,
        }}
      >
        {children}
      </IncidentsActionContext.Provider>
    </IncidentsContext.Provider>
  );
};

function useIncidentsState() {
  const context = useContext(IncidentsContext);
  if (!context) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

function useIncidentsActions() {
  const context = useContext(IncidentsActionContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider');
  }
  return context;
}

function useIncidents() {
  return {
    ...useIncidentsActions(),
    ...useIncidentsState(),
  };
}

export { IncidentsProvider, useIncidents };
