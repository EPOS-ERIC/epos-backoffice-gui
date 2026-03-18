import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsRoutingModule } from './groups-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NewGroupComponent } from './new-group/new-group.component';
import { ViewGroupsComponent } from './request-to-join/request-to-join.component';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { ComponentsModule } from 'src/components/components.module';
import { SkeletonLoaderComponent } from 'src/components/skeleton-loader/skeleton-loader.component';

@NgModule({
  declarations: [GroupsHomeComponent, NewGroupComponent, ViewGroupsComponent],
  imports: [CommonModule, GroupsRoutingModule, AngularMaterialModule, ComponentsModule, SkeletonLoaderComponent],
  providers: [],
})
export class GroupsModule {}
