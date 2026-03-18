import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/services/navigation.service';

@Component({
  selector: 'app-softwareapplication-navigation',
  templateUrl: './softwareapplication-navigation.component.html',
  styleUrl: './softwareapplication-navigation.component.scss',
})
export class SoftwareApplicationNavigationComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  public menuListItems = [
    {
      id: 'generalinformation',
      name: 'General Information',
    },
    {
      id: 'persistentidentifier',
      name: 'Persistent Identifier',
    },
    {
      id: 'contactpoint',
      name: 'Contact Point',
    },
    {
      id: 'categories',
      name: 'Categories',
    },
  ];
  public activeListItem: string = '';

  private initSubscriptions(): void {
    // CHNAGE TO SOFTWARE; NOT DATA PRODUCT
    this.navigationService.softwareApplicationActiveItemObs.subscribe((id: string) => {
      this.activeListItem = id;
    });
  }

  public ngOnInit(): void {
    this.initSubscriptions();
  }

  public handleClick(id: string): void {
    this.navigationService.setSoftwareApplicationActiveItem(id);
    const active = this.menuListItems.find((item) => item.id === id);
    if (active) {
      this.navigationService.setSoftwareApplicationActiveItemTitle(active.name);
    }
  }
}
