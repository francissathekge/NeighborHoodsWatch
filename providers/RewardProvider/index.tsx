import React, { FC, PropsWithChildren, useReducer, useContext, useEffect } from 'react';
import { RewardsReducer } from './reducer';
import { INITIAL_STATE, IRewards, RewardActionContext, RewardContext } from './context';
import { getRewardsRequestAction, getRewardsIdRequestAction, deleteRewardsRequestAction, updateRewardsRequestAction, createRewardsRequestAction, searchRewardsRequestAction } from './actions';
import { message } from 'antd';
import { useGet, useMutate } from 'restful-react';

const RewardsProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(RewardsReducer, INITIAL_STATE);

  const { data: rewardsData, refetch: getRewardsHttp } = useGet({
    path: 'Reward/GetAll',
  });
  const { mutate: createRewardHttp } = useMutate({
    path: 'Reward/Create',
    verb: 'POST',
  });

  useEffect(() => {
    if (rewardsData) {
      dispatch(getRewardsRequestAction(rewardsData.result));
    }
  }, [rewardsData, dispatch]);

  const getReward = () => getRewardsHttp();

  const createReward = async (payload: IRewards) => {
    console.log("payload:", payload);
    try {
      const response = await createRewardHttp(payload);
      console.log("response:", response);
      if (response.success) {
        message.success("Reward successfully created");
        dispatch(createRewardsRequestAction(response.result));
      } else {
        message.error("Failed to create reward");
      }
    } catch (error) {
      console.error("Reward creation error:", error);
      message.error("An error occurred during reward creation");
    }
  };

  const getRewardId = async (id: number) => {
    // Fetch the reward with the given ID
    // ...
  };

  const deleteReward = async (rewardId: string) => {
    // Delete the reward with the given ID
    // ...
  };

  const updateReward = async (reward: IRewards) => {
    // Update the reward
    // ...
  };

  const searchReward = async (query: string) => {
    // Search for rewards based on the query
    // ...
  };

  return (
    <RewardContext.Provider value={state}>
      <RewardActionContext.Provider
        value={{
          getReward,
          createReward,
          getRewardId,
          deleteReward,
          updateReward,
          searchReward,
        }}
      >
        {children}
      </RewardActionContext.Provider>
    </RewardContext.Provider>
  );
};

function useRewardsState() {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error("useRewardsState must be used within a RewardsProvider");
  }
  return context;
}

function useRewardsActions() {
  const context = useContext(RewardActionContext);
  if (context === undefined) {
    throw new Error("useRewardsActions must be used within a RewardsProvider");
  }
  return context;
}

function useRewards() {
  return {
    ...useRewardsActions(),
    ...useRewardsState(),
  };
}

export { RewardsProvider, useRewards };
