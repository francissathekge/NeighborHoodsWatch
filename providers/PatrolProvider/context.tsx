import { createContext } from 'react';

export interface IPatrols {
  period: number;
  noOfGuards: number;
  personId: string;
  location: string;
  amount: number;
  startTime: Date;
  endTime: Date;
  id: string;
}
export interface generalPatrolsProps{
  items?:IPatrols[];
}

export interface IPatrolsStateContext {
  getPatrols?: generalPatrolsProps;
  getPatrolsId?: IPatrols;
  createPatrols?: IPatrols;
  deletePatrols?: string;
  updatePatrols?: IPatrols;
  searchPatrols?: IPatrols;
}

export interface IPatrolsActionContext {
  getPatrol?: () => void;
  getPatrolId?: (id: number) => void;
  createPatrol?: (payload: IPatrols) => void;
  deletePatrol?: (payload: string) => void;
  updatePatrol?: (payload: IPatrols) => void;
  searchPatrol?: (payload: string) => void;
}

export const INITIAL_STATE: IPatrolsStateContext = {
  getPatrols: {
    items:[]
  },
};

const PatrolContext = createContext<IPatrolsStateContext>(INITIAL_STATE);
const PatrolActionContext = createContext<IPatrolsActionContext>({} as IPatrolsActionContext);

export { PatrolContext, PatrolActionContext };
