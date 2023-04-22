import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/Item';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  currentDate: Date;

  item = { date: '', amount: 0 };

  constructor(private datePipe: DatePipe) {
    this.currentDate = new Date();
    this.currentDate.setHours(0, 0, 0, 0);
    this.item = {
      date: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') ?? '',
      amount: 1,
    };
  }

  handleSubmit() {
    const date = new Date(this.item.date);
    if (date.getTime() < this.currentDate.getTime()) {
      console.error('invalid date: ', date.toISOString());
      return;
    }
    if (isNaN(this.item.amount) || this.item.amount <= 0) {
      console.error('invalid amount: ', this.item.amount);
      return;
    }
    ItemsService.addItem({ date: date, amount: this.item.amount });
  }

  validateDate() {
    const date = new Date(this.item.date);
    console.log(date.getTime(), this.currentDate.getTime());
    return date.getTime() < this.currentDate.getTime();
  }

  validateAmount() {
    return isNaN(this.item.amount) || this.item.amount <= 0;
  }
}

interface CostFormElements extends HTMLCollection {
  date: HTMLInputElement;
  amount: HTMLInputElement;
}
