import { PatrolsActionEnum } from "./actions";
import { IPatrolsStateContext } from "./context";

export function PatrolsReducer(incomingState: IPatrolsStateContext, action: ReduxActions.Action<IPatrolsStateContext>): IPatrolsStateContext {

    const { type, payload } = action;

    switch (type) {
        case PatrolsActionEnum.getPatrolsRequest:
        case PatrolsActionEnum.createPatrolsRequest:
        case PatrolsActionEnum.getPatrolsIdRequest:
        case PatrolsActionEnum.deletePatrolsRequest:
        case PatrolsActionEnum.updatePatrolsRequest:
        case PatrolsActionEnum.searchPatrolsRequest:
            return {
                ...incomingState,
                ...payload,
            };
        default:
            return incomingState;
    }
}
