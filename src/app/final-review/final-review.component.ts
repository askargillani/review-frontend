import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ResponseComponent } from '../response/response.component';
import { PromptedComponent } from '../prompted/prompted.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ReviewServiceService } from '../review-service.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-final-review',
  standalone: true,
  imports: [
    MatRadioModule, ReactiveFormsModule, MatIconModule,
    CommonModule, RouterOutlet, ResponseComponent, PromptedComponent,
    MatFormFieldModule, MatInputModule, FormsModule
  ],
  templateUrl: './final-review.component.html',
  styleUrls: ['./final-review.component.scss']
})
export class FinalReviewComponent implements OnInit {
  title = 'review-frontend';
  conversation: any;
  prompt = new FormControl('', [Validators.required]);
  conversationId: any;
  doc_locked = new FormControl(false);
  overallComments = new FormControl('');
  employeeName = null;
  impactsList: any = []

  programmingSkillsScale = new FormControl<number | null>(null);
  programmingSkillsComments = new FormControl('');
  programmingSkillsLocked = new FormControl(false);

  senseOfResponsibilityScale = new FormControl<number | null>(null);
  senseOfResponsibilityComments = new FormControl('');
  senseOfResponsibilityLocked = new FormControl(false);

  teamworkScale = new FormControl<number | null>(null);
  teamworkComments = new FormControl('');
  teamworkLocked = new FormControl(false);

  selfLearningScale = new FormControl<number | null>(null);
  selfLearningComments = new FormControl('');
  selfLearningLocked = new FormControl(false);

  professionalAppearanceScale = new FormControl<number | null>(null);
  professionalAppearanceComments = new FormControl('');
  professionalAppearanceLocked = new FormControl(false);

  constructor(private reviewService: ReviewServiceService) { }

  ngOnInit(): void {
    this.reviewService.initiateSession().subscribe({
      next: (data: any) => {
        this.conversation = data.conversation;
        this.conversationId = data.conversationId;
      },
      error: (err: any) => {
        console.log("error occurred", err);
      }
    });
  }

  changeLockStatus(control: FormControl) {
    control.setValue(!control.value);
  }

  promptMessage() {

    let payload = {
      conversationId: this.conversationId,
      prompt: this.prompt.value,
      name: this.employeeName,
    };

    this.conversation.push({ "role": "user", "content": this.prompt.value });
    this.reviewService.finalReviewInstruction(payload).subscribe({
      next: (data: any) => {
        this.conversation = data.conversation;
        this.conversationId = data.conversationId;
        this.impactsList = data.impacts
        this.employeeName = data.name
        if(this.impactsList.includes(0) && !this.programmingSkillsLocked?.value) {
          this.reviewService.updateProgrammingSkills(this.conversationId, this.employeeName).subscribe({
            next: (data: any) => {
              this.programmingSkillsComments.setValue( data.comments);
              this.programmingSkillsScale.setValue(data.scale);
            },
            error: (err: any) => {
              console.log("error occurred", err);
            }
          });
        }
        if(this.impactsList.includes(1) && !this.senseOfResponsibilityLocked?.value) {
          this.reviewService.updateSenseOfResponsibility(this.conversationId, this.employeeName).subscribe({
            next: (data: any) => {
              this.senseOfResponsibilityComments.setValue(data.comments);
              this.senseOfResponsibilityScale.setValue(data.scale);
            },
            error: (err: any) => {
              console.log("error occurred", err);
            }
          });
        }
        if(this.impactsList.includes(2) && !this.teamworkLocked?.value) {
          this.reviewService.updateTeamWork(this.conversationId, this.employeeName).subscribe({
            next: (data: any) => {
              this.teamworkComments.setValue(data.comments);
              this.teamworkScale.setValue(data.scale);
            },
            error: (err: any) => {
              console.log("error occurred", err);
            }
          });
        }
        if(this.impactsList.includes(3) && !this.selfLearningLocked?.value) {
          this.reviewService.updateSelfLearning(this.conversationId, this.employeeName).subscribe({
            next: (data: any) => {
              this.selfLearningComments.setValue(data.comments);
              this.selfLearningScale.setValue(data.scale);
            },
            error: (err: any) => {
              console.log("error occurred", err);
            }
          });
        }
        if(this.impactsList.includes(4) && !this.professionalAppearanceLocked?.value) {
          this.reviewService.updateProfessionalAppearance(this.conversationId, this.employeeName).subscribe({
            next: (data: any) => {
              this.professionalAppearanceComments.setValue(data.comments);
              this.professionalAppearanceScale.setValue(data.scale)
            },
            error: (err: any) => {
              console.log("error occurred", err);
            }
          });
        }
      },
      error: (err: any) => {
        console.log("error occurred", err);
      }
    });
  }

  saveReview() {
    let payload = {
      employeeName: this.employeeName,
      programmingSkillsScale: this.programmingSkillsScale.value,
      programmingSkillsComments: this.programmingSkillsComments.value,
      senseOfResponsibilityScale: this.senseOfResponsibilityScale.value,
      senseOfResponsibilityComments: this.senseOfResponsibilityComments.value,
      teamworkScale: this.teamworkScale.value,
      teamworkComments: this.teamworkComments.value,
      selfLearningScale: this.selfLearningScale.value,
      selfLearningComments: this.selfLearningComments.value,
      professionalAppearanceScale: this.professionalAppearanceScale.value,
      professionalAppearanceComments: this.professionalAppearanceComments.value
    };

    this.reviewService.saveReview(payload).subscribe({
      next: (data: any) => {
        console.log('Review saved successfully', data);
      },
      error: (err: any) => {
        console.log('Error occurred while saving review', err);
      }
    });
  }

  compareReview() {
    let payload = {
      employeeName: this.employeeName,
      programmingSkillsScale: this.programmingSkillsScale.value,
      programmingSkillsComments: this.programmingSkillsComments.value,
      senseOfResponsibilityScale: this.senseOfResponsibilityScale.value,
      senseOfResponsibilityComments: this.senseOfResponsibilityComments.value,
      teamworkScale: this.teamworkScale.value,
      teamworkComments: this.teamworkComments.value,
      selfLearningScale: this.selfLearningScale.value,
      selfLearningComments: this.selfLearningComments.value,
      professionalAppearanceScale: this.professionalAppearanceScale.value,
      professionalAppearanceComments: this.professionalAppearanceComments.value
    };

    this.reviewService.compareReview(payload).subscribe({
      next: (data: any) => {
        this.conversation.push({ "role": "gpt", "content": data.response });
      },
      error: (err: any) => {
        console.log('Error occurred while saving review', err);
      }
    });
  }
  
}
