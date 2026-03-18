import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { ContactPoint } from 'generated/backofficeSchemas';
import { ContactPointDetailDataSource } from 'src/apiAndObjects/objects/data-source/contactPointDetailDataSource';

export class PostContactPointDetail extends CacheableEndpoint<ContactPoint, ContactPoint, ContactPoint> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: ContactPoint): string {
    return JSON.stringify(body);
  }

  protected callLive(body: ContactPoint): Promise<ContactPoint> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['contactpoint'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(ContactPointDetailDataSource, callResponsePromise).then(
      (response: ContactPoint) => response,
    );
  }

  protected callMock(): Promise<ContactPoint> {
    throw new Error('Method not implemented.');
  }
}
