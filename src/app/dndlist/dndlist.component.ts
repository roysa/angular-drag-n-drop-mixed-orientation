import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CdkDragEnter, CdkDropList} from "@angular/cdk/drag-drop";

import {moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dndlist',
  templateUrl: './dndlist.component.html',
  styleUrls: ['./dndlist.component.scss']
})
export class DNDListComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) placeholder: CdkDropList;

  public items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  public target?: CdkDropList;
  public targetIndex?: number;
  public source?: CdkDropList;
  public sourceIndex?: number;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    let phElement = this.placeholder.element.nativeElement;

    phElement.style.display = 'none';
    phElement.parentNode.removeChild(phElement);
  }

  ngOnInit(): void {
  }

  drop() {
    if (!this.target) return;

    let phElement = this.placeholder.element.nativeElement;
    let parent = phElement.parentNode;

    phElement.style.display = 'none';

    parent.removeChild(phElement);

    parent.insertBefore(
      this.source.element.nativeElement,
      parent.children[this.sourceIndex]
    );

    if (this.sourceIndex != this.targetIndex) {
      moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
    }

    this.target = undefined;
    this.source = undefined;
    this.targetIndex = undefined;
    this.sourceIndex = undefined;

    this.cd.detectChanges();
  }

  enter(e: CdkDragEnter) {
    const drag = e.item;
    const drop = e.container;

    if (drop === this.placeholder) return;

    let phElement = this.placeholder.element.nativeElement;
    let dropElement = drop.element.nativeElement;

    let dragIndex =
      typeof this.sourceIndex === 'number'
        ? this.sourceIndex
        : __indexOf(
          dropElement.parentNode.children,
          drag.dropContainer.element.nativeElement
        );

    let dropIndex = __indexOf(dropElement.parentNode.children, dropElement);

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;
      let sourceElement = this.source.element.nativeElement;

      phElement.style.width = 212 + 'px';
      phElement.style.height = sourceElement.clientHeight + 'px';

      sourceElement.parentNode.removeChild(sourceElement);
    }

    phElement.style.display = '';

    if (this.sourceIndex < dropIndex) {
      if (dropIndex < this.targetIndex) {
        dropElement.parentElement!.insertBefore(phElement, dropElement);
      } else {
        dropElement.parentElement!.insertBefore(
          phElement,
          dropElement.nextSibling
        );
      }
    } else {
      if (this.targetIndex < dropIndex) {
        dropElement.parentElement!.insertBefore(
          phElement,
          dropElement.nextSibling
        );
      } else {
        dropElement.parentElement!.insertBefore(phElement, dropElement);
      }
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    this.placeholder._dropListRef.enter(
      drag._dragRef,
      drag.element.nativeElement.offsetLeft,
      drag.element.nativeElement.offsetTop
    );

    this.cd.detectChanges();
  }

  add() {
    this.items.push(this.items.length + 1);
  }

  shuffle() {
    this.items.sort(function() {
      return .5 - Math.random();
    });
  }

}


function __indexOf(collection: any, node: any): number {
  return Array.prototype.indexOf.call(collection, node);
}
