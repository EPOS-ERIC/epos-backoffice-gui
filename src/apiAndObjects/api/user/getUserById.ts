import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { UserInfoDataSource } from 'src/apiAndObjects/objects/data-source/userInfoDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetUserByID extends CacheableEndpoint<UserInfoDataSource, GetUserByIDParams, UserInfoDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetUserByIDParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetUserByIDParams): Promise<UserInfoDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };
    const callResponsePromise = this.apiCaller.doCall(
      [`user/${params.instance_id}`],
      RequestMethod.GET,
      {},
      undefined,
      headers,
    );

    return this.buildObjectFromResponse(UserInfoDataSource, callResponsePromise).then(
      (userInfo: UserInfoDataSource) => userInfo,
    );
  }

  protected callMock(): Promise<UserInfoDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface GetUserByIDParams {
  instance_id: string;
}
