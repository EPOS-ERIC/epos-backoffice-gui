import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { Category as CategoryType } from 'generated/backofficeSchemas';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { CategoryDataSource } from 'src/apiAndObjects/objects/data-source/categoryDetailDataSourse';

export class GetCategory extends Endpoint<Array<CategoryType>, GetCategoryParams, CategoryType> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetCategoryParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetCategoryParams): Promise<CategoryType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`category/${params.metaId}/${params.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(CategoryDataSource, callResponsePromise);
  }

  protected callMock(): Promise<CategoryType[]> {
    throw new Error('Method not implemented.');
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetCategoryParams) {
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

export interface GetCategoryParams {
  singleOptionOnly?: boolean;
  metaId: string;
  instanceId: string;
}
