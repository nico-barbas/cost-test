import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/Item';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  items: Item[] = [];
  subscription: Subscription | undefined;

  constructor() {}

  ngOnInit(): void {
    this.subscription = ItemsService.getItemsObservable().subscribe((items) => {
      this.items = items;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deleteItem(item: Item) {
    console.log(item);
    ItemsService.removeItem(item);
  }

  clearItems() {
    ItemsService.clearItems();
  }
}
