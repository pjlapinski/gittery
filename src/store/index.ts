import { StoreModel, RemoteRepository } from '@/types';
import { computed, createStore, createTypedHooks, persist } from 'easy-peasy';

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default createStore<StoreModel>(
  persist(
    {
      repositories: [
        { name: 'repo1', localPath: 'C:\\repos\\repo1\\' },
        { name: 'repo2', localPath: 'C:\\repos\\repo2\\' },
        { name: 'repo3', localPath: 'C:\\repos\\repo3\\' },
      ],
      currentRepository: null,
      remoteRepositories: computed(state => state.repositories.filter(repo => 'url' in repo) as RemoteRepository[]),
      localRepositories: computed(state => state.repositories.filter(repo => !('url' in repo))),
    },
    { storage: 'localStorage' }
  )
);
