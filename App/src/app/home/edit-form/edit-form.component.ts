import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Item } from 'src/app/interfaces/item.interface';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss'],
})
export class EditFormComponent {
  @Input() item: Item;
  @Output() saveItem = new EventEmitter<Item>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.item.name, Validators.required],
      description: [this.item.description],
      price: [this.item.price, Validators.required],
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      const editedItem: Item = {
        ...this.item,
        name: this.form.value.name,
        description: this.form.value.description,
        price: this.form.value.price,
      };

      this.itemService.updateItem(editedItem).subscribe(
        () => {
          console.log('Item updated.');
          this.modalRef.close();
        },
        (error) => {
          console.log('Failed to update item.');
          console.error(error);
        }
      );
    }
  }

  handleCancel(): void {
    this.modalRef.close();
  }
}
