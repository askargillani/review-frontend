import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptedComponent } from './prompted.component';

describe('PromptedComponent', () => {
  let component: PromptedComponent;
  let fixture: ComponentFixture<PromptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
