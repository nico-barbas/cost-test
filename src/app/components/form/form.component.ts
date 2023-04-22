import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  currentDate: Date;

  // model for the form
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
    // Check if the submitted data is valid
    if (this.item.date === '') {
      console.error('invalid date');
      return;
    }

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

    // Reset the form
    this.item.amount = 1;
    this.item.date =
      this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') ?? '';
  }

  validateDate(): boolean {
    const date = new Date(this.item.date);
    return date.getTime() < this.currentDate.getTime();
  }

  validateAmount(): boolean {
    return isNaN(this.item.amount) || this.item.amount <= 0;
  }
}
