import { Group, Documentation as DocumentationType } from 'generated/backofficeSchemas';
import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import { Status } from 'src/utility/enums/status.enum';

export class DocumentationDataSource extends BaseObject implements DocumentationType {
  public static readonly KEYS = {
    CHANGE_COMMENT: 'changeComment',
    CHANGE_TIMESTAMP: 'changeTimestamp',
    DESCRIPTION: 'description',
    EDITOR_ID: 'editorId',
    FILE_PROVENANCE: 'fileProvenance',
    GROUPS: 'groups',
    INSTANCE_CHANGED_ID: 'instanceChangedId',
    INSTANCE_ID: 'instanceId',
    META_ID: 'metaId',
    OPERATION: 'operation',
    STATUS: 'status',
    TITLE: 'title',
    TO_BE_DELETE: 'toBeDelete',
    UID: 'uid',
    URI: 'uri',
    VERSION: 'version',
    VERSION_ID: 'versionId',
  };

  public readonly changeComment: string;
  public readonly changeTimestamp: string;
  public readonly description: string;
  public readonly editorId: string;
  public readonly fileProvenance: string;
  public readonly groups: string[];
  public readonly instanceChangedId: string;
  public readonly instanceId: string;
  public readonly metaId: string;
  public readonly operation: string;
  public readonly status: Status;
  public readonly title: string;
  public readonly toBeDelete: string;
  public readonly uid: string;
  public readonly uri: string;
  public readonly version: string;
  public readonly versionId: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.changeComment = this._getString(DocumentationDataSource.KEYS.CHANGE_COMMENT);
    this.changeTimestamp = this._getString(DocumentationDataSource.KEYS.CHANGE_TIMESTAMP);
    this.description = this._getString(DocumentationDataSource.KEYS.DESCRIPTION);
    this.editorId = this._getString(DocumentationDataSource.KEYS.EDITOR_ID);
    this.fileProvenance = this._getString(DocumentationDataSource.KEYS.FILE_PROVENANCE);
    this.groups = this._getArray(DocumentationDataSource.KEYS.GROUPS);
    this.instanceChangedId = this._getString(DocumentationDataSource.KEYS.INSTANCE_CHANGED_ID);
    this.instanceId = this._getString(DocumentationDataSource.KEYS.INSTANCE_ID);
    this.metaId = this._getString(DocumentationDataSource.KEYS.META_ID);
    this.operation = this._getString(DocumentationDataSource.KEYS.OPERATION);
    this.status = this._getValue(DocumentationDataSource.KEYS.STATUS) as Status;
    this.title = this._getString(DocumentationDataSource.KEYS.TITLE);
    this.toBeDelete = this._getString(DocumentationDataSource.KEYS.TO_BE_DELETE);
    this.uid = this._getString(DocumentationDataSource.KEYS.UID);
    this.uri = this._getString(DocumentationDataSource.KEYS.URI);
    this.version = this._getString(DocumentationDataSource.KEYS.VERSION);
    this.versionId = this._getString(DocumentationDataSource.KEYS.VERSION_ID);
  }
}

export type Documentation = {
  changeComment?: string;
  changeTimestamp?: string;
  description?: string;
  editorId?: string;
  fileProvenance?: string;
  groups?: Group[];
  instanceChangedId?: string;
  instanceId?: string;
  metaId?: string;
  operation?: string;
  status?: Status;
  title?: string;
  toBeDelete?: string;
  uid?: string;
  uri?: string;
  version?: string;
  versionId?: string;
};
