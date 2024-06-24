import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-prompted',
  standalone: true,
  imports: [],
  templateUrl: './prompted.component.html',
  styleUrl: './prompted.component.scss'
})
export class PromptedComponent {
  @Input() text: any;
}
