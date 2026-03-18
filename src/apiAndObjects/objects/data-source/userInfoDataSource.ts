import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { UserGroup, User as UserType } from 'generated/backofficeSchemas';

export class UserInfoDataSource extends BaseObject implements UserType {
  public static readonly KEYS = {
    AUTH_IDENTIFIER: 'authIdentifier',
    LAST_NAME: 'lastName',
    FIRST_NAME: 'firstName',
    EMAIL: 'email',
    IS_ADMIN: 'isAdmin',
    GROUPS: 'groups',
  };

  public readonly authIdentifier: string;
  public readonly lastName: string;
  public readonly firstName: string;
  public readonly email: string;
  public readonly isAdmin: boolean;
  public readonly groups: Array<UserGroup>;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.authIdentifier = this._getString(UserInfoDataSource.KEYS.AUTH_IDENTIFIER);
    this.lastName = this._getString(UserInfoDataSource.KEYS.LAST_NAME);
    this.firstName = this._getString(UserInfoDataSource.KEYS.FIRST_NAME);
    this.email = this._getString(UserInfoDataSource.KEYS.EMAIL);
    this.isAdmin = this._getBoolean(UserInfoDataSource.KEYS.IS_ADMIN);
    this.groups = this._getArray(UserInfoDataSource.KEYS.GROUPS);
  }
}
