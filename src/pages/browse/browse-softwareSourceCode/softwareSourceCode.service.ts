import { Injectable } from '@angular/core';
import { SoftwareSourceCode } from 'generated/backofficeSchemas';
import { EntityExecutionService } from 'src/services/calls/entity-execution.service';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';

@Injectable({
  providedIn: 'root',
})
export class SoftwareSourceCodeService {
  constructor(private entityExecutionService: EntityExecutionService, private persistorService: PersistorService) {}

  /**
   * Updates the active Software Source Code with changes to a subsection, such as temporal coverage, identifier etc.
   *
   * @param updatingObject Object which holds new, updated values
   * @param record The specific child of Software Source Code to be updated, e.g. { identifier: identifierArr }
   */
  public updateSoftwareSourceCodeRecord(updatingObject: SoftwareSourceCode, record: Record<string, unknown>): void {
    updatingObject = {
      ...updatingObject,
      ...record,
    };
    this.entityExecutionService.setActiveSoftwareSourceCode(updatingObject);
    this.persistorService.setValueInStorage(
      StorageType.LOCAL_STORAGE,
      StorageKey.FORM_DATA,
      JSON.stringify(updatingObject),
    );
  }
}
