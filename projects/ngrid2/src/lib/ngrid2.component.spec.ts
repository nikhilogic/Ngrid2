import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ngrid2Component } from './ngrid2.component';

describe('Ngrid2Component', () => {
  let component: Ngrid2Component;
  let fixture: ComponentFixture<Ngrid2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ngrid2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ngrid2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
