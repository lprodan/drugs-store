import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-store-list-item',
  standalone: true,
  imports: [MatListModule, MatCardModule],
  templateUrl: './store-list-item.component.html',
  styleUrl: './store-list-item.component.scss',
})
export class StoreListItemComponent {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) logoUrl!: string;

  constructor() {}
}
