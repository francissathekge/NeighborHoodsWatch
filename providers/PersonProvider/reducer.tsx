import { PersonActionEnum } from "./actions";
import { IPersonsStateContext } from "./context";

export function PersonReducer(incomingState: IPersonsStateContext, action: ReduxActions.Action<IPersonsStateContext>): IPersonsStateContext {

    const { type, payload } = action;

    switch (type) {
        case PersonActionEnum.getPersonsRequest:
        case PersonActionEnum.createPersonRequest:
        case PersonActionEnum.getPersonByIdRequest:
        case PersonActionEnum.deletePersonRequest:
        case PersonActionEnum.updatePersonRequest:
        case PersonActionEnum.searchPersonRequest:
            return {
                ...incomingState,
                ...payload,
            };
        default:
            return incomingState;
    }
}
