import { RewardsActionEnum } from "./actions";
import { IRewardsStateContext } from "./context";

export function RewardsReducer(incomingState: IRewardsStateContext, action: ReduxActions.Action<IRewardsStateContext>): IRewardsStateContext {

    const { type, payload } = action;

    switch (type) {
        case RewardsActionEnum.getRewardsRequest:
        case RewardsActionEnum.createRewardsRequest:
        case RewardsActionEnum.getRewardsIdRequest:
        case RewardsActionEnum.deleteRewardsRequest:
        case RewardsActionEnum.updateRewardsRequest:
        case RewardsActionEnum.searchRewardsRequest:
            return {
                ...incomingState,
                ...payload,
            };
        default:
            return incomingState;
    }
}
