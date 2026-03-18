import { Group, LinkedEntity } from 'generated/backofficeSchemas';
import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { Status } from 'src/utility/enums/status.enum';

export class PersonDataSource extends BaseObject {
  public static readonly KEYS = {
    ACRONYM: 'acronym',
    ADDRESS: 'address',
    AFFILIATION: 'affiliation',
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    CONTACT_POINT: 'contactPoint',
    CV_URL: 'cvurl',
    EDITOR_ID: 'editorId',
    EMAIL: 'email',
    FAMILY_NAME: 'familyName',
    FILE_PROVENANCE: 'fileProvenance',
    GIVEN_NAME: 'givenName',
    GROUPS: 'groups',
    IDENTIFIER: 'identifier',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    INSTANCE_ID: 'instanceId',
    META_ID: 'metaId',
    OPERATION: 'operation',
    QUALIFICATIONS: 'qualifications',
    STATUS: 'status',
    TELEPHONE: 'telephone',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    VERSION: 'version',
    VERSION_ID: 'versionId',
  };

  public readonly acronym: string;
  public readonly address: LinkedEntity;
  public readonly affiliation: string[];
  public readonly changeComment: string;
  public readonly changeTimestamp: string;
  public readonly contactPoint: LinkedEntity[];
  public readonly cvurl: string;
  public readonly editorId: string;
  public readonly email: string[];
  public readonly familyName: string;
  public readonly fileProvenance: string;
  public readonly givenName: string;
  public readonly groups: Group[];
  public readonly identifier: LinkedEntity[];
  public readonly instanceChangedId: string;
  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly operation: string;
  public readonly qualifications: string[];
  public readonly status: Status;
  public readonly telephone: string[];
  public readonly toBeDelete: string;
  public readonly uid: string;
  public readonly version: string;
  public readonly versionId: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.acronym = this._getString(PersonDataSource.KEYS.ACRONYM);
    this.address = this._getValue(PersonDataSource.KEYS.ADDRESS) as LinkedEntity;
    this.affiliation = this._getArray(PersonDataSource.KEYS.AFFILIATION);
    this.changeComment = this._getString(PersonDataSource.KEYS.CHANGE_COMMENT);
    this.changeTimestamp = this._getString(PersonDataSource.KEYS.CHANGE_TIMESTAMP);
    this.contactPoint = this._getArray(PersonDataSource.KEYS.CONTACT_POINT);
    this.cvurl = this._getString(PersonDataSource.KEYS.CV_URL);
    this.editorId = this._getString(PersonDataSource.KEYS.EDITOR_ID);
    this.email = this._getArray(PersonDataSource.KEYS.EMAIL);
    this.familyName = this._getString(PersonDataSource.KEYS.FAMILY_NAME);
    this.fileProvenance = this._getString(PersonDataSource.KEYS.FILE_PROVENANCE);
    this.givenName = this._getString(PersonDataSource.KEYS.GIVEN_NAME);
    this.groups = this._getArray(PersonDataSource.KEYS.GROUPS);
    this.identifier = this._getArray(PersonDataSource.KEYS.IDENTIFIER);
    this.instanceChangedId = this._getString(PersonDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.instanceId = this._getString(PersonDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(PersonDataSource.KEYS.META_ID);
    this.operation = this._getString(PersonDataSource.KEYS.OPERATION);
    this.qualifications = this._getArray(PersonDataSource.KEYS.QUALIFICATIONS);
    this.status = this._getValue(PersonDataSource.KEYS.STATUS) as Status;
    this.telephone = this._getArray(PersonDataSource.KEYS.TELEPHONE);
    this.toBeDelete = this._getString(PersonDataSource.KEYS.TO_BE_DELETE);
    this.uid = this._getString(PersonDataSource.KEYS.UID);
    this.version = this._getString(PersonDataSource.KEYS.VERSION);
    this.versionId = this._getString(PersonDataSource.KEYS.VERSION_ID);
  }
}
