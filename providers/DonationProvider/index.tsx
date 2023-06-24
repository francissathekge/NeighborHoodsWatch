import React, { FC, PropsWithChildren, useReducer, useContext, useEffect } from 'react';
import { DonationsReducer } from './reducer';
import { INITIAL_STATE, IDonations, DonationActionContext, DonationContext } from './context';
import { getDonationsRequestAction, deleteDonationRequestAction, createDonationRequestAction } from './actions';
import { message } from 'antd';
import { useGet, useMutate } from 'restful-react';

const DonationsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(DonationsReducer, INITIAL_STATE);

  const { data: donationsData, refetch: getDonationsHttp } = useGet({
    path: 'Donation/GetAll',
  });
  const { mutate: createDonationHttp } = useMutate({
    path: '/Donation/Create',
    verb: 'POST',
  });

  useEffect(() => {
    if (donationsData) {
      dispatch(getDonationsRequestAction(donationsData.result));
    }
  }, [donationsData]);

  const getDonation = () => getDonationsHttp();

  
  const createDonation = async (payload: IDonations) => {
    console.log("payload:", payload);
    try {
      const response = await createDonationHttp(payload);
      console.log("response:", response);
      if (response.success) {
        message.success("Donation successfully created");
        dispatch(createDonationRequestAction(response.result));
      } else {
        message.error("Failed to create donation");
      }
    } catch (error) {
      console.error("Donation creation error:", error);
      message.error("An error occurred during donation creation");
    }
  };

  const deleteDonation = async (donationId: string) => {
    await fetch(`https://localhost:44311/api/services/app/Donation/Delete?Id=${donationId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      res.json().then((data) => {
        dispatch(deleteDonationRequestAction(donationId));
        message.success('Donation deleted successfully.');
      });
    });
  };


  return (
    <DonationContext.Provider value={state}>
      <DonationActionContext.Provider
        value={{
          getDonation,
          createDonation,
          deleteDonation,
        }}
      >
        {children}
      </DonationActionContext.Provider>
    </DonationContext.Provider>
  );
};

function useDonationsState() {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonationsState must be used within a DonationsProvider');
  }
  return context;
}

function useDonationsActions() {
  const context = useContext(DonationActionContext);
  if (!context) {
    throw new Error('useDonationsActions must be used within a DonationsProvider');
  }
  return context;
}

function useDonations() {
  return {
    ...useDonationsActions(),
    ...useDonationsState(),
  };
}

export { DonationsProvider, useDonations };
