import { Component, Input } from '@angular/core';
import { Spending } from '../models/spending';

@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.component.html',
  styleUrls: ['./spending-list.component.css'],
})
export class SpendingListComponent {
  @Input() spendings: Spending[] = [];
  sentence: string = '';

  ngOnChanges() {
    const [debtor, debtAmount] = this.getDebt(this.spendings);
    this.sentence = this.makeSentence(debtor, debtAmount);
  }

  getDebt(data: Spending[]): [string, number] {
    let expenditure_Kirill = 0;
    let expenditure_Sofia = 0;
    let debtAmount: number = 0;
    let debtor: string = '';
    data.forEach((asset: Spending) => {
      if (asset.payer === 'София') expenditure_Sofia += asset.cost;
      if (asset.payer === 'Кирилл') expenditure_Kirill += asset.cost;
    });
    debtor =
      expenditure_Sofia / 2 > expenditure_Kirill / 2 ? 'Кирилл' : 'София';
    debtAmount = Math.abs(expenditure_Sofia / 2 - expenditure_Kirill / 2);
    return [debtor, debtAmount];
  }

  makeSentence(debtor: string, debtAmount: number): string {
    let beginning =
      debtor === 'Кирилл'
        ? 'Кирилл должен перевести Софии '
        : 'Cофия должна перевести Кириллу ';

    return beginning + '€ ' + debtAmount;
  }
}
