import { createContext } from 'react';

export interface IDonations {
  id: string;
  title: string;
  phoneNumber: number;
  comment: string;
  amount: number;
}
export interface IDonationsProps {
  items?: IDonations[];
}

export interface IDonationsStateContext {
  getDonations?: IDonationsProps;
  createDonations?: IDonations;
  deleteDonations?: string;
}

export interface IDonationsActionContext {
  getDonation?: () => void;
  createDonation?: (payload: IDonations) => void;
  deleteDonation?: (payload: string) => void;
}

export const INITIAL_STATE: IDonationsStateContext = {
  getDonations: {items:[]},
};

const DonationContext = createContext<IDonationsStateContext>(INITIAL_STATE);
const DonationActionContext = createContext<IDonationsActionContext>({} as IDonationsActionContext);

export { DonationContext, DonationActionContext };
