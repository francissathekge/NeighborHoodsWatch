import React, { FC, PropsWithChildren, useReducer, useContext, useState, useEffect } from 'react';
import { PatrolsReducer } from './reducer';
import { INITIAL_STATE, IPatrols, PatrolActionContext, PatrolContext } from './context';
import { getPatrolsRequestAction, getPatrolsIdRequestAction, deletePatrolsRequestAction, updatePatrolsRequestAction, createtPatrolsRequestAction, searchPatrolsRequestAction } from './actions';
import { message } from 'antd';


const PatrolsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(PatrolsReducer, INITIAL_STATE);

    const getPatrol = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:44311/api/services/app/PatrollingRequest/GetAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.ok) {
          const data = await response.json();
          dispatch(getPatrolsRequestAction(data.result));
          console.log("Fetch",data.result);
        } else if (response.status === 401) {
          // Unauthorized access
          message.error('Unauthorized access. Please log in again.');
          window.location.href = '/login';
        } else {
          // Other errors
          message.error('Failed to fetch movies.');
        }
      };

      const createPatrol= async (movieRegInfo: IPatrols) => {
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Movie/Create', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
            body: JSON.stringify(movieRegInfo)
        }).then(res => {
            res.json().then(data => {
                dispatch(createtPatrolsRequestAction(movieRegInfo));
                message.success("movie registration successfull")
             
            })
            .catch(error => {
                message.error("movie was not registration successfull", error);
            })
        })
    }

    
      const getPatrolId = async (id: number) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://localhost:44311/api/services/app/Movie/Get/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.ok) {
          const data = await response.json();
          dispatch(getPatrolsIdRequestAction(data));
        } else if (response.status === 401) {
          // Unauthorized access
          message.error('Unauthorized access. Please log in again.');
          window.location.href = '/login';
        } else {
          // Other errors
          message.error('Failed to fetch movie.');
        }
      };
    
      const deletePatrol = async (movieId: string) => {
        await fetch(`https://localhost:44311/api/services/app/Movie/Delete?Id=${movieId}`, {
          method: 'DELETE',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => {
          res.json().then(data => {
            dispatch(deletePatrolsRequestAction(movieId));
            message.success('Movie deleted successfully.');
          });
        });
      };
    
      const updatePatrol = async (movie: IPatrols) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://localhost:44311/api/services/app/Movie/Update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(movie)
        });
    
        if (response.ok) {
          dispatch(updatePatrolsRequestAction(movie));
          message.success('Movie updated successfully.');
        } else if (response.status === 401) {
          // Unauthorized access
          message.error('Unauthorized access. Please log in again.');
          window.location.href = '/login';
        } else {
          // Other errors
          message.error('Failed to update movie.');
        }
      };

      
    const searchPatrol = async (query:string) => {
      await fetch(`https://localhost:44311/api/services/app/Movie/GetByTitle?title=${query}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(res => {
        res.json().then(data => {
          dispatch(searchPatrolsRequestAction(data.result));
          console.log('Search results: ', data.result)
        })
      })
    };



    return (
        <PatrolContext.Provider value={state} >
            <PatrolActionContext.Provider value={{
                getPatrol,
                createPatrol,
                getPatrolId,
                deletePatrol,
                updatePatrol,
                searchPatrol

            }}>
                {children}
            </PatrolActionContext.Provider>
        </PatrolContext.Provider>
    );
}
function usePatrolsState() {
    const context = useContext(PatrolContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function usePatrolsActions() {
    const context = useContext(PatrolActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function usePatrols() {
    return {
        ...usePatrolsActions(),
        ...usePatrolsState()
    }
}
export { PatrolsProvider, usePatrols};