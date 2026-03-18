import { HttpHeaders } from '@angular/common/http';
import { OrganizationDataSource } from 'src/apiAndObjects/objects/data-source/organizationDataSource';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { GetAllDataProductsParams } from '../data-products/getAllDataProducts';

export class GetAllOrganizations extends CacheableEndpoint<
  Array<OrganizationDataSource>,
  GetAllOrganizationsParams,
  OrganizationDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllDataProductsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<OrganizationDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['organization/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(OrganizationDataSource, callResponsePromise);
  }

  protected callMock(): Promise<OrganizationDataSource[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllOrganizationsParams {}
