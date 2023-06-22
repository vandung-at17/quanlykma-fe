import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavicationComponent } from './main-navication.component';

describe('MainNavicationComponent', () => {
  let component: MainNavicationComponent;
  let fixture: ComponentFixture<MainNavicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainNavicationComponent]
    });
    fixture = TestBed.createComponent(MainNavicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
