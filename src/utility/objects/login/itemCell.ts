import { ColumnLabel } from 'src/utility/enums/columnLabel.enum';

export interface ItemCell {
  cellColumnName: ColumnLabel;
  cellColumnNumber: number;
  value: string;
}
