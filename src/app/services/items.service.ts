import { Injectable } from '@angular/core';
import { Item } from '../Item';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  static instance: ItemsService | undefined;
  items: Item[] = [];
  nextID = 1;
  itemsSubject = new BehaviorSubject<Item[]>([]);

  constructor() {
    const data = localStorage.getItem('itemsData');

    if (data) {
      const items: Item[] = JSON.parse(data);

      this.items = items
        .map((item) => {
          return {
            id: item.id,
            date: new Date(item.date),
            amount: item.amount,
          };
        })
        .sort((a, b) => {
          return a.date.getTime() - b.date.getTime();
        });

      this.items.forEach((item) => {
        if (item.id && item.id >= this.nextID) {
          this.nextID = item.id + 1;
        }
      });

      this.itemsSubject = new BehaviorSubject(this.items);
    }
  }

  private serializeItems() {
    const rawData = JSON.stringify(this.items);
    localStorage.setItem('itemsData', rawData);
  }

  private static getInstance(): ItemsService {
    if (!this.instance) {
      this.instance = new ItemsService();
    }

    return this.instance;
  }

  static getItems(): Item[] {
    return this.getInstance().items;
  }

  static getItemsObservable(): Observable<Item[]> {
    return this.getInstance().itemsSubject.asObservable();
  }

  static addItem(item: Item) {
    const instance = this.getInstance();
    item.id = instance.nextID;
    instance.nextID += 1;

    instance.items.push(item);
    instance.serializeItems();
    instance.itemsSubject.next(instance.items);
  }

  static removeItem(item: Item) {
    const instance = this.getInstance();
    instance.items = instance.items.filter((it) => {
      return it.id !== item.id;
    });
    instance.serializeItems();
    instance.itemsSubject.next(instance.items);
  }

  static clearItems() {
    const instance = this.getInstance();
    instance.items = [];
    instance.serializeItems();
    instance.itemsSubject.next(instance.items);
  }
}
