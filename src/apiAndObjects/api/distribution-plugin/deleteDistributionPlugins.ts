import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export interface DeleteDistributionPluginsParams {
  metaId: string;
  instanceId: string;
}
// this DELETE class take in a Distribution info and delete all relations between the Distribution and plugins (just to state it out clearly: not the plugins themselves). This is the way this endpoint works currently.
export class DeleteDistributionPlugins extends CacheableEndpoint<unknown, DeleteDistributionPluginsParams, unknown> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: DeleteDistributionPluginsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: DeleteDistributionPluginsParams): Promise<unknown> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      return new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
    };

    return this.apiCaller.doCall(
      `distribution-plugin/${params.metaId}/${params.instanceId}`,
      RequestMethod.DELETE,
      undefined,
      undefined,
      headers,
    );
  }

  protected callMock(): Promise<unknown> {
    return Promise.resolve({});
  }
}
