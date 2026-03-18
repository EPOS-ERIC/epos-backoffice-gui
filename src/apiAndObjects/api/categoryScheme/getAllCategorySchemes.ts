import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { CategoryScheme as CategorySchemeType } from 'generated/backofficeSchemas';
import { CategorySchemeDataSource } from 'src/apiAndObjects/objects/data-source/categorySchemeDetailDataSource';

export class GetAllCategorySchemes extends Endpoint<
  Array<CategorySchemeType>,
  GetAllCategorySchemeParams,
  CategorySchemeType
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllCategorySchemeParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<CategorySchemeType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['categoryscheme/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(CategorySchemeDataSource, callResponsePromise);
  }

  protected callMock(): Promise<CategorySchemeType[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllCategorySchemeParams {}
