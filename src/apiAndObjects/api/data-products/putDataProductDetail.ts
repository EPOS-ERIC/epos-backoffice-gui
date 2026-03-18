import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { DataProduct } from 'src/apiAndObjects/objects/entities/dataProduct.model';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';

export class PutDataProductDetail extends CacheableEndpoint<
  DataProductDetailDataSource,
  DataProduct,
  DataProductDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: DataProduct): string {
    return JSON.stringify(body);
  }

  protected callLive(body: DataProduct): Promise<DataProductDetailDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['dataproduct'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(DataProductDetailDataSource, callResponsePromise).then(
      (response: DataProductDetailDataSource) => response,
    );
  }

  protected callMock(): Promise<DataProductDetailDataSource> {
    throw new Error('Method not implemented.');
  }
}
