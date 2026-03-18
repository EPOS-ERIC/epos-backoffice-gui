import { HttpHeaders } from '@angular/common/http';
import { Person } from 'src/apiAndObjects/objects/entities/person.model';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { GetAllDataProductsParams } from '../data-products/getAllDataProducts';
import { PersonDataSource } from 'src/apiAndObjects/objects/data-source/personDataSource';

export class GetAllPeople extends CacheableEndpoint<Array<Person>, GetAllPeopleParams, Person> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllDataProductsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<Person[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(['person/all'], RequestMethod.GET, undefined, undefined, headers);
    return this.buildObjectsFromResponse(PersonDataSource, callResponsePromise);
  }

  protected callMock(): Promise<Person[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllPeopleParams {}
