import { HttpHeaders } from '@angular/common/http';
import { UserInfoDataSource } from 'src/apiAndObjects/objects/data-source/userInfoDataSource';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';

export class GetAllUsers extends Endpoint<Array<UserInfoDataSource>, GetAllUsersParams, UserInfoDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllUsersParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<UserInfoDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(['user/all'], RequestMethod.GET, undefined, undefined, headers);
    return this.buildObjectsFromResponse(UserInfoDataSource, callResponsePromise);
  }

  protected callMock(): Promise<UserInfoDataSource[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllUsersParams {}
