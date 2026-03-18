import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Documentation as DocumentationType } from 'generated/backofficeSchemas';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { DocumentationDataSource } from 'src/apiAndObjects/objects/data-source/documentationDetailDataSource';

export class PostDocumentation extends Endpoint<DocumentationDataSource, DocumentationType, DocumentationDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected callLive(body: DocumentationType): Promise<DocumentationDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['documentation'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(DocumentationDataSource, callResponsePromise).then(
      (response: DocumentationDataSource) => response,
    );
  }

  protected callMock(): Promise<DocumentationDataSource> {
    throw new Error('Method not implemented.');
  }
}
