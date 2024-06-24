import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ResponseComponent } from '../response/response.component';
import { PromptedComponent } from '../prompted/prompted.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ReviewServiceService } from '../review-service.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-self-review',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule,CommonModule, RouterOutlet, ResponseComponent, PromptedComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './self-review.component.html',
  styleUrl: './self-review.component.scss',
  providers: [ReviewServiceService]
})
export class SelfReviewComponent {
  title = 'review-frontend';
  conversation: any;
  prompt = new FormControl<any>(null, [Validators.required]);
  conversationId: any;

  constructor(private reviewService: ReviewServiceService){

  }
  ngOnInit(): void {
    this.reviewService.initiateSession().subscribe({
      next: (data: any) => {
        this.conversation = data.conversation;
        this.conversationId = data.conversationId
      },
      error: (err: any) => {
        console.log("error occured");
      }
    })
  }

  promptMessage(){
    let payload = {
      conversationId: this.conversationId,
      prompt : this.prompt.value
    }
    this.conversation.push({"role":"user", "content":this.prompt.value})
    this.reviewService.selfReview(payload).subscribe({
      next: (data: any) => {
        this.conversation = data.conversation;
        this.conversationId = data.conversationId
      },
      error: (err: any) => {
        console.log("error occured");
      }
    })
  }
}
