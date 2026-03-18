import { LinkedEntity, Organization as OrganizationType } from 'generated/backofficeSchemas';

export class Organization implements OrganizationType {
  constructor(
    public uid: string,
    public acronym: string,
    public address: LinkedEntity,
    public changeComment: string,
    public changeTimestamp: string,
    public contactPoint: Array<LinkedEntity>,
    public editorId: string,
    public email: Array<string>,
    public fileProvenance: string,
    public identifier: Array<LinkedEntity>,
    public instanceChangedId: string,
    public instanceId: string,
    public legalName: Array<string>,
    public leiCode: string,
    public logo: string,
    public maturity: string,
    public memberOf: Array<LinkedEntity>,
    public metaId: string,
    public operation: string,
    public owns: Array<LinkedEntity>,
    public state: OrganizationType['status'],
    public telephone: Array<string>,
    public toBeDelete: string,
    public type: string,
    public url: string,
    public version: string,
  ) {}
}
