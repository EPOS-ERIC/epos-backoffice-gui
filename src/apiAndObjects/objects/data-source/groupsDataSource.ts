import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { Group as GroupType } from 'generated/backofficeSchemas';

export class GroupsDataSource extends BaseObject implements GroupType {
  public static readonly KEYS = {
    NAME: 'name',
    DESCRIPTION: 'description',
    ENTITIES: 'entities',
    ID: 'id',
    USERS: 'users',
  };

  public readonly name: string;
  public readonly description: string;
  public readonly entities: Array<string>;
  public readonly id: string;
  public readonly users: Array<{ [key: string]: string }>;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.name = this._getString(GroupsDataSource.KEYS.NAME);
    this.description = this._getString(GroupsDataSource.KEYS.DESCRIPTION);
    this.entities = this._getArray(GroupsDataSource.KEYS.ENTITIES);
    this.id = this._getString(GroupsDataSource.KEYS.ID);
    this.users = this._getArray(GroupsDataSource.KEYS.USERS);
  }
}
