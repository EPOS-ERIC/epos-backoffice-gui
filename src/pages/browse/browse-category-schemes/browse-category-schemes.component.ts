import { Component, OnInit, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { scrollBackToTop } from 'src/helpers/scroll';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { CategoryScheme } from 'generated/backofficeSchemas';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { DialogService } from 'src/components/dialogs/dialog.service';

import { Status } from 'src/utility/enums/status.enum';
import { DialogNewCategorySchemeComponent } from '../../../components/dialogs/dialog-new-category-scheme/dialog-new-category-scheme.component';

@Component({
  selector: 'app-browse-category-schemes',
  templateUrl: './browse-category-schemes.component.html',
  styleUrl: './browse-category-schemes.component.scss',
})
export class BrowseCategorySchemesComponent implements OnInit {
  @ViewChild(NgScrollbar) scrollable!: NgScrollbar;

  public categorySchemes: Array<CategoryScheme> = [];
  public statusEnum = Status;

  constructor(
    private readonly apiService: ApiService,
    private readonly loadingService: LoadingService,
    private readonly snackbarService: SnackbarService,
    private readonly dialogService: DialogService,
  ) {}

  public ngOnInit(): void {
    this.refreshList();
  }

  public refreshList(): void {
    this.loadingService.setShowSpinner(true);
    this.apiService.endpoints.CategoryScheme.getAll
      .call()
      .then((schemes) => {
        this.categorySchemes = schemes.filter(
          (scheme) => scheme.status !== Status.ARCHIVED && scheme.status !== Status.DISCARDED,
        );  
      })
      .finally(() => this.loadingService.setShowSpinner(false));
  }

  /**
   * Converts relative asset paths to absolute URLs
   */
  public getLogoUrl(logo: string | undefined): string | null {
    if (!logo) return null;
    
    // If it's already a full URL, return it
    if (logo.startsWith('http://') || logo.startsWith('https://')) {
      return logo;
    }
    
    // If it's a relative path starting with 'assets/', convert it
    if (logo.startsWith('assets/')) {
        return logo;
    }
    
    return logo;
  }

  /**
   * Handle image load errors
   */
  public handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error('Failed to load image:', img.src);
    img.style.display = 'none';
  }

  public handleAddScheme(): void {
    this.dialogService.openDialogForComponent(DialogNewCategorySchemeComponent).then((response) => {
      // Check if dataOut exists and has data
      if (response && response.dataOut && Object.keys(response.dataOut).length > 0) {
        this.loadingService.setShowSpinner(true);

        const schemePayload: CategoryScheme = {
          title: response.dataOut.title,
          description: response.dataOut.description,
          code: response.dataOut.code,
          color: response.dataOut.color,
          homepage: response.dataOut.homepage,
          logo: response.dataOut.logo,
          orderitemnumber: response.dataOut.orderitemnumber,
          topConcepts: response.dataOut.topConcepts,
          uid: response.dataOut.uid,
        };

        this.apiService.endpoints.CategoryScheme.create
          .call(schemePayload)
          .then(() => {
            this.snackbarService.openSnackbar(
              `Category scheme "${response.dataOut.title}" created successfully.`,
              'close',
              SnackbarType.SUCCESS,
              6000,
              ['snackbar', 'mat-toolbar', 'snackbar-success'],
            );
            this.refreshList();
          })
          .catch((error) => {
            console.error('Error creating category scheme:', error);
            this.snackbarService.openSnackbar(
              `Error creating category scheme "${response.dataOut.title}".`,
              'close',
              SnackbarType.ERROR,
            );
          })
          .finally(() => this.loadingService.setShowSpinner(false));
      }
    });
  }

  public handleEditScheme(scheme: CategoryScheme): void {
    this.dialogService.openDialogForComponent(DialogNewCategorySchemeComponent, scheme).then((response) => {
      if (response && response.dataOut && Object.keys(response.dataOut).length > 0) {
        this.loadingService.setShowSpinner(true);

        const schemePayload: CategoryScheme = {
          title: response.dataOut.title,
          description: response.dataOut.description,
          code: response.dataOut.code,
          color: response.dataOut.color,
          homepage: response.dataOut.homepage,
          logo: response.dataOut.logo,
          orderitemnumber: response.dataOut.orderitemnumber,
          topConcepts: response.dataOut.topConcepts,
          uid: response.dataOut.uid,
          instanceId: response.dataOut.instanceId,
          status: response.dataOut.status,
        };
        console.log(schemePayload);
        this.apiService.endpoints.CategoryScheme.update
          .call(schemePayload)
          .then(() => {
            this.snackbarService.openSnackbar(
              `Category scheme "${response.dataOut.title}" updated successfully.`,
              'close',
              SnackbarType.SUCCESS,
              6000,
              ['snackbar', 'mat-toolbar', 'snackbar-success'],
            );
            this.refreshList();
          })
          .catch((error) => {
            console.error('Error updating category scheme:', error);
            this.snackbarService.openSnackbar(
              `Error updating category scheme "${response.dataOut.title}".`,
              'close',
              SnackbarType.ERROR,
            );
          })
          .finally(() => this.loadingService.setShowSpinner(false));
      }
    });
  }

  public handleScrollToTop(): void {
    scrollBackToTop(this.scrollable);
  }
}