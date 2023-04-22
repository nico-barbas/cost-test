import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() id = 0;
  @Input() date = new Date();
  @Input() amount = 0;
  @Output() deleteItem = new EventEmitter();

  constructor(public datePipe: DatePipe) {}

  onCrossClick() {
    this.deleteItem.emit({
      id: this.id,
      date: this.date,
      amount: this.amount,
    });
  }
}
