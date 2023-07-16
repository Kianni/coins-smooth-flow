import { Component, EventEmitter, Output } from '@angular/core';
import { Spending } from '../models/spending';

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.css'],
})
export class AddSpendingComponent {
  @Output() newSpending = new EventEmitter<Spending>();

  addSpending() {
    this.newSpending.emit({
      payer: 'София',
      asset: 'Билеты на поезд',
      cost: 200,
      date: '13.7',
    });
  }
}
