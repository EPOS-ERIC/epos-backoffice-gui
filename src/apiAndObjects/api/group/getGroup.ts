import { HttpHeaders } from '@angular/common/http';
import { Group } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { GroupsDataSource } from 'src/apiAndObjects/objects/data-source/groupsDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetGroup extends CacheableEndpoint<Array<Group>, GetGroupParams, Group> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetGroupParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetGroupParams): Promise<Group[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`group/${params.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(GroupsDataSource, callResponsePromise);
  }

  protected callMock(): Promise<Group[]> {
    throw new Error('Method not implemented.');
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetGroupParams) {
    if (Array.isArray(data)) {
      data.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? data.slice(0, 1) : data;
    } else {
      const dataAsArr: Array<Record<string, unknown>> = [];
      dataAsArr.push(data as Record<string, unknown>);
      dataAsArr.forEach((item: Record<string, unknown>, index: number) => (item['id'] = String(index).valueOf()));
      return params.singleOptionOnly === true ? dataAsArr.slice(0, 1) : dataAsArr;
    }
  }
}

export interface GetGroupParams {
  singleOptionOnly?: boolean;
  instanceId: string;
}
