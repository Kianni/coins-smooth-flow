import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Spending } from '../models/spending';

@Component({
  selector: 'app-spending-list',
  templateUrl: './spending-list.component.html',
  styleUrls: ['./spending-list.component.css'],
})
export class SpendingListComponent {
  @Input() spendings: Spending[] = [];
  @Input() sentence: string = '';
}
