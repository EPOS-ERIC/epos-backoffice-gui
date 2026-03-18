import { HttpHeaders } from '@angular/common/http';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { DataProductDetailDataSource } from 'src/apiAndObjects/objects/data-source/dataProductDetailDataSource';
import { Endpoint } from 'src/apiAndObjects/_lib_code/api/endpoint.abstract';
import { DataProduct } from 'generated/backofficeSchemas';

export class PutDataProductState extends Endpoint<
  DataProductDetailDataSource,
  UpdateStateObject,
  DataProductDetailDataSource
> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: UpdateStateObject): string {
    return JSON.stringify(body);
  }

  protected callLive(body: UpdateStateObject): Promise<DataProductDetailDataSource> {
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
      ['dataproduct'],
      RequestMethod.PUT,
      undefined,
      updateObj,
      headers,
    );

    return this.buildObjectFromResponse(DataProductDetailDataSource, callResponsePromise).then(
      (response: DataProductDetailDataSource) => response,
    );
  }

  protected callMock(): Promise<DataProductDetailDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface UpdateStateObject {
  instanceId: string;
  status: DataProduct['status'];
}
