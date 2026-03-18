import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Category as CategoryType } from 'generated/backofficeSchemas';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { CategoryDataSource } from 'src/apiAndObjects/objects/data-source/categoryDetailDataSourse';

export class PutCategory extends Endpoint<CategoryDataSource, CategoryType, CategoryDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: CategoryType): string {
    return JSON.stringify(body);
  }

  protected callLive(body: CategoryType): Promise<CategoryDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['category'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(CategoryDataSource, callResponsePromise).then(
      (response: CategoryDataSource) => response,
    );
  }

  protected callMock(): Promise<CategoryDataSource> {
    throw new Error('Method not implemented.');
  }
}
