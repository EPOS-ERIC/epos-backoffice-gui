import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { Documentation as DocumentationType } from 'generated/backofficeSchemas';
import { DocumentationDataSource } from 'src/apiAndObjects/objects/data-source/documentationDetailDataSource';

export class GetAllDocumentation extends Endpoint<
  Array<DocumentationType>,
  GetAllDocumentationParams,
  DocumentationType
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(params: GetAllDocumentationParams): string {
    return JSON.stringify(params);
  }

  protected callLive(): Promise<DocumentationType[]> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      let authHeader = new HttpHeaders();
      authHeader = authHeader.append('Authorization', accessToken ? `Bearer ${accessToken}` : '');
      return authHeader;
    };

    const callResponsePromise = this.apiCaller.doCall(
      ['documentation/all'],
      RequestMethod.GET,
      undefined,
      undefined,
      headers,
    );
    return this.buildObjectsFromResponse(DocumentationDataSource, callResponsePromise);
  }

  protected callMock(): Promise<DocumentationType[]> {
    throw new Error('Method not implemented.');
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetAllDocumentationParams {}
