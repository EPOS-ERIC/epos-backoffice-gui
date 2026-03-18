import { HttpHeaders } from '@angular/common/http';
import { OperationDetailDataSource } from 'src/apiAndObjects/objects/data-source/operationDetailDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetAllOperations extends CacheableEndpoint<
  Array<OperationDetailDataSource>,
  GetAllOperationParams,
  OperationDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllOperationParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<OperationDetailDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['operation/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(OperationDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<OperationDetailDataSource[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllOperationParams {}
