import { HttpHeaders } from '@angular/common/http';
import { CacheableEndpoint } from 'src/apiAndObjects/_lib_code/api/cacheableEndpoint.abstract';
import { RequestMethod } from 'src/apiAndObjects/_lib_code/api/requestMethod.enum';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { Group } from 'src/apiAndObjects/objects/entities/group.model';
import { Entity } from 'src/utility/enums/entity.enum';
import { CreateUserDataSource } from 'src/apiAndObjects/objects/createUserDataSource';
import { UserRole } from 'src/utility/enums/UserRole.enum';

export class PostUserDetail extends CacheableEndpoint<CreateUserDataSource, SaveUserBody, CreateUserDataSource> {
  private persistorService: PersistorService = new PersistorService();

  protected getCacheKey(body: SaveUserBody): string {
    return JSON.stringify(body);
  }

  protected callLive(body: SaveUserBody): Promise<CreateUserDataSource> {
    const accessToken = this.persistorService.getValueFromStorage(StorageType.SESSION_STORAGE, StorageKey.ACCESS_TOKEN);
    const headers = (): HttpHeaders => {
      const headers = new HttpHeaders()
        .set('Authorization', accessToken ? `Bearer ${accessToken}` : '')
        .set('Content-Type', 'application/json');
      return headers;
    };
    const callResponsePromise = this.apiCaller.doCall(['user'], RequestMethod.POST, undefined, body, headers);

    return this.buildObjectFromResponse(CreateUserDataSource, callResponsePromise).then(
      (response: CreateUserDataSource) => response,
    );
  }

  protected callMock(): Promise<CreateUserDataSource> {
    throw new Error('Method not implemented.');
  }
}

export interface SaveUserBody {
  accessibleSection: Array<Entity>;
  eduPersonUniqueId: string;
  email: string;
  firstName: string;
  groups: Array<Group>;
  instanceId: string;
  lastName: string;
  metaId: string;
  registered: boolean;
  role: UserRole;
}
