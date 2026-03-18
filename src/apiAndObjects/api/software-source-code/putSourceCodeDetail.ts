import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { SoftwareSourceCode } from 'generated/backofficeSchemas';
import { SourceCodeDetailDataSource } from 'src/apiAndObjects/objects/data-source/sourceCodeDetailDataSource';

export class PutSourceCodeDetail extends CacheableEndpoint<
  SourceCodeDetailDataSource,
  SoftwareSourceCode,
  SourceCodeDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SoftwareSourceCode): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SoftwareSourceCode): Promise<SourceCodeDetailDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['softwaresourcecode'],
      RequestMethod.PUT,
      undefined,
      body,
      headers,
    );

    return this.buildObjectFromResponse(SourceCodeDetailDataSource, callResponsePromise).then(
      (response: SourceCodeDetailDataSource) => response,
    );
  }

  protected callMock(): Promise<SourceCodeDetailDataSource> {
    throw new Error('Method not implemented.');
  }
}
