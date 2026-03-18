import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormTree } from './formTree';

@Injectable({
  providedIn: 'root',
})
export class ExplorerService {
  private formTree = new BehaviorSubject<Array<FormTree>>([]);
  public formTreeObs = this.formTree.asObservable();

  private goto = new BehaviorSubject<string>('');
  public gotoObs = this.goto.asObservable();

  /**
   * The function sets the form section in a form tree data structure.
   * @param {string | null} parent - The parent parameter is a string or null. It represents the parent
   * section of the form tree. If it is null, it means that the section is a root section and has no
   * parent. If it is a string, it represents the ID or name of the parent section.
   * @param {FormTree} section - The `section` parameter is of type `FormTree`. It represents the section
   * that needs to be added or updated in the form tree.
   * @param {boolean} start - A boolean value indicating whether this is the start of a new form section
   * or not. If it is true, it means this is the first section of the form. If it is false, it means this
   * is not the first section and we need to find the parent section to add the new section as
   */
  public setFormSection(parent: string | null, section: FormTree, start: boolean, id = '') {
    let root: Array<FormTree> = [];
    if (start === false && parent !== null) {
      root = this.recursiveSearch(this.formTree.getValue(), parent, section, true, id);
    } else {
      if (id !== '') {
        section.id += id;
      }
      root.push(section);
    }

    this.formTree.next(root);
  }

  /**
   * The `removeFormSection` function removes a form section from a form tree structure.
   * @param {string | null} parent - The `parent` parameter is a string or null value that represents the
   * parent section of the section to be removed. If the section to be removed is a top-level section,
   * the `parent` parameter should be null. Otherwise, it should be the id of the parent section.
   * @param {string} id - The `id` parameter is a string that represents the unique identifier of the
   * form section that needs to be removed.
   */
  public removeFormSection(parent: string | null, id: string) {
    let root: Array<FormTree> = [];
    const section: FormTree = {
      id: id,
      name: '',
      children: [],
    };

    root = this.recursiveSearch(this.formTree.getValue(), parent, section, false);

    this.formTree.next(root);
  }

  /**
   * The function sets a specific form tree node as active.
   * @param {string} id - The "id" parameter is a string that represents the identifier of the form tree
   * element that needs to be set as active.
   */
  public setFormTreeActive(id: string): void {
    this.formTree.next(this.setActive(this.formTree.getValue(), id));
  }

  private recursiveSearch(
    formTree: Array<FormTree>,
    parent: string | null,
    node: FormTree,
    adding = true,
    id = '',
  ): Array<FormTree> {
    // add id to nodeId
    if (id !== '') {
      if (node.id.includes(id) === false) {
        node.id += id;
      }

      node.children.forEach((child) => {
        if (child.id.includes(id) === false) {
          child.id += id;
        }
      });
    }

    formTree.forEach((branch: FormTree) => {
      if (branch.id === parent) {
        if (adding === true) {
          // const index = branch.children.findIndex((object) => object.id === node.id);
          // if (index === -1) {
          //   console.debug('//no push')
          branch.children.push(node);
          // }
        } else {
          branch.children.forEach((child: FormTree, index) => {
            branch.children.splice(index, 1);
          });
        }
      } else {
        this.recursiveSearch(branch.children, parent, node, adding, id);
      }
    });
    return formTree;
  }

  private setActive(formTree: Array<FormTree>, id: string): Array<FormTree> {
    formTree.forEach((branch: FormTree) => {
      branch.active = false;
      if (branch.id === id) {
        branch.active = true;
      } else {
        this.setActive(branch.children, id);
      }
    });
    return formTree;
  }

  /**
   * The goTo function in TypeScript checks if the provided id is not empty and then emits the id using
   * the goto subject.
   * @param {string} id - A string representing the ID of the element to navigate to.
   */
  public goTo(id: string) {
    if (id !== '') {
      this.goto.next(id);
    }
  }
}
