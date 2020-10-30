import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AyedocsComponent } from './ayedocs.component';

describe('AyedocsComponent', () => {
  let component: AyedocsComponent;
  let fixture: ComponentFixture<AyedocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AyedocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AyedocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
