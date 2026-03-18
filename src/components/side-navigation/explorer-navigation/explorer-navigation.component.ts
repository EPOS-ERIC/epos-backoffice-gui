import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { ExplorerService } from './explorer.service';
import { FormTree } from './formTree';
import { StateChangeService } from 'src/services/stateChange.service';

/** Flat node with expandable and level information */
interface FormTreeNode {
  id: string;
  expandable: boolean;
  name: string;
  level: number;
  isExpanded: boolean;
  isActive: boolean;
}

@Component({
  selector: 'app-explorer-navigation',
  templateUrl: './explorer-navigation.component.html',
  styleUrls: ['./explorer-navigation.component.scss'],
})
export class ExplorerNavigationComponent implements OnInit {
  private readonly subscriptions: Array<Subscription> = new Array<Subscription>();

  private _transformer = (node: FormTree, level: number) => {
    return {
      id: node.id,
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      isExpanded: node.expanded ?? false,
      isActive: node.active ?? false,
    };
  };

  public treeControl = new FlatTreeControl<FormTreeNode>(
    (node) => node.level,
    (node) => node.expandable,
  );

  public treeFlattener = new MatTreeFlattener(
    this._transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children,
  );

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private explorerService: ExplorerService, private stateChangeService: StateChangeService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.explorerService.formTreeObs.subscribe((treeData: Array<FormTree>) => {
        this.dataSource.data = treeData;
        this.expandNodes(this.treeControl.dataNodes);
      }),
    );
  }

  hasChild = (_: number, node: FormTreeNode) => node.expandable;

  public scrollOn(nodeId: string) {
    this.explorerService.goTo(nodeId);
    this.explorerService.goTo;
  }

  private expandNodes(treeNodeArray: Array<FormTreeNode>): void {
    treeNodeArray.forEach((treeNode: FormTreeNode) => {
      if (treeNode.isExpanded) {
        this.treeControl.expand(treeNode);
      }
    });
  }
}
