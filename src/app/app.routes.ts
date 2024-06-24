import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SelfReviewComponent} from './self-review/self-review.component';
import { ManagerReviewComponent } from './manager-review/manager-review.component';
import { FinalReviewComponent } from './final-review/final-review.component';
export const routes: Routes = [
    { path: '', redirectTo: '/manage-review', pathMatch: 'full' },
    { path: 'self-review', component: SelfReviewComponent, pathMatch: 'full' },
    { path: 'manager-review', component: ManagerReviewComponent, pathMatch: 'full' },   
    { path: 'final-review', component: FinalReviewComponent, pathMatch: 'full' },
];
