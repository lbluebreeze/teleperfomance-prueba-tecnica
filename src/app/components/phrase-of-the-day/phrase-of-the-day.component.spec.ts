import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhraseOfTheDayComponent } from './phrase-of-the-day.component';

describe('PhraseOfTheDayComponent', () => {
  let component: PhraseOfTheDayComponent;
  let fixture: ComponentFixture<PhraseOfTheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhraseOfTheDayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhraseOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
