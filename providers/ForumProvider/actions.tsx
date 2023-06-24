import React from 'react';
import { createAction } from 'redux-actions';
import { IForums, IForumsStateContext ,IForumsProps} from './context';

export enum ForumsActionEnum {
  getForumsRequest = 'GET',
  createForumsRequest = 'CREATE',
  deleteForumRequest = 'DELETE',
}

export const getForumsRequestAction = createAction<IForumsStateContext, IForumsProps>(
  ForumsActionEnum.getForumsRequest,
  (getForums) => ({ getForums })
);
export const createForumsRequestAction = createAction<IForumsStateContext, IForums>(
  ForumsActionEnum.createForumsRequest,
  (createForums) => ({ createForums })
);
export const deleteForumRequestAction = createAction<IForumsStateContext, string>(
  ForumsActionEnum.deleteForumRequest,
  (deleteForumId) => ({ deleteForums: deleteForumId })
);

