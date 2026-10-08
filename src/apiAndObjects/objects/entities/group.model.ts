import { Group as GroupType } from 'generated/backofficeSchemas';

export class Group implements GroupType {
  constructor(
    public description: string,
    public id: string,
    public name: string,
    public entities: Array<Record<string, any>>,
    public users: Array<{ [key: string]: string }>,
  ) { }
}
