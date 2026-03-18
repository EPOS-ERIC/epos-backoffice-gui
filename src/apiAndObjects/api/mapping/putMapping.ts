import { HttpHeaders } from '@angular/common/http';
import { Mapping } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { MappingDataSource } from 'src/apiAndObjects/objects/data-source/mappingDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class PutMapping extends CacheableEndpoint<Mapping, Mapping, Mapping> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: Mapping): string {
    return JSON.stringify(body);
  }

  protected callLive(body: Mapping): Promise<Mapping> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['mapping'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(MappingDataSource, callResponsePromise).then((response: Mapping) => response);
  }

  protected callMock(): Promise<Mapping> {
    throw new Error('Method not implemented.');
  }
}
