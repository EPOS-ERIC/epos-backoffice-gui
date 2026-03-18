import { UserRole } from '../enums/UserRole.enum';
export interface UserBackofficeInfo {
  eduPersonUniqueId: string;
  instanceId: string;
  lastName: string;
  firstName: string;
  email: string;
  metaId: string;
  role: UserRole;
  accessibleSection: Array<string>;
  registered: boolean;
}
