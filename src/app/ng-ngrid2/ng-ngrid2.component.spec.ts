import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgNgrid2Component } from './ng-ngrid2.component';

describe('NgNgrid2Component', () => {
  let component: NgNgrid2Component;
  let fixture: ComponentFixture<NgNgrid2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgNgrid2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgNgrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
