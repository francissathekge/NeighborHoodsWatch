import { IncidentsActionEnum } from './actions';
import { IIncidentsStateContext } from './context';

export function IncidentsReducer(
  incomingState: IIncidentsStateContext,
  action: ReduxActions.Action<IIncidentsStateContext>
): IIncidentsStateContext {
  const { type, payload } = action;

  switch (type) {
    case IncidentsActionEnum.getIncidentsRequest:
      return { ...incomingState, ...payload };
    case IncidentsActionEnum.createIncidentsRequest:
      return { ...incomingState, ...payload };
    case IncidentsActionEnum.getIncidentsIdRequest:
      return { ...incomingState, ...payload };
    case IncidentsActionEnum.deleteIncidentsRequest:
      return { ...incomingState, ...payload };
    case IncidentsActionEnum.updateIncidentsRequest:
      return { ...incomingState, ...payload };
    case IncidentsActionEnum.searchIncidentsRequest:
      return {
        ...incomingState,
        ...payload,
      };
    default:
      return incomingState;
  }
}
