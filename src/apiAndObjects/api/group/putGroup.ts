import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Group } from 'generated/backofficeSchemas';
import { GroupsDataSource } from 'src/apiAndObjects/objects/data-source/groupsDataSource';

export class PutGroup extends CacheableEndpoint<GroupsDataSource, Group, GroupsDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: Group): string {
    return JSON.stringify(body);
  }

  protected callLive(body: Group): Promise<GroupsDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['group'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(GroupsDataSource, callResponsePromise).then(
      (response: GroupsDataSource) => response,
    );
  }

  protected callMock(): Promise<GroupsDataSource> {
    throw new Error('Method not implemented.');
  }
}
