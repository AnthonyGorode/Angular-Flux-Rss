/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FluxRssComponent } from './flux-rss.component';

describe('FluxRssComponent', () => {
  let component: FluxRssComponent;
  let fixture: ComponentFixture<FluxRssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FluxRssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxRssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
