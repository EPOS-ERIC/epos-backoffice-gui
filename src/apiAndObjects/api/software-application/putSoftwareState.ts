import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { DataProduct } from 'generated/backofficeSchemas';
import { SoftwareDetailDataSource } from 'src/apiAndObjects/objects/data-source/softwareDetailDataSource';

export class PutSoftwareState extends Endpoint<SoftwareDetailDataSource, UpdateStateObject, SoftwareDetailDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: UpdateStateObject): string {
    return JSON.stringify(body);
  }

  protected callLive(body: UpdateStateObject): Promise<SoftwareDetailDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const updateObj = {
      instanceId: body.instanceId,
      status: body.status,
    };
    const callResponsePromise = this.apiCaller.doCall(
      ['softwareapplication'],
      RequestMethod.PUT,
      undefined,
      updateObj,
      headers,
    );

    return this.buildObjectFromResponse(SoftwareDetailDataSource, callResponsePromise).then(
      (response: SoftwareDetailDataSource) => response,
    );
  }

  protected callMock(): Promise<SoftwareDetailDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface UpdateStateObject {
  instanceId: string;
  status: DataProduct['status'];
}
