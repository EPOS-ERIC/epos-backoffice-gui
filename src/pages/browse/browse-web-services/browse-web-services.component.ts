import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/utility/enums/entity.enum';
import { EntityEndpointValue } from 'src/utility/enums/entityEndpointValue.enum';

@Component({
  selector: 'app-browse-web-services',
  templateUrl: './browse-web-services.component.html',
  styleUrls: ['./browse-web-services.component.scss'],
})
export class BrowseWebServicesComponent {
  constructor(private router: Router) {}

  public sectionName = Entity.WEBSERVICE;

  public rowClicked(row: Record<string, string>): void {
    this.router.navigate([`/browse/${EntityEndpointValue.WEBSERVICE}/details`].concat(row['instanceId']));
  }

  public createWebService(): void {
    this.router.navigate(['browse/webservice/new']);
  }
}
