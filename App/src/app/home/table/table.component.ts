import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Item } from 'src/app/interfaces/item.interface';
import { ItemService } from 'src/app/services/item.service';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  items: Item[] = [];
  total = 0;
  loading = false;
  pageSize = 8;
  pageIndex = 1;

  constructor(
    private itemService: ItemService,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(reset = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.itemService.getItems(this.pageIndex, this.pageSize).subscribe(
      (items) => {
        this.items = items;
        this.total = this.itemService.totalCount; // Use the total count from the service
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  onItemSaved(updatedItem: Item): void {
    const index = this.items.findIndex((item) => item.id === updatedItem.id);
    this.items[index] = updatedItem;
  }

  handleQueryParams(params: { pageSize: number; pageIndex: number }): void {
    const { pageSize, pageIndex } = params;
    this.pageSize = pageSize;
    this.pageIndex = pageIndex;
    this.fetchData();
  }

  showAddModal(): void {
    const modalRef = this.modalService.create({
      nzTitle: 'Add Item',
      nzContent: ItemFormComponent,
      nzComponentParams: {
        item: { id: null, name: '', description: '', price: null },
      },
      nzFooter: null,
    });

    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.fetchData();
      }
    });
  }

  showEditModal(item: Item): void {
    const modalRef = this.modalService.create({
      nzTitle: 'Edit Item',
      nzContent: EditFormComponent,
      nzFooter: null,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        item: item,
      },
    });
    modalRef.afterClose.subscribe((result) => {
      if (result) {
        this.fetchData();
      }
      this.fetchData();
    });
  }

  deleteItem(item: Item): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure you want to delete this item?',
      nzOnOk: () => {
        this.itemService.deleteItem(item.id).subscribe(
          () => {
            // Remove the deleted item from the items array
            this.items = this.items.filter((i) => i.id !== item.id);

            // Decrement the total count
            this.total--;

            // If there are no more items on the current page, go back one page
            if (this.items.length === 0 && this.pageIndex > 1) {
              this.pageIndex--;
              this.fetchData();
            }
          },
          (error) => {
            console.log('Error deleting item:', error);
          }
        );
      },
    });
  }
}
