import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  delay,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  public items: Item[] = [
    { id: 1, name: 'Item 1', description: 'Description for item 1', price: 10 },
    { id: 2, name: 'Item 2', description: 'Description for item 2', price: 20 },
    { id: 3, name: 'Item 3', description: 'Description for item 3', price: 30 },
    { id: 4, name: 'Item 4', description: 'Description for item 4', price: 40 },
    { id: 5, name: 'Item 5', description: 'Description for item 5', price: 50 },
    { id: 6, name: 'Item 6', description: 'Description for item 6', price: 60 },
    { id: 7, name: 'Item 7', description: 'Description for item 7', price: 70 },
    { id: 8, name: 'Item 8', description: 'Description for item 8', price: 80 },
    { id: 9, name: 'Item 9', description: 'Description for item 9', price: 90 },
    {
      id: 10,
      name: 'Item 10',
      description: 'Description for item 10',
      price: 100,
    },
    {
      id: 11,
      name: 'Item 11',
      description: 'Description for item 11',
      price: 110,
    },
    {
      id: 12,
      name: 'Item 12',
      description: 'Description for item 12',
      price: 120,
    },
    {
      id: 13,
      name: 'Item 13',
      description: 'Description for item 13',
      price: 130,
    },
    {
      id: 14,
      name: 'Item 14',
      description: 'Description for item 14',
      price: 140,
    },
  ];

  private itemsSubject = new BehaviorSubject<Item[]>(this.items);
  public totalCount = this.items.length;
  getItems(pageIndex: number, pageSize: number): Observable<Item[]> {
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const items = this.items.slice(startIndex, endIndex);
    const totalItems = this.items.length;

    return of(items).pipe(
      delay(1000),
      tap(() => {
        this.totalCount = totalItems;
      })
    );
  }

  getItemById(id: number): Observable<Item> {
    return this.itemsSubject
      .asObservable()
      .pipe(map((items) => items.find((item) => item.id === id)));
  }

  addItem(item: Item): Observable<void> {
    item.id = this.items.length + 1;
    this.items.push(item);
    this.itemsSubject.next(this.items);
    return of(null);
  }

  deleteItem(id: number): Observable<void> {
    this.items = this.items.filter((item) => item.id !== id);
    this.itemsSubject.next(this.items);
    return of(null);
  }

  updateItem(item: Item): Observable<void> {
    const index = this.items.findIndex((i) => i.id === item.id);
    this.items[index] = item;
    this.itemsSubject.next(this.items);
    return of(null);
  }

  constructor() {}
}
