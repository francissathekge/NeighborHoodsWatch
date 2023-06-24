import { createContext } from 'react';

export interface IUser {
    id: string;
    userName: string;
    name: string;
    surname: string;
    phoneNumber: string;
    emailAddress: string;
    password: string;
    address: IAddress;
  }
  
  export interface IAddress {
    street: string;
    town: string;
    city: string;
    province: string;
    postalCode: string;
  }
  
  


export interface ILogin{
    userNameOrEmailAddress: string,
    password: string,
    id: string 
  }


export const INITIAL_STATE: IUserStateContext={}

export interface IUserStateContext {
    readonly UserLogin? : ILogin;
    readonly CreateUser?:IUser;
    readonly UserLogOut?:IUser;
    readonly currentUser?: IUser;
    readonly user?: IUser;
    readonly userId?: number;
    
    
}

export interface IUserActionContext{
    loginUser?:(payload:ILogin) => void;
    createUser?:(payload:IUser) => void;
    logOutUser?:() => void;
    setCurrentUser?:(user:IUser) => void;
    getUserDetails?:(id:number) => void
    setUserId?: (userId: number) => void;
}

const UserContext = createContext<IUserStateContext>(INITIAL_STATE);

const UserActionContext = createContext<IUserActionContext>(undefined);

export {UserContext, UserActionContext};