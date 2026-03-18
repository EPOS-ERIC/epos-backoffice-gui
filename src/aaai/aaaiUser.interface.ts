import { User } from './user.interface';

/**
 * Represents a User for authentication purposes.
 */
export interface AAAIUser {
  getUsername(): string;
  getToken(): string;
  getIdentifier(): string;
  getAsApiUser(): User;
}
