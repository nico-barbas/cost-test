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
    // Check and retrieve previous data
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

      // Find the current highest ID from the retrieved items
      this.items.forEach((item) => {
        if (item.id && item.id >= this.nextID) {
          this.nextID = item.id + 1;
        }
      });

      this.itemsSubject = new BehaviorSubject(this.items);
    }
  }

  // Used for persistent storage
  private serializeItems() {
    const rawData = JSON.stringify(this.items);
    localStorage.setItem('itemsData', rawData);
  }

  private sortItems() {
    this.items = this.items.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
  }

  // Sort, save and publish to listeners
  private commitChanges() {
    this.sortItems();
    this.serializeItems();
    this.itemsSubject.next(this.items);
  }

  private static getInstance(): ItemsService {
    if (!this.instance) {
      this.instance = new ItemsService();
    }

    return this.instance;
  }

  static getItemsObservable(): Observable<Item[]> {
    return this.getInstance().itemsSubject.asObservable();
  }

  static addItem(item: Item) {
    const instance = this.getInstance();
    item.id = instance.nextID;
    instance.nextID += 1;

    instance.items.push(item);
    instance.commitChanges();
  }

  static removeItem(item: Item) {
    const instance = this.getInstance();
    instance.items = instance.items.filter((it) => {
      return it.id !== item.id;
    });
    instance.commitChanges();
  }

  static clearItems() {
    const instance = this.getInstance();
    instance.items = [];
    instance.commitChanges();
  }
}
