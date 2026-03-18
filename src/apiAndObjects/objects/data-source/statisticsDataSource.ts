import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';

export class StatisticsDataSource extends BaseObject {
  public static readonly KEYS = {
    ENTITY: 'entity',
    PUBLISHED: 'published',
    SUBMITTED: 'submitted',
    DRAFT: 'draft',
  };

  public readonly entity: string;
  public readonly published: number;
  public readonly submitted: number;
  public readonly draft: number;

  protected constructor() {
    super();

    this.entity = this._getString(StatisticsDataSource.KEYS.ENTITY);
    this.published = this._getNumber(StatisticsDataSource.KEYS.PUBLISHED);
    this.submitted = this._getNumber(StatisticsDataSource.KEYS.SUBMITTED);
    this.draft = this._getNumber(StatisticsDataSource.KEYS.DRAFT);
  }
}
