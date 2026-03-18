import { Identifiable } from './identifiable.interface';

export interface User extends Identifiable {
  getToken(): string;
}
