import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataProduct } from 'generated/backofficeSchemas';
import { lastValueFrom } from 'rxjs';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { DataProductDetailDataSource as DataProductModel } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetDataProductDetail extends CacheableEndpoint<
  Array<DataProduct>,
  GetDataProductsDetailsParams,
  DataProduct
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetDataProductsDetailsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetDataProductsDetailsParams): Promise<DataProduct[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`dataproduct/${params.metaId}/${params.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(DataProductModel, callResponsePromise);
  }

  protected callMock(): Promise<DataProduct[]> {
    const httpClient = this.injector.get<HttpClient>(HttpClient);
    return this.buildObjectsFromResponse(
      DataProductModel,
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(lastValueFrom(httpClient.get('/assets/data/dataProduct.json')));
        }, 100);
      }),
    );
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetDataProductsDetailsParams) {
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

export interface GetDataProductsDetailsParams {
  singleOptionOnly?: boolean;
  metaId: string;
  instanceId: string;
}
