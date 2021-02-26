import { Computed } from 'easy-peasy';

export interface Repository {
  name: string;
  localPath: string;
}

export interface RemoteRepository extends Repository {
  url: string;
}

export interface StoreModel {
  repositories: Repository[];
  currentRepository: Repository | null;
  remoteRepositories: Computed<StoreModel, RemoteRepository[]>;
  localRepositories: Computed<StoreModel, Repository[]>;
}
