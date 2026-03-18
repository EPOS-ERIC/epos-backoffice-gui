import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';

export class PostAddUserToGroup extends CacheableEndpoint<unknown, AddUserToGroupParams, unknown> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: AddUserToGroupParams): string {
    return JSON.stringify(body);
  }

  protected callLive(body: AddUserToGroupParams): Promise<unknown> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['group/addUserToGroup'],
      RequestMethod.POST,
      undefined,
      body,
      headers,
    );

    return this.buildObjectFromResponse(BaseObject, callResponsePromise).then((response: unknown) => response);
  }

  protected callMock(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}

export interface AddUserToGroupParams {
  groupid: string;
  role: string;
  status: string;
  userid: string;
}
