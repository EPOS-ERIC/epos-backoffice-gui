import { HttpHeaders } from '@angular/common/http';
import { SoftwareApplication } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { SoftwareDetailDataSource } from 'src/apiAndObjects/objects/data-source/softwareDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetAllSoftwareVersions extends CacheableEndpoint<
  Array<SoftwareApplication>,
  GetAllSoftwareApplicationVersionsParams,
  SoftwareApplication
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllSoftwareApplicationVersionsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetAllSoftwareApplicationVersionsParams): Promise<SoftwareApplication[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      [`softwareapplication/${params.metaId}/all`],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(SoftwareDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<SoftwareApplication[]> {
    throw new Error('Method not implemented.');
  }
}

export interface GetAllSoftwareApplicationVersionsParams {
  metaId: string;
}
