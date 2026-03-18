import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Identifier as IdentifierType } from 'generated/backofficeSchemas';
import { IdentifierDataSource as IdentifierDataModel } from 'src/apiAndObjects/objects/data-source/identifierDetailDataSource';

export class PutIdentifier extends CacheableEndpoint<IdentifierDataModel, IdentifierType, IdentifierDataModel> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: IdentifierType): string {
    return JSON.stringify(body);
  }

  protected callLive(body: IdentifierType): Promise<IdentifierDataModel> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['identifier'], RequestMethod.PUT, undefined, body, headers);

    return this.buildObjectFromResponse(IdentifierDataModel, callResponsePromise).then(
      (response: IdentifierDataModel) => response,
    );
  }

  protected callMock(): Promise<IdentifierDataModel> {
    throw new Error('Method not implemented.');
  }
}
