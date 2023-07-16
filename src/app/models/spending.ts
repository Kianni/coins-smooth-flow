export interface Spending {
  payer: string;
  asset: string;
  cost: number;
  // to be of Date type
  date: string;
}

// data = [
//   {
//     payer: 'София',
//     asset: 'Вакцина от клещевого энцефалита',
//     cost: 55,
//     date: '21.5',
//   },
//   { payer: 'София', asset: 'Лекарства от аллергии', cost: 55, date: '11.5' },
//   { payer: 'Кирилл', asset: 'Кроссовки', cost: 88, date: '9.5' },
// ];
