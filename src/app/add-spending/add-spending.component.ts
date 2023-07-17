import { Component, EventEmitter, Output } from '@angular/core';
import { Spending } from '../models/spending';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-spending',
  templateUrl: './add-spending.component.html',
  styleUrls: ['./add-spending.component.css'],
})
export class AddSpendingComponent {
  @Output() newSpending = new EventEmitter<Spending>();

  constructor(private fb: FormBuilder) {}

  addRecordForm: any;

  ngOnInit() {
    this.addRecordForm = new FormGroup({
      payer: this.fb.control('София'),
      asset: this.fb.control(''),
      cost: this.fb.control(''),
      date: this.fb.control(''),
    });
  }

  // addSpending() {
  //   this.newSpending.emit({
  //     payer: 'София',
  //     asset: 'Билеты на поезд',
  //     cost: 200,
  //     date: '13.7',
  //   });
  // }

  onSubmit(formData: any) {
    this.newSpending.emit(formData.value);
    this.addRecordForm.reset();
  }
}
