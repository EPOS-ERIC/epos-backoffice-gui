import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';

export class PostAddEntityToGroup extends CacheableEndpoint<unknown, AddEntityToGroupParams, unknown> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: AddEntityToGroupParams): string {
    return JSON.stringify(body);
  }

  protected callLive(body: AddEntityToGroupParams): Promise<unknown> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['group/addEntityToGroup'],
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

export interface AddEntityToGroupParams {
  groupid: string;
  metaId: string;
}
