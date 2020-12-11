import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullRawComponent } from './full-raw.component';

describe('FullRawComponent', () => {
  let component: FullRawComponent;
  let fixture: ComponentFixture<FullRawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullRawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullRawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
