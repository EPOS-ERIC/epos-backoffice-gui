import { BaseObject } from '../_lib_code/objects/baseObject';

export class CreateUpdateOrganizationDataSource extends BaseObject {
  public static readonly KEYS = {
    INSTANCE_ID: 'instanceId',
  };

  public readonly instanceId: string;

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);

    this.instanceId = this._getString(CreateUpdateOrganizationDataSource.KEYS.INSTANCE_ID);
  }
}
