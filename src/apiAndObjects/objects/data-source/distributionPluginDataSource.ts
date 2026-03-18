import { BaseObject } from 'src/apiAndObjects/_lib_code/objects/baseObject';
import {
  ModelPlugin,
  ModelPluginRelation,
  RoutesDistributionInfo,
  RoutesPluginWithRelationDetails,
} from 'generated/backofficeSchemas';

class PluginDataSource extends BaseObject implements ModelPlugin {
  public readonly arguments: string;
  public readonly description: string;
  public readonly enabled: boolean;
  public readonly executable: string;
  public readonly id: string;
  public readonly installed: boolean;
  public readonly name: string;
  public readonly repository: string;
  public readonly runtime: ModelPlugin['runtime'];
  public readonly version: string;
  public readonly version_type: ModelPlugin['version_type'];

  public constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.arguments = this._getString('arguments');
    this.description = this._getString('description');
    this.enabled = this._getValue('enabled') as boolean;
    this.executable = this._getString('executable');
    this.id = this._getString('id');
    this.installed = this._getValue('installed') as boolean;
    this.name = this._getString('name');
    this.repository = this._getString('repository');
    this.runtime = this._getValue('runtime') as ModelPlugin['runtime'];
    this.version = this._getString('version');
    this.version_type = this._getValue('version_type') as ModelPlugin['version_type'];
  }
}

class PluginRelationDataSource extends BaseObject implements ModelPluginRelation {
  public readonly id: string;
  public readonly input_format: string;
  public readonly output_format: string;
  public readonly plugin_id: string;
  public readonly relation_id: string;

  public constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.id = this._getString('id');
    this.input_format = this._getString('input_format');
    this.output_format = this._getString('output_format');
    this.plugin_id = this._getString('plugin_id');
    this.relation_id = this._getString('relation_id');
  }
}

class PluginWithRelationDetailsDataSource extends BaseObject implements RoutesPluginWithRelationDetails {
  public readonly plugin: ModelPlugin;
  public readonly relation: ModelPluginRelation;

  public constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.plugin = new PluginDataSource(this._getValue('plugin') as Record<string, unknown>);
    this.relation = new PluginRelationDataSource(this._getValue('relation') as Record<string, unknown>);
  }
}

export class DistributionPluginDataSource extends BaseObject implements RoutesDistributionInfo {
  public static readonly KEYS = {
    INSTANCE_ID: 'instance_id',
    RELATIONS: 'relations',
  };

  public readonly instance_id: string;
  public readonly relations: RoutesPluginWithRelationDetails[];

  protected constructor(sourceObject?: Record<string, unknown>) {
    super(sourceObject);
    this.instance_id = this._getString(DistributionPluginDataSource.KEYS.INSTANCE_ID);

    const relations = this._getArray(DistributionPluginDataSource.KEYS.RELATIONS) as Array<Record<string, unknown>>;
    this.relations = relations.map(
      (relation: Record<string, unknown>) => new PluginWithRelationDetailsDataSource(relation),
    );
  }
}
