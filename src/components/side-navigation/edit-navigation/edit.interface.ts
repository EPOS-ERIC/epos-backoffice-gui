import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { Status } from 'src/utility/enums/status.enum';

export interface IChangeItem {
  type: Entity;
  route: EntityEndpointValue;
  label: string;
  status: Status;
  color: string;
  id: string;
}
