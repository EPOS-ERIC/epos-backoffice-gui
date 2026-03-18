import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentsModule } from 'src/components/components.module';
import { SideNavigationModule } from 'src/components/side-navigation/side-navigation.module';
import { FormatRangePipe } from 'src/pipes/formatRange.pipe';
import { BrowseDataProductsModule } from '../browse-data-products/browse-data-products.module';

import { ContactPointSourceCodeComponent } from './browse-softwareSourceCode-item/contact-point-sourceCode/contact-point-sourceCode.component';
import { ContactPointSearchSourceCodeComponent } from './browse-softwareSourceCode-item/contact-point-sourceCode/contact-point-search/contact-point-search-sourceCode.component';
import { ContactPointDetailSourceCodeComponent } from './browse-softwareSourceCode-item/contact-point-sourceCode/contact-point-detail/contact-point-detail-sourceCode.component';
import { GeneralInformationSourceCodeComponent } from './browse-softwareSourceCode-item/general-information/general-information.component';
import { PersistentIdentifierSourceCodeComponent } from './browse-softwareSourceCode-item/persistent-identifier/persistent-identifier.component';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [
    GeneralInformationSourceCodeComponent,
    PersistentIdentifierSourceCodeComponent,
    ContactPointSourceCodeComponent,
    ContactPointSearchSourceCodeComponent,
    ContactPointDetailSourceCodeComponent,
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    ComponentsModule,
    NgFor,
    SideNavigationModule,
    BrowseDataProductsModule,
    PipesModule,
  ],
  exports: [
    ContactPointSourceCodeComponent,
    GeneralInformationSourceCodeComponent,
    PersistentIdentifierSourceCodeComponent,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    FormatRangePipe,
  ],
})
export class BrowseSoftwareSourceCodeModule {}
