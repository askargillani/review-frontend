import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-header',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss']
})
export class WebHeaderComponent {
  categoryList: any = [
    { value: 0, functionality: "manager review" },
    { value: 1, functionality: "self review" },
    { value: 2, functionality: "final evaluation" },
  ];
  selectedCategory : any;

  constructor(private router: Router) {
    this.selectedCategory = this.categoryList[0].value;
  }

  onCategoryChange(event: any) {
    const selectedValue = event.value;

    // Navigate based on selected value
    if (selectedValue === 0) {
      this.router.navigate(['manager-review']);
    } else if (selectedValue === 1) {
      this.router.navigate(['self-review']);
    } else if (selectedValue === 2) {
      this.router.navigate(['final-review']);
    }
  }
}
