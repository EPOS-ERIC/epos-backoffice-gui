import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { Identifier as IdentifierType } from 'generated/backofficeSchemas';
import { IdentifierDataSource as IdentifierDataModel } from 'src/apiAndObjects/objects/data-source/identifierDetailDataSource';

export class GetAllIdentifiers extends Endpoint<Array<IdentifierType>, GetAllIdentifierParams, IdentifierType> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllIdentifierParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<IdentifierType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['identifier/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(IdentifierDataModel, callResponsePromise);
  }

  protected callMock(): Promise<IdentifierType[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllIdentifierParams {}
