import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ContactPoint } from 'generated/backofficeSchemas';
import { ContactPointRole } from 'src/utility/enums/contactPointRole.enum';

@Component({
  selector: 'app-contact-point-detail-sourceCode',
  templateUrl: './contact-point-detail-sourceCode.component.html',
  styleUrls: ['./contact-point-detail-sourceCode.component.scss'],
})
export class ContactPointDetailSourceCodeComponent implements OnInit, OnChanges {
  @Input() contactPointDetails!: Promise<ContactPoint[]>[];

  @Input() set addedContactPointDetail(contactPoint: ContactPoint | undefined) {
    if (!contactPoint) {
      return;
    }

    const exists = this.mergedDetails.some((item: ContactPoint) => item.instanceId === contactPoint.instanceId);
    if (!exists) {
      this.mergedDetails.push(contactPoint);
    }
  }

  @Input() disabled = false;

  @Output() removeContactPoint = new EventEmitter<ContactPoint>();

  public loading: boolean = true;

  public contactPointRoleOptions: Array<{ id: string; name: string }> = [];

  public mergedDetails: ContactPoint[] = [];

  public ngOnInit(): void {
    this.contactPointRoleOptions = Object.entries(ContactPointRole).map((e) => ({ name: e[1], id: e[0] }));
    this.loadContactPointDetails();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['contactPointDetails'] && !changes['contactPointDetails'].firstChange) {
      this.loadContactPointDetails();
    }
  }

  private loadContactPointDetails(): void {
    if (!this.contactPointDetails || this.contactPointDetails.length === 0) {
      this.mergedDetails = [];
      this.loading = false;
      return;
    }

    this.loading = true;
    Promise.all(this.contactPointDetails).then((contactPoints: ContactPoint[][]) => {
      const flattened = contactPoints.flat();
      this.mergedDetails = [...flattened];
      this.loading = false;
    });
  }

  public getRoleName(role: string | undefined) {
    if (role !== undefined) {
      const roleFiltered = this.contactPointRoleOptions.filter((e) => e.id === role);
      if (roleFiltered.length > 0) {
        return roleFiltered[0].name;
      }
    }
    return 'None';
  }

  public handleRemove(contactPoint: ContactPoint | undefined) {
    if (!contactPoint?.instanceId) {
      return;
    }

    this.mergedDetails = this.mergedDetails.filter((obj) => obj.instanceId !== contactPoint.instanceId);
    this.removeContactPoint.emit(contactPoint);
  }

  public removeArrayDuplicates(arr: Array<string> | undefined): Array<string> {
    if (!arr) {
      return [];
    }
    return arr.filter((item, index) => arr.indexOf(item) === index);
  }
}
