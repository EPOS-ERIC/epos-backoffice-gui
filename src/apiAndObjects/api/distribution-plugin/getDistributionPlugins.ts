import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { RoutesDistributionInfo } from 'generated/backofficeSchemas';
import { DistributionPluginDataSource } from 'src/apiAndObjects/objects/data-source/distributionPluginDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export interface GetDistributionPluginsParams {
  metaId: string;
  instanceId: string;
}

export class GetDistributionPlugins extends CacheableEndpoint<
  Array<RoutesDistributionInfo>,
  GetDistributionPluginsParams,
  RoutesDistributionInfo
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetDistributionPluginsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetDistributionPluginsParams): Promise<RoutesDistributionInfo[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller
      .doCall(
        `distribution-plugin/${params.metaId}/${params.instanceId}`,
        RequestMethod.GET,
        undefined,
        undefined,
        headers,
      )
      .then((response: unknown) => {
        if (Array.isArray(response)) {
          return response;
        }

        if (null == response) {
          return [];
        }

        return [response as Record<string, unknown>];
      });

    return this.buildObjectsFromResponse(DistributionPluginDataSource, callResponsePromise);
  }

  protected callMock(): Promise<RoutesDistributionInfo[]> {
    return Promise.resolve([]);
  }
}
