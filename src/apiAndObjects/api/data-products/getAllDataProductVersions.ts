import { HttpHeaders } from '@angular/common/http';
import { DataProduct } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetAllDataProductVersions extends CacheableEndpoint<
  Array<DataProduct>,
  GetAllDataProductVersionsParams,
  DataProduct
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllDataProductVersionsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetAllDataProductVersionsParams): Promise<DataProduct[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      [`dataproduct/${params.metaId}/all`],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(DataProductDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<DataProduct[]> {
    throw new Error('Method not implemented.');
  }
}

export interface GetAllDataProductVersionsParams {
  metaId: string;
}
