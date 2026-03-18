import { HttpHeaders } from '@angular/common/http';
import { Group } from 'generated/backofficeSchemas';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { GroupsDataSource } from 'src/apiAndObjects/objects/data-source/groupsDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetAllGroups extends Endpoint<Array<Group>, GetAllGroupsParams, Group> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllGroupsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<Group[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(['group/all'], RequestMethod.GET, undefined, undefined, headers);
    return this.buildObjectsFromResponse(GroupsDataSource, callResponsePromise);
  }

  protected callMock(): Promise<Group[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllGroupsParams {}
