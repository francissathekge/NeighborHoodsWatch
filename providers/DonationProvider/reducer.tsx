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
      const { deleteDonations } = payload;
      const filtered = [...incomingState.getDonations].filter(({ id }) => id !== deleteDonations);
      return { ...incomingState, getDonations: [...filtered] };
    default:
      return incomingState;
  }
}
