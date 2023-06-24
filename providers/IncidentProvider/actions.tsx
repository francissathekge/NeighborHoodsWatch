import { createAction } from 'redux-actions';
import { IIncidents,IIncidentss, IIncidentsStateContext } from './context';

export enum IncidentsActionEnum {
  getIncidentsRequest = 'GET',
  createIncidentsRequest = 'CREATE',
  getIncidentsIdRequest = 'GET_BY_ID',
  deleteIncidentsRequest = 'DELETE',
  updateIncidentsRequest = 'UPDATE',
  searchIncidentsRequest = 'SEARCH',
}

export const getIncidentsRequestAction = createAction<IIncidentsStateContext, IIncidentss>(
  IncidentsActionEnum.getIncidentsRequest,
  (getIncidents) => ({ getIncidents })
);
export const createIncidentsRequestAction = createAction<IIncidentsStateContext, IIncidents>(
  IncidentsActionEnum.createIncidentsRequest,
  (createIncidents) => ({ createIncidents })
);
export const getIncidentsIdRequestAction = createAction<IIncidentsStateContext, string>(
  IncidentsActionEnum.getIncidentsIdRequest,
  (Id) => ({})
);
export const deleteIncidentsRequestAction = createAction<IIncidentsStateContext, string>(
  IncidentsActionEnum.deleteIncidentsRequest,
  (deleteIncidentsId) => ({ deleteIncidents: deleteIncidentsId })
);
export const updateIncidentsRequestAction = createAction<IIncidentsStateContext, IIncidents>(
  IncidentsActionEnum.updateIncidentsRequest,
  (updateIncidents) => ({ updateIncidents })
);
export const searchIncidentsRequestAction = createAction<IIncidentsStateContext, IIncidents>(
  IncidentsActionEnum.searchIncidentsRequest,
  (searchIncidents) => ({ searchIncidents })
);
