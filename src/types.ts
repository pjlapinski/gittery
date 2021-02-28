import { Action } from 'easy-peasy';

export interface Repository {
  name: string;
  localPath: string;
}

export interface StoreModel {
  repositories: Repository[];
  currentRepository: Repository | null;
  addRepository: Action<StoreModel, Repository>;
  removeRepository: Action<StoreModel, Repository>;
}

export interface Licenses {
  [key: string]: string;
}

export interface Ignores extends Licenses {}
