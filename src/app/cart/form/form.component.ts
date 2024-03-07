import { Component } from '@angular/core';
import { FormItemComponent } from './form-item/form-item.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormItemComponent, MatCardModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {}
