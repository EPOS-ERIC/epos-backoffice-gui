import { HttpHeaders } from '@angular/common/http';
import { SoftwareSourceCode } from 'generated/backofficeSchemas';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { SourceCodeDetailDataSource } from 'src/apiAndObjects/objects/data-source/sourceCodeDetailDataSource';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

export class GetAllSourceCodeVersions extends CacheableEndpoint<
  Array<SoftwareSourceCode>,
  GetAllSourceCodeVersionsParams,
  SoftwareSourceCode
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllSourceCodeVersionsParams): string {
    return JSON.stringify(params);
  }

  protected callLive(params: GetAllSourceCodeVersionsParams): Promise<SoftwareSourceCode[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      [`softwaresourcecode/${params.metaId}/all`],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(SourceCodeDetailDataSource, callResponsePromise);
  }

  protected callMock(): Promise<SoftwareSourceCode[]> {
    throw new Error('Method not implemented.');
  }
}

export interface GetAllSourceCodeVersionsParams {
  metaId: string;
}
