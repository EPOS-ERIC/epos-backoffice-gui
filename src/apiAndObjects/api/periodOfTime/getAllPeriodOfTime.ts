import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { PeriodOfTimeDataSource as PeriodOfTimeModel } from 'src/apiAndObjects/objects/data-source/periodOfTimeDetailDataSource';
import { PeriodOfTime as PeriodOfTimeType } from 'generated/backofficeSchemas';

export class GetAllPeriodOfTime extends Endpoint<Array<PeriodOfTimeType>, GetAllPeriodOfTimeParams, PeriodOfTimeType> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllPeriodOfTimeParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<PeriodOfTimeType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['periodoftime/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(PeriodOfTimeModel, callResponsePromise);
  }

  protected callMock(): Promise<PeriodOfTimeType[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllPeriodOfTimeParams {}
