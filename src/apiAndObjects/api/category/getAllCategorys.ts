import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { Category as CategoryType } from 'generated/backofficeSchemas';
import { CategoryDataSource } from 'src/apiAndObjects/objects/data-source/categoryDetailDataSourse';

export class GetAllCategorys extends Endpoint<Array<CategoryType>, GetAllCategoryParams, CategoryType> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllCategoryParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<CategoryType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['category/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(CategoryDataSource, callResponsePromise);
  }

  protected callMock(): Promise<CategoryType[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllCategoryParams {}
