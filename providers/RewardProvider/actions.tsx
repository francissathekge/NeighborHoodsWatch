import React from 'react';
import { createAction } from 'redux-actions';
import { IRewards, generalRewardsProps, IRewardsStateContext } from './context';

export enum RewardsActionEnum {
  getRewardsRequest = 'GET',
  createRewardsRequest = 'CREATE',
  getRewardsIdRequest = 'GET_BY_ID',
  deleteRewardsRequest = 'DELETE',
  updateRewardsRequest = 'UPDATE',
  searchRewardsRequest = 'SEARCH',
}

export const getRewardsRequestAction = createAction<IRewardsStateContext, generalRewardsProps>(
  RewardsActionEnum.getRewardsRequest,
  (getRewards) => ({ getRewards })
);
export const createRewardsRequestAction = createAction<IRewardsStateContext, IRewards>(
  RewardsActionEnum.createRewardsRequest,
  (createRewards) => ({ createRewards })
);
export const getRewardsIdRequestAction = createAction<IRewardsStateContext, number>(
  RewardsActionEnum.getRewardsIdRequest,
  (Id) => ({})
);
export const deleteRewardsRequestAction = createAction<IRewardsStateContext, string>(
  RewardsActionEnum.deleteRewardsRequest,
  (deleteRewardsId) => ({ deleteRewards: deleteRewardsId })
);
export const updateRewardsRequestAction = createAction<IRewardsStateContext, IRewards>(
  RewardsActionEnum.updateRewardsRequest,
  (updateRewards) => ({ updateRewards })
);
export const searchRewardsRequestAction = createAction<IRewardsStateContext, IRewards>(
  RewardsActionEnum.searchRewardsRequest,
  (searchRewards) => ({ searchRewards })
);
