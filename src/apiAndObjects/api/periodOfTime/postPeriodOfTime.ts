import { HttpHeaders } from '@angular/common/http';
import { PeriodOfTime } from 'generated/backofficeSchemas';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PeriodOfTimeDataSource } from 'src/apiAndObjects/objects/data-source/periodOfTimeDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class PostPeriodOfTime extends Endpoint<PeriodOfTimeDataSource, PeriodOfTime, PeriodOfTimeDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: PeriodOfTimeDataSource): string {
    return JSON.stringify(body);
  }

  protected callLive(body: PeriodOfTimeDataSource): Promise<PeriodOfTimeDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['periodoftime'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(PeriodOfTimeDataSource, callResponsePromise).then(
      (response: PeriodOfTimeDataSource) => response,
    );
  }

  protected callMock(): Promise<PeriodOfTimeDataSource> {
    throw new Error('Method not implemented.');
  }
}
