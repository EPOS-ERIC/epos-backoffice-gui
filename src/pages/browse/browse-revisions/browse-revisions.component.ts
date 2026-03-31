import { Component, OnInit } from '@angular/core';
import { PersistorService, StorageType } from 'src/services/persistor.service';
import { StorageKey } from 'src/utility/enums/storageKey.enum';
import { create as createDiffPatcher } from 'jsondiffpatch';

import { ActivatedRoute, Router } from '@angular/router';
import { HelpersService } from 'src/services/helpers.service';
import { DataProduct, SoftwareApplication } from 'generated/backofficeSchemas';
import { ApiService } from 'src/apiAndObjects/api/api.service';

/** Map of raw JSON keys → human-readable labels */
const FIELD_LABELS: Record<string, string> = {
  accessRight: 'Access Right',
  accrualPeriodicity: 'Update Frequency',
  category: 'Categories',
  categories: 'Categories',
  changeComment: 'Change Comment',
  changeTimestamp: 'Change Timestamp',
  contactPoint: 'Contact Points',
  created: 'Created',
  description: 'Description',
  distribution: 'Distributions',
  documentation: 'Documentation',
  editorId: 'Editor',
  fileProvenance: 'File Provenance',
  groups: 'Groups',
  hasPart: 'Has Part',
  identifier: 'Identifiers',
  instanceChangedId: 'Instance Changed Id',
  instanceId: 'Instance Id',
  isPartOf: 'Is Part Of',
  issued: 'Issued',
  keywords: 'Keywords',
  metaId: 'Meta Id',
  modified: 'Modified',
  operation: 'Operation',
  provenance: 'Provenance',
  publisher: 'Publishers',
  qualityAssurance: 'Quality Assurance',
  relation: 'Relations',
  spatialExtent: 'Spatial Coverage',
  status: 'Status',
  temporalExtent: 'Temporal Coverage',
  title: 'Title',
  toBeDelete: 'To Be Deleted',
  type: 'Type',
  uid: 'UID',
  version: 'Version',
  versionId: 'Version Id',
  versionInfo: 'Version Info',
  hasQualityAnnotation: 'Quality Annotation',
  // SoftwareApplication / SoftwareSourceCode fields
  author: 'Authors',
  citation: 'Citations',
  contributor: 'Contributors',
  creator: 'Creators',
  downloadURL: 'Download URL',
  fileSize: 'File Size',
  funder: 'Funders',
  inputParameter: 'Input Parameters',
  installURL: 'Install URL',
  licenseURL: 'License URL',
  mainEntityOfPage: 'Main Entity Of Page',
  maintainer: 'Maintainers',
  memoryRequirements: 'Memory Requirements',
  name: 'Name',
  operatingSystem: 'Operating Systems',
  outputParameter: 'Output Parameters',
  parameter: 'Parameters',
  processorRequirements: 'Processor Requirements',
  provider: 'Providers',
  relatedOperation: 'Related Operations',
  requirements: 'Requirements',
  softwareStatus: 'Software Status',
  softwareVersion: 'Software Version',
  spatial: 'Spatial',
  storageRequirements: 'Storage Requirements',
  temporal: 'Temporal',
  timeRequired: 'Time Required',
  // LinkedEntity sub-fields
  entityType: 'Entity Type',
  linkedEntity: 'Linked Entity',
  qualifiedAttribution: 'Qualified Attribution',
  landingPage: 'Landing Page',
  referencedBy: 'Referenced By',
  source: 'Source',
  variableMeasured: 'Variable Measured',
};

const SECTION_CONFIG: Array<{ label: string; fields: string[] }> = [
  {
    label: 'General Information',
    fields: [
      'title',
      'description',
      'keywords',
      'versionInfo',
      'accrualPeriodicity',
      'type',
      'issued',
      'created',
      'modified',
      'qualityAssurance',
      'status',
      'instanceId',
      'metaId',
      'uid',
      'version',
      'versionId',
      'changeComment',
      'changeTimestamp',
      'operation',
      'editorId',
      'documentation',
      'hasQualityAnnotation',
      'name',
      'softwareStatus',
      'softwareVersion',
      'fileSize',
      'operatingSystem',
      'memoryRequirements',
      'processorRequirements',
      'storageRequirements',
      'timeRequired',
    ],
  },
  {
    label: 'Spatial Coverage',
    fields: ['spatialExtent', 'spatial'],
  },
  {
    label: 'Temporal Coverage',
    fields: ['temporalExtent', 'temporal'],
  },
  {
    label: 'Persistent Identifier',
    fields: ['identifier'],
  },
  {
    label: 'Contact Points',
    fields: ['contactPoint'],
  },
  {
    label: 'Data Providers',
    fields: ['publisher', 'provider', 'contributor', 'creator', 'funder', 'author', 'maintainer'],
  },
  {
    label: 'Categories',
    fields: ['category', 'categories'],
  },
  {
    label: 'Distributions',
    fields: ['distribution', 'downloadURL', 'installURL', 'licenseURL'],
  },
  {
    label: 'Parameters',
    fields: ['inputParameter', 'outputParameter', 'parameter'],
  },
];

const API_BASE = '/api'; // Standard relative API base

export interface TypeOfField {
  label: string;
  status: 'added' | 'deleted' | 'modified' | 'unchanged';
  oldValue: any;
  newValue: any;
  oldHtml?: string;
  newHtml?: string;
  fieldType?: 'distribution' | 'webservice' | 'documentation' | 'generic';
}

export interface DiffSection {
  label: string;
  hasDifferences: boolean;
  type: 'friendly';
  typeOfFields?: TypeOfField[];
}

@Component({
  selector: 'app-browse-revisions',
  templateUrl: './browse-revisions.component.html',
  styleUrls: ['./browse-revisions.component.scss'],
})
export class BrowseRevisionsComponent implements OnInit {
  constructor(
    private helpersService: HelpersService,
    private persistorService: PersistorService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
  ) { }

  public readonly API_BASE = API_BASE;

  public revisions: Array<DataProduct> | Array<SoftwareApplication> = [];
  public entities: Array<DataProduct | undefined> | Array<SoftwareApplication | undefined> = [];
  public visualDiff: DiffSection[] = [];
  public loading = false;
  public error = false;
  public referrerId = '';
  public noDifferences = false;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  private diffPatcher = createDiffPatcher({
    objectHash: (obj: any) => obj.instanceId || obj.uid || obj.metaId || JSON.stringify(obj),
    arrays: {
      detectMove: true,
      includeValueOnMove: false,
    },
  });

  private _getCachedRevisions(): string | null {
    return this.persistorService.getValueFromStorage(StorageType.LOCAL_STORAGE, StorageKey.REVISIONS);
  }

  private _mapResponse(revisions: DataProduct[] | SoftwareApplication[]): void {
    const mapped = revisions.map((revision) =>
      Object.fromEntries(Object.entries(revision).filter(([key]) => key !== '_sourceObject')),
    );
    this.revisions = mapped;
  }



  /** Convert camelCase to Title Case as a fallback */
  private camelCaseToTitle(str: string): string {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }

  private getVisualDiff(): DiffSection[] {
    const sections: DiffSection[] = [];
    const processedKeys = new Set<string>();
    let hasDifferences = false;

    // Ensure we diff Old -> New so added things look green, not red.
    let oldRev: any = this.revisions[0];
    let newRev: any = this.revisions[1];

    // Safety check timestamps explicitly
    const t0 = new Date(oldRev.changeTimestamp || 0).getTime();
    const t1 = new Date(newRev.changeTimestamp || 0).getTime();
    if (t0 > t1) {
      // revisions[0] is newer, swap them
      oldRev = this.revisions[1];
      newRev = this.revisions[0];
    }

    SECTION_CONFIG.forEach((section) => {
      const leftSub: Record<string, any> = {};
      const rightSub: Record<string, any> = {};
      let hasFields = false;

      section.fields.forEach((field) => {
        if (field in oldRev || field in newRev) {
          leftSub[field] = oldRev[field];
          rightSub[field] = newRev[field];
          processedKeys.add(field);
          hasFields = true;
        }
      });

      if (!hasFields) {
        return; // Skip sections with no matching fields in either revision
      }

      const delta = this.diffPatcher.diff(leftSub, rightSub);

      if (delta) {
        hasDifferences = true;
        const typeOfFields = this.getTypeOfFields(leftSub, rightSub, delta, section.fields);
        this.enrichFieldsWithWordDiff(typeOfFields);
        sections.push({
          label: section.label,
          hasDifferences: true,
          type: 'friendly',
          typeOfFields,
        });
      } else {
        // Section has no changes
        sections.push({
          label: section.label,
          hasDifferences: false,
          type: 'friendly',
          typeOfFields: this.getTypeOfFields(leftSub, rightSub, null, section.fields),
        });
      }
    });

    // Handle leftover fields not in any section
    const leftOther: Record<string, any> = {};
    const rightOther: Record<string, any> = {};
    let hasOtherFields = false;
    const otherFields: string[] = [];

    Object.keys(oldRev).forEach((key) => {
      if (!processedKeys.has(key)) {
        leftOther[key] = oldRev[key];
        rightOther[key] = newRev[key];
        hasOtherFields = true;
        if (!otherFields.includes(key)) otherFields.push(key);
      }
    });
    Object.keys(newRev).forEach((key) => {
      if (!processedKeys.has(key)) {
        leftOther[key] = oldRev[key];
        rightOther[key] = newRev[key];
        hasOtherFields = true;
        if (!otherFields.includes(key)) otherFields.push(key);
      }
    });

    if (hasOtherFields) {
      const delta = this.diffPatcher.diff(leftOther, rightOther);
      if (delta) {
        hasDifferences = true;
        const typeOfFields = this.getTypeOfFields(leftOther, rightOther, delta, otherFields);
        this.enrichFieldsWithWordDiff(typeOfFields);
        sections.push({
          label: 'Other Information',
          hasDifferences: true,
          type: 'friendly',
          typeOfFields,
        });
      }
    }

    this.noDifferences = !hasDifferences;
    return sections;
  }

  private getTypeOfFields(leftSub: Record<string, any>, rightSub: Record<string, any>, delta: any, fields: string[]): TypeOfField[] {
    const friendlyFields: TypeOfField[] = [];
    fields.forEach((field) => {
      if (!(field in leftSub) && !(field in rightSub)) {
        return;
      }

      const oldVal = leftSub[field];
      const newVal = rightSub[field];
      const hasChanged = delta && (field in delta);

      let status: 'added' | 'deleted' | 'modified' | 'unchanged' = 'unchanged';
      if (hasChanged) {
        if (oldVal === undefined || oldVal === null || oldVal === '') status = 'added';
        else if (newVal === undefined || newVal === null || newVal === '') status = 'deleted';
        else status = 'modified';
      }

      let fieldType: 'distribution' | 'webservice' | 'documentation' | 'generic' = 'generic';
      if (field === 'distribution') fieldType = 'distribution';
      else if (field === 'accessService') fieldType = 'webservice';
      else if (field === 'documentation') fieldType = 'documentation';

      friendlyFields.push({
        label: FIELD_LABELS[field] || this.camelCaseToTitle(field),
        status,
        oldValue: oldVal,
        newValue: newVal,
        fieldType,
      });
    });
    return friendlyFields;
  }

  public formatFriendlyValue(v: unknown): string {
    if (v == null || v === '') return '-';
    if (Array.isArray(v)) {
      if (v.length === 0) return '-';
      return v.map((item) => this.formatSingleValue(item)).join('\n\n');
    }
    return this.formatSingleValue(v);
  }

  /**
   * Formats a single value (non-array) into a human-readable string.
   * Extracts meaningful properties from known object shapes.
   */
  private formatSingleValue(v: unknown): string {
    if (v == null || v === '') return '-';
    if (typeof v !== 'object') return String(v);

    const obj = v as Record<string, any>;

    // 1. Spatial extent: show location / coordinates
    if ('location' in obj || 'coordinates' in obj) {
      const parts: string[] = [];
      if (obj['location']) parts.push(`Location: ${obj['location']}`);
      if (obj['coordinates']) {
        const c = obj['coordinates'];
        if (c['minLat'] != null) {
          parts.push(`Lat: [${c['minLat']}, ${c['maxLat']}], Lon: [${c['minLon']}, ${c['maxLon']}]`);
        } else {
          parts.push(`Coordinates: ${JSON.stringify(c)}`);
        }
      }
      return parts.length > 0 ? parts.join(' — ') : JSON.stringify(obj);
    }

    // 2. Temporal extent: show start / end dates
    if ('startDate' in obj || 'endDate' in obj) {
      const start = obj['startDate'] || '-';
      const end = obj['endDate'] || 'ongoing';
      return `${start} → ${end}`;
    }

    // 3. Identifiers: show type + identifier string
    if ('type' in obj && 'identifier' in obj && typeof obj['identifier'] === 'string') {
      return `${obj['type']}: ${obj['identifier']}`;
    }

    // 4. Contact Point / Linked Entity Wrapper
    if ('linkedEntity' in obj && obj['linkedEntity']) {
      const le = obj['linkedEntity'];
      const role = obj['role'] || obj['qualifiedAttribution'] || '';
      // Try to get a name from the wrapped entity
      const name =
        (Array.isArray(le['legalName']) ? le['legalName'][0] : le['legalName']) ||
        le['name'] ||
        le['uid'] ||
        JSON.stringify(le);
      return role ? `${role} — ${name}` : String(name);
    }

    // 5. Hydrated Entities (Organization / Person / ContactPoint)
    const detailedParts: string[] = [];
    let displayName = '';

    // Organization details
    if ('legalName' in obj || 'acronym' in obj) {
      const ln = Array.isArray(obj['legalName']) ? obj['legalName'][0] : obj['legalName'];
      if (ln && typeof ln === 'string') displayName = ln;
      if (obj['acronym'] && typeof obj['acronym'] === 'string') {
        displayName += displayName ? ` (${obj['acronym']})` : obj['acronym'];
      }
    }

    // Person details (if not already handled by organization)
    if (!displayName && ('givenName' in obj || 'familyName' in obj)) {
      const p = [];
      if (obj['givenName'] && typeof obj['givenName'] === 'string') p.push(obj['givenName']);
      if (obj['familyName'] && typeof obj['familyName'] === 'string') p.push(obj['familyName']);
      if (p.length > 0) displayName = p.join(' ');
    }

    // The following entities are now handled by templates in the HTML file
    if (obj['entityType'] === 'DISTRIBUTION' || obj['entityType'] === 'WEBSERVICE' || obj['entityType'] === 'DOCUMENTATION' || (obj['uri'] && obj['title'])) {
      return ''; // Placeholder, template will use its own logic
    }

    if (displayName) detailedParts.push(displayName);

    // Add extra metadata (emails, role) if for a contact/provider
    const roleValue = obj['role'] || obj['qualifiedAttribution'];
    if (roleValue && typeof roleValue === 'string') {
      detailedParts.push(`Role: ${this.camelCaseToTitle(roleValue)}`);
    }
    const emailStr = Array.isArray(obj['email']) ? obj['email'].join(', ') : obj['email'];
    if (emailStr && typeof emailStr === 'string') {
      detailedParts.push(`Email: ${emailStr}`);
    }

    if (detailedParts.length > 0) return detailedParts.join(' — ');

    // 6. Last fallback: UID or Name as string
    if ('name' in obj && typeof obj['name'] === 'string') return obj['name'];
    return JSON.stringify(obj);
  }

  public isMultiline(v: unknown): boolean {
    return Array.isArray(v) && v.length > 1;
  }

  /**
   * Word-level diff: computes LCS-based diff between two strings,
   * returning HTML with highlighted changed/unchanged words.
   */
  private computeWordDiff(oldStr: string, newStr: string): { oldHtml: string; newHtml: string } {
    const oldWords = oldStr.split(/(\s+)/);
    const newWords = newStr.split(/(\s+)/);

    // LCS table
    const m = oldWords.length;
    const n = newWords.length;
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (oldWords[i - 1] === newWords[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1;
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
      }
    }

    // Backtrack to get diff sequences
    const oldParts: { text: string; type: 'same' | 'removed' }[] = [];
    const newParts: { text: string; type: 'same' | 'added' }[] = [];
    let i = m, j = n;
    const oldStack: typeof oldParts = [];
    const newStack: typeof newParts = [];
    while (i > 0 && j > 0) {
      if (oldWords[i - 1] === newWords[j - 1]) {
        oldStack.push({ text: oldWords[i - 1], type: 'same' });
        newStack.push({ text: newWords[j - 1], type: 'same' });
        i--; j--;
      } else if (dp[i - 1][j] >= dp[i][j - 1]) {
        oldStack.push({ text: oldWords[i - 1], type: 'removed' });
        i--;
      } else {
        newStack.push({ text: newWords[j - 1], type: 'added' });
        j--;
      }
    }
    while (i > 0) { oldStack.push({ text: oldWords[i - 1], type: 'removed' }); i--; }
    while (j > 0) { newStack.push({ text: newWords[j - 1], type: 'added' }); j--; }

    oldStack.reverse().forEach(p => oldParts.push(p));
    newStack.reverse().forEach(p => newParts.push(p));

    const escHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const oldHtml = oldParts.map(p =>
      p.type === 'removed'
        ? `<span class="word-removed">${escHtml(p.text)}</span>`
        : escHtml(p.text)
    ).join('');

    const newHtml = newParts.map(p =>
      p.type === 'added'
        ? `<span class="word-added">${escHtml(p.text)}</span>`
        : escHtml(p.text)
    ).join('');

    return { oldHtml, newHtml };
  }

  /**
   * Returns word-diffed HTML for a specific property. Used in the template.
   */
  public getDiff(v1: any, v2: any, side: 'old' | 'new'): string {
    const s1 = this.formatFriendlyValue(v1);
    const s2 = this.formatFriendlyValue(v2);
    if (s1 === s2) return s1;
    const { oldHtml, newHtml } = this.computeWordDiff(s1, s2);
    return side === 'old' ? oldHtml : newHtml;
  }

  /** Finds a matching item in another array based on IDs */
  public findMatch(item: any, list: any[]): any {
    if (!item || !list || !Array.isArray(list)) return null;
    const items = Array.isArray(list) ? list : [list];
    return items.find(it => it && (it.instanceId === item.instanceId || it.uid === item.uid || it.metaId === item.metaId));
  }

  /** Helper for template loops */
  public toArray(val: any): any[] {
    if (val == null) return [];
    return Array.isArray(val) ? val : [val];
  }

  /**
   * Pre-compute word-diff HTML for generic modified fields.
   */
  private enrichFieldsWithWordDiff(fields: TypeOfField[]): void {
    fields.forEach(field => {
      if (field.status === 'modified' && field.fieldType === 'generic') {
        const { oldHtml, newHtml } = this.computeWordDiff(
          this.formatFriendlyValue(field.oldValue),
          this.formatFriendlyValue(field.newValue)
        );
        field.oldHtml = oldHtml;
        field.newHtml = newHtml;
      }
    });
  }

  public goBack(): void {
    window.history.back();
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((obs) => {
      if (null != obs.get('id')) {
        this.referrerId = obs.get('id') as string;
      }
    });

    this.helpersService.revisionsObs.subscribe((revisions: Array<DataProduct> | Array<SoftwareApplication>) => {
      if (revisions && revisions.length > 0) {
        // We received new revisions from the dialog
        this.loading = true;
        this.revisions = revisions;
        this.persistorService.setValueInStorage(
          StorageType.LOCAL_STORAGE,
          StorageKey.REVISIONS,
          JSON.stringify(revisions),
        );
        this._mapResponse(this.revisions);
        this.fetchRelatedEntities().then(() => {
          this.visualDiff = this.getVisualDiff();
          this.loading = false;
        });
      } else {
        // We probably refreshed the page, so revisionsObs emitted []
        // Let's try to restore from cache
        const cached = this._getCachedRevisions();
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              this.loading = true;
              this.revisions = parsed;
              this._mapResponse(this.revisions);
              this.fetchRelatedEntities().then(() => {
                this.visualDiff = this.getVisualDiff();
                this.loading = false;
              });
            }
          } catch (e) {
            console.error('Failed to parse cached revisions', e);
          }
        }
      }
    });
  }

  private async fetchRelatedEntities(): Promise<void> {
    const promises: Promise<void>[] = [];
    const providerFields = ['publisher', 'provider', 'contributor', 'creator', 'funder', 'author', 'maintainer'];
    const categoryFields = ['category', 'categories'];
    const distributionFields = ['distribution'];

    // Pre-fetch all Organizations if any provider field references one (since Organization has no single GET endpoint)
    let allOrgs: any[] = [];
    const needsOrgs = this.revisions.some((rev) => {
      const r = rev as any;
      return providerFields.some((f) => Array.isArray(r[f]) && r[f].some((i: any) => i.entityType === 'ORGANIZATION'));
    });

    if (needsOrgs) {
      try {
        allOrgs = await this.apiService.endpoints.Organization.getAll.call();
      } catch (e) {
        console.warn('Failed to fetch all organizations', e);
      }
    }

    for (const rev of this.revisions) {
      const revision = rev as any; // treating it generally

      if (revision.spatialExtent && Array.isArray(revision.spatialExtent)) {
        for (const item of revision.spatialExtent) {
          if (item.instanceId && item.metaId && !(item as any).location && !(item as any).coordinates) {
            promises.push(
              this.apiService.endpoints.Location.get
                .call({ instanceId: item.instanceId, metaId: item.metaId })
                .then((res: any) => {
                  if (res && res.length > 0) Object.assign(item, res[0]);
                })
                .catch((e: any) => console.warn('Failed to fetch spatial location', e)),
            );
          }
        }
      }

      if (revision.temporalExtent && Array.isArray(revision.temporalExtent)) {
        for (const item of revision.temporalExtent) {
          if (item.instanceId && item.metaId && !(item as any).startDate && !(item as any).endDate) {
            promises.push(
              this.apiService.endpoints.PeriodOfTime.get
                .call({ singleOptionOnly: true, instanceId: item.instanceId, metaId: item.metaId } as any)
                .then((res: any) => {
                  if (res && res.length > 0) Object.assign(item, res[0]);
                })
                .catch((e: any) => console.warn('Failed to fetch temporal period', e)),
            );
          }
        }
      }

      if (revision.identifier && Array.isArray(revision.identifier)) {
        for (const item of revision.identifier) {
          if (item.instanceId && item.metaId && !(item as any).identifier && !(item as any).type) {
            promises.push(
              this.apiService.endpoints.Identifier.get
                .call({ instanceId: item.instanceId, metaId: item.metaId })
                .then((res: any) => {
                  if (res && res.length > 0) Object.assign(item, res[0]);
                })
                .catch((e: any) => console.warn('Failed to fetch persistent identifier', e)),
            );
          }
        }
      }

      if (revision.contactPoint && Array.isArray(revision.contactPoint)) {
        for (const item of revision.contactPoint) {
          if (item.instanceId && item.metaId && !(item as any).email && !(item as any).telephone && !(item as any).role) {
            promises.push(
              this.apiService.endpoints.ContactPoint.get
                .call({ instanceId: item.instanceId, metaId: item.metaId })
                .then((res: any) => {
                  if (res && res.length > 0) Object.assign(item, res[0]);
                })
                .catch((e: any) => console.warn('Failed to fetch contact point', e)),
            );
          }
        }
      }

      // Hydrate provider fields (Person or Organization)
      providerFields.forEach((field) => {
        if (revision[field] && Array.isArray(revision[field])) {
          revision[field].forEach((item: any) => {
            if (item.instanceId && item.metaId) {
              if (item.entityType === 'PERSON' && !item.name) {
                promises.push(
                  this.apiService.endpoints.Person.get
                    .call({ instanceId: item.instanceId, metaId: item.metaId })
                    .then((res: any) => {
                      if (res && res.length > 0) Object.assign(item, res[0]);
                    })
                    .catch((e: any) => console.warn(`Failed to fetch person for ${field}`, e)),
                );
              } else if (item.entityType === 'ORGANIZATION' && (!item.legalName || item.legalName.length === 0)) {
                const found = allOrgs.find(
                  (org) =>
                    org.uid === item.uid || (org.instanceId === item.instanceId && org.metaId === item.metaId),
                );
                if (found) {
                  Object.assign(item, found);
                }
              }
            }
          });
        }
      });

      // Hydrate category fields
      categoryFields.forEach((field) => {
        if (revision[field] && Array.isArray(revision[field])) {
          revision[field].forEach((item: any) => {
            if (item.instanceId && item.metaId && !item.name) {
              promises.push(
                this.apiService.endpoints.Category.get
                  .call({ instanceId: item.instanceId, metaId: item.metaId })
                  .then((res: any) => {
                    if (res && res.length > 0) Object.assign(item, res[0]);
                  })
                  .catch((e: any) => console.warn(`Failed to fetch category for ${field}`, e)),
              );
            }
          });
        }
      });

      // Hydrate distribution fields
      distributionFields.forEach((field) => {
        if (revision[field] && Array.isArray(revision[field])) {
          revision[field].forEach((item: any) => {
            if (item.instanceId && item.metaId && !item.title && !item.name) {
              const endpoint = item.entityType === 'WEBSERVICE'
                ? this.apiService.endpoints.WebService.get
                : this.apiService.endpoints.Distribution.get;

              promises.push(
                endpoint
                  .call({ instanceId: item.instanceId, metaId: item.metaId })
                  .then(async (res: any) => {
                    if (res && res.length > 0) {
                      Object.assign(item, res[0]);

                      // Deep Hydration for nested fields within distributions and webservices
                      const innerPromises: Promise<any>[] = [];
                      if (item.accessService && Array.isArray(item.accessService)) {
                        item.accessService.forEach((acc: any) => {
                          if (acc.instanceId && acc.metaId && acc.entityType === 'WEBSERVICE' && !acc.name) {
                            innerPromises.push(
                              this.apiService.endpoints.WebService.get
                                .call({ instanceId: acc.instanceId, metaId: acc.metaId })
                                .then((r: any) => { if (r && r.length > 0) Object.assign(acc, r[0]); })
                                .catch((e: any) => console.warn('Failed to fetch accessService', e))
                            );
                          }
                        });
                      }
                      if (revision.documentation && Array.isArray(revision.documentation)) {
                        for (const item of revision.documentation) {
                          if (item.instanceId && item.metaId && !(item as any).title && !(item as any).uri) {
                            promises.push(
                              this.apiService.endpoints.Documentation.get
                                .call({ instanceId: item.instanceId, metaId: item.metaId })
                                .then((res: any) => {
                                  if (res && res.length > 0) Object.assign(item, res[0]);
                                })
                                .catch((e: any) => console.warn('Failed to fetch documentation', e)),
                            );
                          }
                        }
                      }
                      if (item.contactPoint && Array.isArray(item.contactPoint)) {
                        item.contactPoint.forEach((cp: any) => {
                          if (cp.instanceId && cp.metaId && !cp.email && !cp.telephone) {
                            innerPromises.push(
                              this.apiService.endpoints.ContactPoint.get
                                .call({ instanceId: cp.instanceId, metaId: cp.metaId })
                                .then((r: any) => { if (r && r.length > 0) Object.assign(cp, r[0]); })
                                .catch((e: any) => console.warn('Failed to fetch contactPoint', e))
                            );
                          }
                        });
                      }
                      if (item.supportedOperation && Array.isArray(item.supportedOperation)) {
                        item.supportedOperation.forEach((op: any) => {
                          if (op.instanceId && op.metaId && !op.name) {
                            innerPromises.push(
                              this.apiService.endpoints.Operation.get
                                .call({ instanceId: op.instanceId, metaId: op.metaId })
                                .then((r: any) => { if (r && r.length > 0) Object.assign(op, r[0]); })
                                .catch((e: any) => console.warn('Failed to fetch supportedOperation', e))
                            );
                          }
                        });
                      }
                      if (item.provider) {
                        const provs = Array.isArray(item.provider) ? item.provider : [item.provider];
                        provs.forEach((p: any) => {
                          if (p.instanceId && p.metaId && p.entityType === 'ORGANIZATION') {
                            const found = allOrgs.find((org) => org.uid === p.uid || (org.instanceId === p.instanceId && org.metaId === p.metaId));
                            if (found) Object.assign(p, found);
                          }
                        });
                      }
                      if (item.spatialExtent && Array.isArray(item.spatialExtent)) {
                        item.spatialExtent.forEach((loc: any) => {
                          if (loc.instanceId && loc.metaId && !loc.location && !loc.coordinates) {
                            innerPromises.push(
                              this.apiService.endpoints.Location.get
                                .call({ instanceId: loc.instanceId, metaId: loc.metaId })
                                .then((r: any) => { if (r && r.length > 0) Object.assign(loc, r[0]); })
                                .catch((e: any) => console.warn('Failed to fetch spatial location', e))
                            );
                          }
                        });
                      }
                      if (item.temporalExtent && Array.isArray(item.temporalExtent)) {
                        item.temporalExtent.forEach((t: any) => {
                          if (t.instanceId && t.metaId && !t.startDate && !t.endDate) {
                            innerPromises.push(
                              this.apiService.endpoints.PeriodOfTime.get
                                .call({ singleOptionOnly: true, instanceId: t.instanceId, metaId: t.metaId } as any)
                                .then((r: any) => { if (r && r.length > 0) Object.assign(t, r[0]); })
                                .catch((e: any) => console.warn('Failed to fetch temporal period', e))
                            );
                          }
                        });
                      }

                      // Hydrate documentation inside webservice (nested in accessService)
                      if (item.accessService && Array.isArray(item.accessService)) {
                        item.accessService.forEach((acc: any) => {
                          if (acc.documentation && Array.isArray(acc.documentation)) {
                            acc.documentation.forEach((doc: any) => {
                              if (doc.instanceId && doc.metaId && !doc.title && !doc.description) {
                                innerPromises.push(
                                  this.apiService.endpoints.Documentation.get
                                    .call({ instanceId: doc.instanceId, metaId: doc.metaId })
                                    .then((r: any) => { if (r && r.length > 0) Object.assign(doc, r[0]); })
                                    .catch((e: any) => console.warn('Failed to fetch documentation', e))
                                );
                              }
                            });
                          }
                        });
                      }

                      // Hydrate documentation directly on the distribution
                      if (item.documentation && Array.isArray(item.documentation)) {
                        item.documentation.forEach((doc: any) => {
                          if (doc.instanceId && doc.metaId && !doc.title && !doc.description) {
                            innerPromises.push(
                              this.apiService.endpoints.Documentation.get
                                .call({ instanceId: doc.instanceId, metaId: doc.metaId })
                                .then((r: any) => { if (r && r.length > 0) Object.assign(doc, r[0]); })
                                .catch((e: any) => console.warn('Failed to fetch documentation', e))
                            );
                          }
                        });
                      }

                      await Promise.all(innerPromises);

                      // Fetch plugins for this distribution (after all other hydration)
                      if (item.metaId && item.instanceId) {
                        try {
                          const pluginInfo = await this.apiService.endpoints.DistributionPlugin.getAll
                            .call({ metaId: item.metaId, instanceId: item.instanceId });
                          item._plugins = pluginInfo?.[0]?.relations ?? [];
                        } catch (e) {
                          console.warn('Failed to fetch distribution plugins', e);
                          item._plugins = [];
                        }
                      }
                    }
                  })
                  .catch((e: any) => console.warn(`Failed to fetch ${field}`, e)),
              );
            }
          });
        }
      });
    }

    await Promise.allSettled(promises);
  }

}
