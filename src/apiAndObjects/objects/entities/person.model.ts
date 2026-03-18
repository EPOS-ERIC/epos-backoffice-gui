import { Group, LinkedEntity } from 'generated/backofficeSchemas';
import { Status } from 'src/utility/enums/status.enum';

export class Person {
  constructor(
    public acronym?: string,
    public address?: LinkedEntity,
    public affiliation?: string[],
    public changeComment?: string,
    public changeTimestamp?: string,
    public contactPoint?: LinkedEntity[],
    public cvurl?: string,
    public editorId?: string,
    public email?: string[],
    public familyName?: string,
    public fileProvenance?: string,
    public givenName?: string,
    public groups?: Group[],
    public identifier?: LinkedEntity[],
    public instanceChangedId?: string,
    public instanceId?: string,
    public metaId?: string,
    public operation?: LinkedEntity[],
    public qualifications?: string[],
    public status?: Status,
    public telephone?: string[],
    public toBeDelete?: string,
    public uid?: string,
    public version?: string,
    public versionId?: string,
  ) {}
}
