import { HttpHeaders } from '@angular/common/http';
import { NewUserRoleDataSource } from 'src/apiAndObjects/objects/data-source/newUserRoleDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class PutUserDetail extends CacheableEndpoint<NewUserRoleDataSource, SetUserRoleParams, NewUserRoleDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: SetUserRoleParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: SetUserRoleParams): Promise<NewUserRoleDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const authHeader = new HttpHeaders().set('Authorization', accessToken ? 'Bearer ' + accessToken : '');
      return authHeader;
    };
    const callResponsePromise = this.apiCaller.doCall(['user'], RequestMethod.PUT, undefined, params, headers);

    return this.buildObjectFromResponse(NewUserRoleDataSource, callResponsePromise).then(
      (newUserRole: NewUserRoleDataSource) => newUserRole,
    );
  }

  protected callMock(): Promise<NewUserRoleDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SetUserRoleParams {
  [key: string]:
    | string
    | {
        groupId: string;
        role: string;
      }[]
    | boolean;
  authIdentifier: string;
  email: string;
  firstName: string;
  // groups: {
  //   groupId: string;
  //   role: string;
  // }[];
  isAdmin: boolean;
  lastName: string;
}
