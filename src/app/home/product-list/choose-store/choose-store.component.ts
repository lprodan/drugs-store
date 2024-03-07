import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-choose-store',
  standalone: true,
  imports: [MatCardModule, MatIconModule],
  templateUrl: './choose-store.component.html',
  styleUrl: './choose-store.component.scss',
})
export class ChooseStoreComponent {}
