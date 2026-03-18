import { LinkedEntity as LinkedEntityType } from 'generated/backofficeSchemas';

export class LinkedEntity implements LinkedEntityType {
  constructor(public entityType?: string, public instanceId?: string, public metaId?: string, public uid?: string) {}
}
