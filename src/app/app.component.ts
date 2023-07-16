import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);
  spendings$: Observable<any[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'spendings');
    this.spendings$ = collectionData(aCollection);
  }

  loggedIn = false;
  data = [
    {
      payer: 'София',
      asset: 'Вакцина от клещевого энцефалита',
      cost: 55,
      date: '21.5',
    },
    { payer: 'София', asset: 'Лекарства от аллергии', cost: 55, date: '11.5' },
    { payer: 'Кирилл', asset: 'Кроссовки', cost: 88, date: '9.5' },
  ];
  title = 'coins-smooth-flow';
  debtAmount: number = 0;
  debtor: string = '';
  sentence: string = '';

  ngOnInit() {
    this.getDebt();
  }

  onLoginCheck(data: boolean) {
    this.loggedIn = data;
  }

  getDebt() {
    let expenditure_Kirill = 0;
    let expenditure_Sofia = 0;
    this.data.forEach((asset) => {
      if (asset.payer === 'София') expenditure_Sofia += asset.cost;
      if (asset.payer === 'Кирилл') expenditure_Kirill += asset.cost;
    });
    this.debtor =
      expenditure_Sofia / 2 > expenditure_Kirill / 2 ? 'Кирилл' : 'София';
    this.sentence = this.makeSentence();
    this.debtAmount = Math.abs(expenditure_Sofia / 2 - expenditure_Kirill / 2);
  }

  makeSentence() {
    return this.debtor === 'Кирилл'
      ? 'Кирилл должен перевести Софии '
      : 'Cофия должна перевести Кириллу ';
  }
}
