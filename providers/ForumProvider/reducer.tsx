import { ForumsActionEnum } from './actions';
import { IForumsStateContext } from './context';

export function ForumsReducer(
  incomingState: IForumsStateContext,
  action: ReduxActions.Action<IForumsStateContext>
): IForumsStateContext {
  const { type, payload } = action;

  switch (type) {
    case ForumsActionEnum.getForumsRequest:
      return { ...incomingState, ...payload };
    case ForumsActionEnum.createForumsRequest:
      return { ...incomingState, ...payload };
    case ForumsActionEnum.deleteForumRequest:
      return { ...incomingState, ...payload };
    default:
      return incomingState;
  }
}
