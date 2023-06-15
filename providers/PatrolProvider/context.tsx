import { createContext } from 'react';

export interface IPatrols {
    Period: number;
    NoOfGuards: number;
    Location: string;
    Amount: number;
    StartTime: Date;
    EndTime: Date;
    id: string;
    }


export const INITIAL_STATE: IPatrolsStateContext = {getPatrols: []};

export interface IPatrolsStateContext {
    readonly getPatrols? :IPatrols[];
    readonly getPatrolsId? :IPatrols;
    readonly createPatrols?:IPatrols;
    readonly deletePatrols?:string;
    readonly updatePatrols?: IPatrols;
    readonly searchPatrols?: IPatrols;

}


export interface IPatrolsActionContext{
    getPatrol?:() => void;
    getPatrolId?:(id:number) => void;
    createPatrol?:(payload:IPatrols) => void;
    deletePatrol?:(payload:string) => void;
    updatePatrol?:(payload:IPatrols) => void
    searchPatrol?:(payload:string) => void
}

const PatrolContext = createContext<IPatrolsStateContext>(INITIAL_STATE);

const PatrolActionContext = createContext<IPatrolsActionContext>(undefined);

export {PatrolContext, PatrolActionContext};