import {
  DataProduct,
  Distribution,
  Operation,
  Organization,
  SoftwareApplication,
  SoftwareSourceCode,
  WebService,
} from 'generated/backofficeSchemas';

export type TableItems =
  | Array<DataProduct>
  | Array<Distribution>
  | Array<Organization>
  | Array<WebService>
  | Array<Operation>
  | Array<SoftwareApplication>
  | Array<SoftwareSourceCode>;

export type TableItem =
  | DataProduct
  | Distribution
  | Organization
  | WebService
  | Operation
  | SoftwareApplication
  | SoftwareSourceCode;
