import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { CategoryScheme as CategorySchemeType } from 'generated/backofficeSchemas';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { CategorySchemeDataSource } from 'src/apiAndObjects/objects/data-source/categorySchemeDetailDataSource';

export class PutCategoryScheme extends Endpoint<
  CategorySchemeDataSource,
  CategorySchemeType,
  CategorySchemeDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: CategorySchemeType): string {
    return JSON.stringify(body);
  }

  protected callLive(body: CategorySchemeType): Promise<CategorySchemeDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['categoryscheme'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(CategorySchemeDataSource, callResponsePromise).then(
      (response: CategorySchemeDataSource) => response,
    );
  }

  protected callMock(): Promise<CategorySchemeDataSource> {
    throw new Error('Method not implemented.');
  }
}
