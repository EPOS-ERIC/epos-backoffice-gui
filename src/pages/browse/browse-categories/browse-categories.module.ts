import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowseCategoriesComponent } from './browse-categories.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BrowseDataProductsModule } from '../browse-data-products/browse-data-products.module';

import { ComponentsModule } from 'src/components/components.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [BrowseCategoriesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    BrowseDataProductsModule, // For app-category-tree and OrderByPipe
    ComponentsModule,
    NgScrollbarModule,
  ],
  exports: [BrowseCategoriesComponent],
})
export class BrowseCategoriesModule {}
