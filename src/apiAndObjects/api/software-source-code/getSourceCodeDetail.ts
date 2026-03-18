import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { SourceCodeDetailDataSource } from 'src/apiAndObjects/objects/data-source/sourceCodeDetailDataSource';

export class GetSourceCodeDetail extends CacheableEndpoint<
  Array<SourceCodeDetailDataSource>,
  GetSourceCodeDetailsParams,
  SourceCodeDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetSourceCodeDetailsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetSourceCodeDetailsParams): Promise<Array<SourceCodeDetailDataSource>> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };
    const callResponsePromise = this.apiCaller
      .doCall(
        `softwaresourcecode/${params.metaId}/${params.instanceId}`,
        RequestMethod.GET,
        undefined,
        undefined,
        headers,
      )
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(SourceCodeDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<SourceCodeDetailDataSource[]> {
    // const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      SourceCodeDetailDataSource,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockGet);
        }, 100);
      }),
    );
  }

  private processResponseData(
    data: Array<Record<string, unknown>> | unknown,
    params: GetSourceCodeDetailsParams,
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

export interface GetSourceCodeDetailsParams {
  singleOptionOnly?: boolean;
  metaId: string;
  instanceId: string;
}

const mockGet = {};
