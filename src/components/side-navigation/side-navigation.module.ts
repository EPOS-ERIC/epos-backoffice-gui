import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseNavigationComponent } from './browse-navigation/browse-navigation.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { EditNavigationComponent } from './edit-navigation/edit-navigation.component';
import { MatChipsModule } from '@angular/material/chips';
import { ExplorerNavigationComponent } from './explorer-navigation/explorer-navigation.component';
import { AnchorNavigationComponent } from './explorer-navigation/anchor-navigation/anchor-navigation.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { DataproductNavigationComponent } from './dataproduct-navigation/dataproduct-navigation.component';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { GroupsNavigationComponent } from './groups-navigation/groups-navigation.component';
import { SoftwareApplicationNavigationComponent } from './softwareapplication-navigation/softwareapplication-navigation.component';
import { SoftwareSourceCodeNavigationComponent } from './softwaresourcecode-navigation/softwaresourcecode-navigation.component';

@NgModule({
  declarations: [
    BrowseNavigationComponent,
    GroupsNavigationComponent,
    EditNavigationComponent,
    ExplorerNavigationComponent,
    AnchorNavigationComponent,
    BackButtonComponent,
    DataproductNavigationComponent,
    SoftwareApplicationNavigationComponent,
    SoftwareSourceCodeNavigationComponent,
  ],
  imports: [CommonModule, RouterModule, AngularMaterialModule, MatChipsModule, SkeletonLoaderComponent],
  exports: [
    BrowseNavigationComponent,
    GroupsNavigationComponent,
    EditNavigationComponent,
    ExplorerNavigationComponent,
    AnchorNavigationComponent,
    DataproductNavigationComponent,
    SoftwareApplicationNavigationComponent,
    SoftwareSourceCodeNavigationComponent,
  ],
})
export class SideNavigationModule {}
