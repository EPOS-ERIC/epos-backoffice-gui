import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Location as LocationType } from 'generated/backofficeSchemas';
import { LocationDataSource as LocationDataModel } from 'src/apiAndObjects/objects/data-source/locationDetailDataSource';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
export class PostLocation extends Endpoint<LocationDataModel, LocationType, LocationDataModel> {
  private persistorService: PersistorService = new PersistorService();

  protected callLive(body: LocationType): Promise<LocationDataModel> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['location'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(LocationDataModel, callResponsePromise).then(
      (response: LocationDataModel) => response,
    );
  }

  protected callMock(): Promise<LocationDataModel> {
    throw new Error('Method not implemented.');
  }
}
