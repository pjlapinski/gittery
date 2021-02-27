import { StoreModel } from '@/types';
import { action, createStore, createTypedHooks, persist } from 'easy-peasy';
import _ from 'lodash';

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default createStore<StoreModel>(
  persist(
    {
      repositories: [],
      currentRepository: null,
      addRepository: action((state, repo) => {
        if (state.repositories.some(r => _.isEqual(r, repo))) return;
        state.repositories.push(repo);
      }),
      removeRepository: action((state, name) => {
        state.repositories = state.repositories.filter(repo => repo.name !== name);
      }),
    },
    { storage: 'localStorage' }
  )
);
