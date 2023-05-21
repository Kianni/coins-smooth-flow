import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
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

  getDebt() {
    let expenditure_Kirill = 0;
    let expenditure_Sofia = 0;
  }
  title = 'coins-smooth-flow';
}
