import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Distribution } from 'src/apiAndObjects/objects/entities/distribution.model';
import { DistributionDetailDataSource } from 'src/apiAndObjects/objects/data-source/distributionDetailDataSource';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';

export class PostDistributionDetail extends Endpoint<
  DistributionDetailDataSource,
  Distribution,
  DistributionDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: Distribution): string {
    return JSON.stringify(body);
  }

  protected callLive(body: Distribution): Promise<DistributionDetailDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['distribution'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(DistributionDetailDataSource, callResponsePromise).then(
      (response: DistributionDetailDataSource) => response,
    );
  }

  protected callMock(): Promise<DistributionDetailDataSource> {
    throw new Error('Method not implemented.');
  }
}
