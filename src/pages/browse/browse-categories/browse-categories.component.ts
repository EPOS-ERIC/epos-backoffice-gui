import { Component, OnInit, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { scrollBackToTop } from 'src/helpers/scroll';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { Category, CategoryScheme } from 'generated/backofficeSchemas';
import { LoadingService } from 'src/services/loading.service';
import { SnackbarService, SnackbarType } from 'src/services/snackbar.service';
import { DialogService } from 'src/components/dialogs/dialog.service';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';
import { Status } from 'src/utility/enums/status.enum';
import { DialogNewCategoryComponent } from '../../../components/dialogs/dialog-new-category/dialog-new-category.component';

@Component({
  selector: 'app-browse-categories',
  templateUrl: './browse-categories.component.html',
  styleUrls: ['./browse-categories.component.scss'],
})
export class BrowseCategoriesComponent implements OnInit {
  @ViewChild(NgScrollbar) scrollable!: NgScrollbar;

  public categories: Array<Category> = [];
  public filteredCategories: Array<Category> = [];
  public categorySchemes: Array<CategoryScheme> = [];
  public uniqueSchemes: Array<{ title: string }> = [];
  public selectedSchemeFilter: string | null = null;
  public selectedCategorySchemeObj: CategoryScheme | undefined;
  public defaultCategoryScheme: CategoryScheme | undefined;
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
    
    // Fetch both categories and category schemes
    Promise.all([
      this.apiService.endpoints.Category.getAll.call(),
      this.apiService.endpoints.CategoryScheme.getAll.call(),
    ])
      .then(([categories, schemes]) => {
        this.categories = categories.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        this.categorySchemes = schemes;
        // Set a default scheme for the tree component (first scheme or undefined)
        this.defaultCategoryScheme = schemes.length > 0 ? schemes[0] : undefined;
        // Create unique schemes by title
        const uniqueTitles = new Set<string>();
        this.uniqueSchemes = schemes
          .filter((scheme) => {
            if (scheme.title && !uniqueTitles.has(scheme.title)) {
              uniqueTitles.add(scheme.title);
              return true;
            }
            return false;
          })
          .map((scheme) => ({ title: scheme.title! }))
          .sort((a, b) => a.title.localeCompare(b.title));
        this.applyFilter();
      })
      .finally(() => this.loadingService.setShowSpinner(false));
  }

  public onSchemeFilterChange(): void {
    if (this.selectedSchemeFilter) {
      // Find the first matching scheme object for the tree component
      this.selectedCategorySchemeObj = this.categorySchemes.find(
        (scheme) => scheme.title === this.selectedSchemeFilter
      );
    } else {
      this.selectedCategorySchemeObj = undefined;
    }
    this.applyFilter();
  }

  private applyFilter(): void {
    if (!this.selectedSchemeFilter) {
      this.filteredCategories = [...this.categories];
    } else {
      // Filter by scheme title instead of UID to catch all schemes with same title
      const matchingSchemeUids = this.categorySchemes
        .filter(scheme => scheme.title === this.selectedSchemeFilter)
        .map(scheme => scheme.uid);
      
      this.filteredCategories = this.categories.filter(
        (category) => matchingSchemeUids.includes(category.inScheme?.uid)
      );
    }
  }

  public getCategorySchemeTitle(category: Category): string | undefined {
    const scheme = this.categorySchemes.find(
      (scheme) => scheme.uid === category.inScheme?.uid
    );
    return scheme?.title;
  }

  public getParentCategoryTitle(category: Category): string | undefined {
    if (!category.broader || category.broader.length === 0) {
      return undefined;
    }
    const parentCategory = this.categories.find(
      (cat) => cat.uid === category.broader![0].uid
    );
    return parentCategory?.name;
  }

  public handleAddCategory(): void {
    this.dialogService.openDialogForComponent(DialogNewCategoryComponent).then((response) => {
      if (response && response.dataOut) {
        this.loadingService.setShowSpinner(true);
        this.apiService.endpoints.Category.create
          .call(response.dataOut)
          .then(() => {
            this.snackbarService.openSnackbar(
              `Category "${response.dataOut.name}" created successfully.`,
              'close',
              SnackbarType.SUCCESS,
              6000,
              ['snackbar', 'mat-toolbar', 'snackbar-success'],
            );
            this.refreshList();
          })
          .catch(() => {
            this.snackbarService.openSnackbar(`Error creating category "${response.dataOut.name}".`, 'close', SnackbarType.ERROR);
          })
          .finally(() => this.loadingService.setShowSpinner(false));
      }
    });
  }

  public handleDeleteCategory(category: Category): void {
    this.dialogService
      .openConfirmationDialog(`Are you sure you want to delete the category "${category.name}"?`, true)
      .then((confirmed) => {
        if (confirmed) {
          this.loadingService.setShowSpinner(true);
          this.apiService
            .deleteEntity(EntityEndpointValue.CATEGORY, category.instanceId!)
            .then(() => {
              this.snackbarService.openSnackbar(
                `Category "${category.name}" deleted successfully.`,
                'close',
                SnackbarType.SUCCESS,
                6000,
                ['snackbar', 'mat-toolbar', 'snackbar-success'],
              );
              this.refreshList();
            })
            .catch(() => {
              this.snackbarService.openSnackbar(`Error deleting category "${category.name}".`, 'close', SnackbarType.ERROR);
            })
            .finally(() => this.loadingService.setShowSpinner(false));
        }
      });
  }

  public handleScrollToTop(): void {
    scrollBackToTop(this.scrollable);
  }
}
