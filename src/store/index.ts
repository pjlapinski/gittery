import { StoreModel, RemoteRepository } from '@/types'
import { computed, createStore, createTypedHooks } from 'easy-peasy'

const typedHooks = createTypedHooks<StoreModel>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState

export default createStore<StoreModel>({
  repositories: [],
  remoteRepositories: computed(state => state.repositories.filter(repo => 'url' in repo) as RemoteRepository[]),
  localRepositories: computed(state => state.repositories.filter(repo => !('url' in repo))),
})
