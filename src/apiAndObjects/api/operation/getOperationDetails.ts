import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetOperationDetails extends CacheableEndpoint<
  Array<OperationDetailDataSource>,
  GetOperationDetailsParams,
  OperationDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetOperationDetailsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetOperationDetailsParams): Promise<Array<OperationDetailDataSource>> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };
    const callResponsePromise = this.apiCaller
      .doCall(`operation/${params.metaId}/${params.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(OperationDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<OperationDetailDataSource[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      OperationDetailDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/organization.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetOperationDetailsParams,
  ): Array<Record<string, unknown>> {
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

export interface GetOperationDetailsParams {
  singleOptionOnly?: boolean;
  metaId: string;
  instanceId: string;
}
