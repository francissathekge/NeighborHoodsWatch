import { PatrolsActionEnum } from "./actions";
import { IPatrolsStateContext } from "./context";

export function PatrolsReducer(incomingState: IPatrolsStateContext, action: ReduxActions.Action<IPatrolsStateContext>): IPatrolsStateContext {

    const { type, payload } = action;

    switch (type) {
        case PatrolsActionEnum.getPatrolsRequest:
            return { ...incomingState, ...payload };
        case PatrolsActionEnum.createPatrolsRequest:
            return { ...incomingState, getPatrols:[...incomingState.getPatrols, payload.createPatrols] };
        case PatrolsActionEnum.getPatrolsIdRequest:
            return { ...incomingState, ...payload };
        case PatrolsActionEnum.deletePatrolsRequest:
            const { deletePatrols } = payload;
            const filtered=[...incomingState.getPatrols].filter(({id}) => id!=deletePatrols);
            return { ...incomingState, getPatrols:[...filtered] };
        case PatrolsActionEnum.updatePatrolsRequest:
            const { updatePatrols } = payload;
            const filters=[...incomingState.getPatrols].filter(({id}) => id!=updatePatrols.id)
            return { ...incomingState, getPatrols:[...filters, updatePatrols] };
            case PatrolsActionEnum.searchPatrolsRequest:
                return {
                    ...incomingState,
                    ...payload,
                }
        default:
            return incomingState;
    }
}