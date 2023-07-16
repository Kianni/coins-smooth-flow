import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { Spending } from './models/spending';

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

  title = 'coins-smooth-flow';
  sentence: string = '';
  spendingsSub: Subscription = new Subscription();
  spendings: Spending[] = [];

  ngOnInit() {
    this.spendingsSub = this.spendings$.subscribe((spendings) => {
      const [debtor, debtAmount] = this.getDebt(spendings);
      this.spendings = spendings;
      this.sentence = this.makeSentence(debtor, debtAmount);
    });
  }

  onLoginCheck(data: boolean) {
    this.loggedIn = data;
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

  ngOnDestroy() {
    this.spendingsSub.unsubscribe();
  }
}
