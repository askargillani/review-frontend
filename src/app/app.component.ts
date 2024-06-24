import { Component} from '@angular/core';
import { ReviewServiceService } from './review-service.service';
import { WebHeaderComponent } from './web-header/web-header.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WebHeaderComponent,RouterOutlet],
  templateUrl: './app.component.html',
  providers: [ReviewServiceService],
  styleUrl: './app.component.scss'
})
export class AppComponent{
 
}
