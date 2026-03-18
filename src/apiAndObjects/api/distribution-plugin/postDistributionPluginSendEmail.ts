import { HttpHeaders } from '@angular/common/http';
import { EmailPluginRequest } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export interface PostDistributionPluginSendEmailParams {
  metaId: string;
  instanceId: string;
  message: string;
}

export class PostDistributionPluginSendEmail extends CacheableEndpoint<
  unknown,
  PostDistributionPluginSendEmailParams,
  unknown
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: PostDistributionPluginSendEmailParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: PostDistributionPluginSendEmailParams): Promise<unknown> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const callHeaders = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return callHeaders;
    };

    const body: EmailPluginRequest = {
      message: params.message,
    };

    return this.apiCaller.doCall(
      `distribution-plugin/${params.metaId}/${params.instanceId}/send-email`,
      RequestMethod.POST,
      undefined,
      body,
      headers,
    );
  }

  protected callMock(): Promise<unknown> {
    return Promise.resolve({});
  }
}
