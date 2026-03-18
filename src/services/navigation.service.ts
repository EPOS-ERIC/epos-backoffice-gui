import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EntityFieldValue } from 'src/utility/enums/entityFieldValue.enum';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor() {}

  private dataProductActiveItem: BehaviorSubject<string> = new BehaviorSubject(
    EntityFieldValue.GENERAL_INFORMATION.valueOf(),
  );
  private softwareApplicationActiveItem: BehaviorSubject<string> = new BehaviorSubject(
    EntityFieldValue.GENERAL_INFORMATION.valueOf(),
  );
  private softwareSourceCodeActiveItem: BehaviorSubject<string> = new BehaviorSubject(
    EntityFieldValue.GENERAL_INFORMATION.valueOf(),
  );
  public dataProductActiveItemObs = this.dataProductActiveItem.asObservable();
  public softwareApplicationActiveItemObs = this.softwareApplicationActiveItem.asObservable();
  public softwareSourceCodeActiveItemObs = this.softwareSourceCodeActiveItem.asObservable();

  private dataProductActiveItemTitle: BehaviorSubject<string> = new BehaviorSubject('General Information');
  private softwareApplicationActiveItemTitle: BehaviorSubject<string> = new BehaviorSubject('General Information');
  private softwareSourceCodeActiveItemTitle: BehaviorSubject<string> = new BehaviorSubject('General Information');

  public dataProductActiveItemTitleObs = this.dataProductActiveItemTitle.asObservable();
  public softwareApplicationActiveItemTitleObs = this.softwareApplicationActiveItemTitle.asObservable();
  public softwareSourceCodeActiveItemTitleObs = this.softwareSourceCodeActiveItemTitle.asObservable();

  public setDataProductActiveItem(id: string): void {
    this.dataProductActiveItem.next(id);
  }
  public setSoftwareApplicationActiveItem(id: string): void {
    this.softwareApplicationActiveItem.next(id);
  }
  public setSoftwareSourceCodeActiveItem(id: string): void {
    this.softwareSourceCodeActiveItem.next(id);
  }

  public setDataProductActiveItemTitle(title: string): void {
    this.dataProductActiveItemTitle.next(title);
  }
  public setSoftwareApplicationActiveItemTitle(title: string): void {
    this.softwareApplicationActiveItemTitle.next(title);
  }
  public setSoftwareSourceCodeActiveItemTitle(title: string): void {
    this.softwareSourceCodeActiveItemTitle.next(title);
  }
}
