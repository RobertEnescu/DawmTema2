import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TableComponent } from './table/table.component';
import { ItemFormComponent } from './item-form/item-form.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { ReactiveFormsModule } from '@angular/forms';
import { EditFormComponent } from './edit-form/edit-form.component';

@NgModule({
  declarations: [TableComponent, ItemFormComponent, EditFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzTableModule,
    NzPaginationModule,
    NzModalModule,
    NzTableModule,
    NzFormModule,
    NzMessageModule,
    NzPaginationModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
