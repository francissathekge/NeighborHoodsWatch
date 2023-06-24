import { createContext } from 'react';

export interface IForums {
  id: string;
  content: string;
  createdTime:any;
}
export interface IForumsProps {
  items?:IForums[];
}

export interface IForumsStateContext {
  getForums?: IForumsProps ;
  createForums?: IForums;
  deleteForums?: string;

}

export interface IForumsActionContext {
  getForum?: () => void;
  createForum?: (payload: IForums) => void;
  deleteForum?: (payload: string) => void;
}

export const INITIAL_STATE: IForumsStateContext = {
  getForums: {items:[]},
};

const ForumContext = createContext<IForumsStateContext>(INITIAL_STATE);
const ForumActionContext = createContext<IForumsActionContext>({} as IForumsActionContext);

export { ForumContext, ForumActionContext };
