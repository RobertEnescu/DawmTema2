import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Item } from 'src/app/interfaces/item.interface';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
})
export class ItemFormComponent implements OnInit {
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
      name: [this.item?.name, Validators.required],
      description: [this.item?.description],
      price: [this.item?.price, Validators.required],
    });
  }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if (this.form.valid) {
      const newItem = {
        name: this.form.value.name,
        description: this.form.value.description,
        price: this.form.value.price,
      };

      this.itemService.addItem(newItem).subscribe(
        (result) => {
          console.log('Item added.');
          this.modalRef.close(true);
        },
        (error) => {
          console.log('Failed to add item.');
          console.error(error);
        }
      );
    }
  }

  handleCancel(): void {
    this.modalRef.close(false);
  }
}
