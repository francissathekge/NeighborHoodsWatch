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
      const { deleteIncidents } = payload;
      const filtered = [...incomingState.getIncidents].filter(({ id }) => id !== deleteIncidents);
      return { ...incomingState, getIncidents: [...filtered] };
    case IncidentsActionEnum.updateIncidentsRequest:
      const { updateIncidents } = payload;
      const filters = [...incomingState.getIncidents].filter(({ id }) => id !== updateIncidents.id);
      return { ...incomingState, getIncidents: [...filters, updateIncidents] };
    case IncidentsActionEnum.searchIncidentsRequest:
      return {
        ...incomingState,
        ...payload,
      };
    default:
      return incomingState;
  }
}
