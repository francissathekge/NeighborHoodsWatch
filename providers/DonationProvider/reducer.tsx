import { DonationsActionEnum } from './actions';
import { IDonationsStateContext } from './context';

export function DonationsReducer(
  incomingState: IDonationsStateContext,
  action: ReduxActions.Action<IDonationsStateContext>
): IDonationsStateContext {
  const { type, payload } = action;

  switch (type) {
    case DonationsActionEnum.getDonationsRequest:
      return { ...incomingState, ...payload };
    case DonationsActionEnum.createDonationRequest:
      return { ...incomingState, ...payload };
    case DonationsActionEnum.deleteDonationRequest:
      return { ...incomingState, ...payload };
    default:
      return incomingState;
  }
}
