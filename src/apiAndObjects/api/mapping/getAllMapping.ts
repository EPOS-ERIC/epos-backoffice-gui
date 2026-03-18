import { HttpHeaders } from '@angular/common/http';
import { Mapping } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { MappingDataSource } from 'src/apiAndObjects/objects/data-source/mappingDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetAllMapping extends CacheableEndpoint<Mapping[], GetAllMappingParams, Mapping> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllMappingParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<Mapping[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['mapping/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(MappingDataSource, callResponsePromise);
  }

  protected callMock(): Promise<Mapping[]> {
    throw new Error('Method not implemented.');
  }
}

export interface GetAllMappingParams {}
