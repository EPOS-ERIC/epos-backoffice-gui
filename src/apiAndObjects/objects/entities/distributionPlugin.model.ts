import {
  ModelPlugin,
  ModelPluginRelation,
  RoutesDistributionInfo,
  RoutesPluginWithRelationDetails,
} from 'generated/backofficeSchemas';

export class DistributionPlugin implements ModelPlugin {
  public arguments?: string;
  public description?: string;
  public enabled?: boolean;
  public executable?: string;
  public id?: string;
  public installed?: boolean;
  public name?: string;
  public repository?: string;
  public runtime?: ModelPlugin['runtime'];
  public version?: string;
  public version_type?: ModelPlugin['version_type'];

  constructor(data?: Partial<ModelPlugin>) {
    Object.assign(this, data);
  }
}

export class DistributionPluginRelation implements ModelPluginRelation {
  constructor(
    public id?: string,
    public input_format?: string,
    public output_format?: string,
    public plugin_id?: string,
    public relation_id?: string,
  ) {}
}

export class DistributionPluginWithRelationDetails implements RoutesPluginWithRelationDetails {
  constructor(
    public plugin?: ModelPlugin,
    public relation?: ModelPluginRelation,
  ) {}
}

export class DistributionPluginInfo implements RoutesDistributionInfo {
  constructor(
    public instance_id?: string,
    public relations?: RoutesPluginWithRelationDetails[],
  ) {}
}
