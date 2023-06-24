import { createContext } from 'react';

export interface IRewards {
  file: string;
  rewardDate: any;
  rewardAmount: number;
  incidentType: string;
  comment: string;
  id: string;
}

export interface generalRewardsProps {
  items?: IRewards[];
}

export interface IRewardsStateContext {
  getRewards?: generalRewardsProps;
  getRewardsId?: IRewards;
  createRewards?: IRewards;
  deleteRewards?: string;
  updateRewards?: IRewards;
  searchRewards?: IRewards;
}

export interface IRewardsActionContext {
  getReward?: () => void;
  getRewardId?: (id: number) => void;
  createReward?: (payload: IRewards) => void;
  deleteReward?: (payload: string) => void;
  updateReward?: (payload: IRewards) => void;
  searchReward?: (payload: string) => void;
}

export const INITIAL_STATE: IRewardsStateContext = {
  getRewards: {
    items: []
  },
};

const RewardContext = createContext<IRewardsStateContext>(INITIAL_STATE);
const RewardActionContext = createContext<IRewardsActionContext>({} as IRewardsActionContext);

export { RewardContext, RewardActionContext };
