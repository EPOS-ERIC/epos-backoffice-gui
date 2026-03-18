import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { CategoryScheme as CategorySchemeType } from 'generated/backofficeSchemas';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { CategorySchemeDataSource } from 'src/apiAndObjects/objects/data-source/categorySchemeDetailDataSource';

export class GetCategoryScheme extends Endpoint<
  Array<CategorySchemeType>,
  GetCategorySchemeParams,
  CategorySchemeType
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetCategorySchemeParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetCategorySchemeParams): Promise<CategorySchemeType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(`categoryscheme/${params.metaId}/${params.instanceId}`, RequestMethod.GET, undefined, undefined, headers)
      .then((data: unknown) => this.processResponseData(data, params));
    return this.buildObjectsFromResponse(CategorySchemeDataSource, callResponsePromise);
  }

  protected callMock(): Promise<CategorySchemeType[]> {
    throw new Error('Method not implemented.');
  }

  private processResponseData(data: Array<Record<string, unknown>> | unknown, params: GetCategorySchemeParams) {
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

export interface GetCategorySchemeParams {
  singleOptionOnly?: boolean;
  metaId: string;
  instanceId: string;
}
