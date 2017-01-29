/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonEditorComponent } from './person-editor.component';
import { PhotoUploadComponent } from '../photo-upload/photo-upload.component';
import { FormsModule } from '@angular/forms';
import { Person } from '../person';
import { PeopleService } from '../people.service';
import { Http, Response, HttpModule } from '@angular/http';


describe('PersonEditorComponent', () => {
  let component: PersonEditorComponent;
  let fixture: ComponentFixture<PersonEditorComponent>;
  let person: Person = {
    Id: 1, FirstName: 'Adam', LastName: 'Miller', Photo: '0x', ActiveFlag: true,
    ConcurrencyToken: '', Dob: new Date(), Age: 1, Interests: 'None'
  };

  let peopleServiceStub = {
    addPerson(p: Person) { },
    savePerson(p: Person) { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonEditorComponent, PhotoUploadComponent],
      imports: [FormsModule, HttpModule],
      providers: [{ provide: PeopleService, useValue: peopleServiceStub }]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PersonEditorComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
