import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { SideNavigationModule } from './side-navigation/side-navigation.module';
import { DialogModule } from './dialogs/dialog.module';
import { LoginComponent } from './login/login.component';
import { ActionsDataComponent } from './actions-data/actions-data.component';
import { MatChipsModule } from '@angular/material/chips';
// import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { ChartComponent } from './chart/chart.component';
import { TableComponent } from './table/table.component';
import { TableFilterComponent } from './table-filter/table-filter.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SortingDirective } from 'src/directives/sorting-cache.directive';
import { BackToTopButtonComponent } from './back-to-top-button/back-to-top-button.component';
import { ErrorNoticeComponent } from './error-notice/error-notice.component';
import { ClearDatepickerComponent } from './clear-datepicker/clear-datepicker.component';
import { ResizeColumnDirective } from 'src/directives/resize-table-column.directive';
import { CopyToClipboardComponent } from './copy-to-clipboard/copy-to-clipboard.component';
import { LazyLoadPanelComponent } from './lazy-load-panel/lazy-load-panel.component';
import { LoadingSpinnerFullPageComponent } from './loading-spinner-full-page/loading-spinner-full-page.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { SaveEntityComponent } from './save-entity/save-entity.component';
import { CategoriesEntityDetailsComponent } from './categories-entity-details/categories-entity-details.component';
import { CategoryTreeDetailsComponent } from './categoryTree/categoryTree.component';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [
    LayoutComponent,
    ActionsDataComponent,
    LoginComponent,
    ChartComponent,
    TableComponent,
    TableFilterComponent,
    SortingDirective,
    BackToTopButtonComponent,
    ErrorNoticeComponent,
    ClearDatepickerComponent,
    ResizeColumnDirective,
    CopyToClipboardComponent,
    LazyLoadPanelComponent,
    LoadingSpinnerFullPageComponent,
    SaveEntityComponent,
    CategoryTreeDetailsComponent,
    CategoriesEntityDetailsComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    AngularMaterialModule,
    SideNavigationModule,
    DialogModule,
    MatChipsModule,
    // ChartjsModule,
    MatExpansionModule,
    MatIconModule,
    SkeletonLoaderComponent,
    PipesModule,
  ],
  exports: [
    LayoutComponent,
    ActionsDataComponent,
    ChartComponent,
    TableComponent,
    ErrorNoticeComponent,
    BackToTopButtonComponent,
    ClearDatepickerComponent,
    ResizeColumnDirective,
    CopyToClipboardComponent,
    LazyLoadPanelComponent,
    LoadingSpinnerFullPageComponent,
    SaveEntityComponent,
    CategoryTreeDetailsComponent,
    CategoriesEntityDetailsComponent,
  ],
})
export class ComponentsModule {}
