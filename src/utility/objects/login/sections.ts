import { Entity } from 'src/utility/enums/entity.enum';
import { SectionColumn } from './sectionColumn';
import { SectionItem } from './sectionItem';

export interface Sections {
  sectionName: Entity;
  columns: Array<SectionColumn>;
  items: Array<SectionItem>;
}
