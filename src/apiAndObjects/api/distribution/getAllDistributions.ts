import { HttpHeaders } from '@angular/common/http';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { GetAllDataProductsParams } from '../data-products/getAllDataProducts';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';

export class GetAllDistributions extends Endpoint<
  Array<DistributionDetailDataSource>,
  GetAllDistributionParams,
  DistributionDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllDataProductsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<DistributionDetailDataSource[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['distribution/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(DistributionDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<DistributionDetailDataSource[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllDistributionParams {}
