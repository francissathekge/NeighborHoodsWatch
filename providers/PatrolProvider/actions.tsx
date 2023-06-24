import  React from 'react';
import { createAction } from 'redux-actions';
import { IPatrols,generalPatrolsProps, IPatrolsStateContext} from './context';

export enum PatrolsActionEnum{
    getPatrolsRequest = 'GET',
    createPatrolsRequest = 'CREATE',
    getPatrolsIdRequest = 'GET_BY_ID',
    deletePatrolsRequest = 'DELETE',
    updatePatrolsRequest = 'UPDATE',
    searchPatrolsRequest = 'SEARCH',
  
}

export const getPatrolsRequestAction = createAction<IPatrolsStateContext, generalPatrolsProps>(PatrolsActionEnum.getPatrolsRequest ,(getPatrols)=>({getPatrols}))
export const createtPatrolsRequestAction = createAction<IPatrolsStateContext, IPatrols>(PatrolsActionEnum.createPatrolsRequest ,(createPatrols)=>({createPatrols}))
export const getPatrolsIdRequestAction = createAction<IPatrolsStateContext, number>(PatrolsActionEnum.getPatrolsIdRequest,(Id)=>({}))
export const deletePatrolsRequestAction = createAction<IPatrolsStateContext, string>(PatrolsActionEnum.deletePatrolsRequest,(deletePatrolsId)=>({deletePatrols: deletePatrolsId}));
export const updatePatrolsRequestAction = createAction<IPatrolsStateContext, IPatrols>(PatrolsActionEnum.updatePatrolsRequest,(updatePatrols)=>({updatePatrols}))
export const searchPatrolsRequestAction = createAction<IPatrolsStateContext, IPatrols>(PatrolsActionEnum.searchPatrolsRequest,(searchPatrols)=>({searchPatrols}))
