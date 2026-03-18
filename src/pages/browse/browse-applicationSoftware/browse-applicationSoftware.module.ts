import { CommonModule, NgFor } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentsModule } from 'src/components/components.module';
import { SideNavigationModule } from 'src/components/side-navigation/side-navigation.module';
import { FormatRangePipe } from 'src/pipes/formatRange.pipe';
import { BrowseDataProductsModule } from '../browse-data-products/browse-data-products.module';

import { ContactPointAppSoftComponent } from './browse-applicationSoftware-item/contact-point-appSoft/contact-point-appSoft.component';
import { ContactPointSearchAppSoftComponent } from './browse-applicationSoftware-item/contact-point-appSoft/contact-point-search/contact-point-search-appSoft.component';
import { ContactPointDetailAppSoftComponent } from './browse-applicationSoftware-item/contact-point-appSoft/contact-point-detail/contact-point-detail-appSoft.component';
import { GeneralInformationAppSoftComponent } from './browse-applicationSoftware-item/general-information/general-information.component';
import { PersistentIdentifierSoftAppComponent } from './browse-applicationSoftware-item/persistent-identifier/persistent-identifier.component';
import { PipesModule } from 'src/pipes/pipes.module';

@NgModule({
  declarations: [
    GeneralInformationAppSoftComponent,
    PersistentIdentifierSoftAppComponent,
    ContactPointAppSoftComponent,
    ContactPointSearchAppSoftComponent,
    ContactPointDetailAppSoftComponent,
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
  exports: [ContactPointAppSoftComponent, GeneralInformationAppSoftComponent, PersistentIdentifierSoftAppComponent],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    FormatRangePipe,
  ],
})
export class BrowseApplicationSoftwareModule {}
