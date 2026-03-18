import { HttpHeaders } from '@angular/common/http';
import { WebserviceDetailDataSource } from 'src/apiAndObjects/objects/data-source/webserviceDetailDataSource';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { WebService } from 'src/apiAndObjects/objects/entities/webService.model';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';

export class GetAllWebservices extends CacheableEndpoint<
  Array<WebserviceDetailDataSource>,
  WebService,
  WebserviceDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: WebService): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<WebserviceDetailDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['webservice/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(WebserviceDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<WebserviceDetailDataSource[]> {
    throw new Error('Method not implemented.');
  }
}
