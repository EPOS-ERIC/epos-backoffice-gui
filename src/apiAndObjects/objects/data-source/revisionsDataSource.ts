import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';

export class RevisionsDataSource extends BaseObject {
  public static readonly KEYS = {
    UID: 'uid',
    VERSION: 'version',
    CREATED: 'created',
    EDITOR_ID: 'editorId',
  };
  public readonly uid: string;
  public readonly version: string;
  public readonly created: string;
  public readonly editorId: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.uid = this._getString(RevisionsDataSource.KEYS.UID);
    this.version = this._getString(RevisionsDataSource.KEYS.VERSION);
    this.created = this._getString(RevisionsDataSource.KEYS.CREATED);
    this.editorId = this._getString(RevisionsDataSource.KEYS.EDITOR_ID);
  }
}
