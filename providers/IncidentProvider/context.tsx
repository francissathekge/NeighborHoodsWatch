import { createContext } from 'react';

export interface IIncidents {
  id: string;
  file: string;
  incidentDate: any;
  incidentType: string;
  comment: string; 

}
export interface IIncidentss {
  items: IIncidents[];


}

export interface IIncidentsStateContext {
  getIncidents?: IIncidentss;
  getIncidentsId?: IIncidents;
  createIncidents?: IIncidents;
  deleteIncidents?: string;
  updateIncidents?: IIncidents;
  searchIncidents?: IIncidents;
}

export interface IIncidentsActionContext {
  getIncident?: () => void;
  getIncidentId?: (id: string) => void;
  createIncident?: (payload: FormData) => void;
  deleteIncident?: (payload: string) => void;
  updateIncident?: (payload: IIncidents) => void;
  searchIncident?: (payload: string) => void;
}

export const INITIAL_STATE: IIncidentsStateContext = {
  getIncidents: {items:[]},
};

const IncidentsContext = createContext<IIncidentsStateContext>(INITIAL_STATE);
const IncidentsActionContext = createContext<IIncidentsActionContext>({} as IIncidentsActionContext);

export { IncidentsContext, IncidentsActionContext };
