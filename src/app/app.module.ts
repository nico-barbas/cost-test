import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, FormComponent, ListComponent, ItemComponent],
  imports: [BrowserModule, FormsModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
