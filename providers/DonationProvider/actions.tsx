import React from 'react';
import { createAction } from 'redux-actions';
import { IDonations,IDonationsProps, IDonationsStateContext } from './context';

export enum DonationsActionEnum {
  getDonationsRequest = 'GET',
  createDonationRequest = 'CREATE',
  deleteDonationRequest = 'DELETE',
}

export const getDonationsRequestAction = createAction<IDonationsStateContext, IDonationsProps>(
  DonationsActionEnum.getDonationsRequest,
  (getDonations) => ({ getDonations })
);
export const createDonationRequestAction = createAction<IDonationsStateContext, IDonations>(
  DonationsActionEnum.createDonationRequest,
  (createDonations) => ({ createDonations })
);
export const deleteDonationRequestAction = createAction<IDonationsStateContext, string>(
  DonationsActionEnum.deleteDonationRequest,
  (deleteDonationId) => ({ deleteDonations: deleteDonationId })
);