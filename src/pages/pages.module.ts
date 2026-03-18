import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsModule } from './groups/groups.module';
import { BrowseModule } from './browse/browse.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GroupsModule, BrowseModule],
})
export class PagesModule {}
