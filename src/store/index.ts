import { StoreModel } from '@/types';
import { action, createStore, createTypedHooks, persist } from 'easy-peasy';

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
        state.repositories.push(repo);
      }),
    },
    { storage: 'localStorage' }
  )
);
