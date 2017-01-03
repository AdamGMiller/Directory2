/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonCardComponent } from './person-card.component';
import { Person } from '../person';
import { FormsModule } from '@angular/forms';

describe('PersonCardComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let person: Person = { Id: 1, FirstName: "Adam", LastName: "Miller", Photo: "0x", ActiveFlag: true, ConcurrencyToken: "", Dob: new Date(), Age: 1, Interests: "None" };
  /*
    beforeEach(async(() => {
      let person: Person = { Id: 1, FirstName: "Adam", LastName: "Miller", Photo: "0x", ActiveFlag: true, ConcurrencyToken: "", Dob: new Date(), Age: 1, Interests: "None" };
      TestBed.configureTestingModule({
        declarations: [PersonCardComponent],
        imports: [FormsModule]
      })
        .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(PersonCardComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonCardComponent]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PersonCardComponent);
        component = fixture.componentInstance;
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
