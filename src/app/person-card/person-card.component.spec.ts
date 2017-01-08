/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonCardComponent } from './person-card.component';
import { PhotoUploadComponent } from '../photo-upload/photo-upload.component';
import { Person } from '../person';
import { FormsModule } from '@angular/forms';
import { PeopleService } from '../people.service';
import { Http, Response, HttpModule } from '@angular/http'

describe('PersonEditorComponent', () => {
  let component: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;
  let person: Person = { Id: 1, FirstName: "Adam", LastName: "Miller", Photo: "0x", ActiveFlag: true, ConcurrencyToken: "", Dob: new Date(), Age: 1, Interests: "None" };

  var peopleServiceStub = {
    addPerson(person: Person) { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonCardComponent, PhotoUploadComponent],
      imports: [FormsModule, HttpModule],
      providers: [{ provide: PeopleService, useValue: peopleServiceStub }]
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
