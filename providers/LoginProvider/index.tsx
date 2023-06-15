import React, { FC, PropsWithChildren, useReducer, useContext, useState } from 'react';
import { UserReducer } from './reducer';
import { ILogin, INITIAL_STATE, IUser, UserActionContext, UserContext } from './context';
import { loginUserRequestAction, createUserRequestAction, logOutUserRequestAction, setCurrentUserRequestAction, getUserDetailsRequestAction } from './actions';
import { message } from 'antd';
import { useMutate } from 'restful-react';
import { useRouter } from 'next/router';

const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
    const { push } = useRouter();
    const { mutate: loginUserHttp } = useMutate({
      path: 'https://localhost:44311/api/TokenAuth/Authenticate',
      verb: 'POST',
    });
    const { mutate: createUserHttp } = useMutate({
      path: 'https://localhost:44311/api/services/app/User/Create',
      verb: 'POST',
    });
    const loginUser = async (payload:ILogin) => {
      console.log("Login what")
      try {
        console.log("Login qaqaq")
        const response = await loginUserHttp(payload);
        console.log("Login ",response)
        if (response.success) {
          localStorage.setItem('token', response.result.accessToken);
          dispatch(loginUserRequestAction(response.result));
          console.log("User ID:", response.result);

          push("/deshboard");
        } else {
          message.error('Invalid username or password');
        }
      } catch (error) {
        console.log(error);
        console.log("Login failed")
        // alert('Login failed');
      }
    };

    // const  loginUser  = async (payload:ILogin) => {
    //     try {
    //       const response = await fetch("https://localhost:44311/api/TokenAuth/Authenticate", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(payload)
    //       });
    //      console.log(response)
    //       if (response.ok) {
    //         const data = await response.json();
    //         console.log("Are you in");
    //         // Set the user token or session
    //         console.log(data)
    //         localStorage.setItem('token', data.result.accessToken);
    //         dispatch(loginUserRequestAction(data));
    //         message.success('Successfully Logged In');
    //         window.location.href = '/movies'
    //       } else {
    //         message.error('Invalid username or password');
    //       }
    //     } catch (error) {

    //       console.log(error);
    //       alert('Login failed');
    //     }
    //   };

    const createUser = async (userRegInfo: IUser) => {
        const token = localStorage.getItem("token");
        await fetch('https://localhost:44311/api/services/app/Person/Create', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
            body: JSON.stringify(userRegInfo)
        }).then(res => {
            res.json().then(data => {
                dispatch(createUserRequestAction(userRegInfo));
                message.error("user registration failed", data)
                window.location.href = '/login'
            })
            .catch(error => {
                message.success("user registration successfull", error);
            })
        })
    }



    const getUserDetails = async (id: number) => {
        const token = localStorage.getItem("token");
        await fetch(`https://localhost:44311/api/services/app/Person/Get?id=${id}`, {
            method: 'GET',
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer  ${token}`
            },
        }).then(res => {
            res.json().then(data => {
                dispatch(getUserDetailsRequestAction(id));
                
                dispatch(setCurrentUserRequestAction(data.result));
            })
        })
    }


    const logOutUser = () => {
        dispatch(logOutUserRequestAction());
        localStorage.removeItem('token');
        
       
    }

    return (
        <UserContext.Provider value={state} >
            <UserActionContext.Provider value={{
                loginUser,
                createUser,
                logOutUser,
                getUserDetails
            }}>
                {children}
            </UserActionContext.Provider>
        </UserContext.Provider>
    );
}

function useLoginState() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useLoginActions() {
    const context = useContext(UserActionContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

function useUser() {
    return {
        ...useLoginActions(),
        ...useLoginState()
    }
}
export { UserProvider, useUser };
