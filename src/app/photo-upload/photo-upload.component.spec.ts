/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PhotoUploadComponent } from './photo-upload.component';
import { Person } from '../person';
import { DomSanitizer } from '@angular/platform-browser'
import { PeopleService } from '../people.service';
import { Http, Response, HttpModule } from '@angular/http'
import { FormsModule } from '@angular/forms';

describe('PhotoUploadComponent', () => {
  let component: PhotoUploadComponent;
  let fixture: ComponentFixture<PhotoUploadComponent>;
  let person: Person = { Id: 1, FirstName: "Adam", LastName: "Miller", Photo: "0x", ActiveFlag: true, ConcurrencyToken: "", Dob: new Date(), Age: 1, Interests: "None" };

  var peopleServiceStub = {
    savePerson(person: Person) { }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoUploadComponent],
      imports: [FormsModule, HttpModule],
      providers: [{ provide: PeopleService, useValue: peopleServiceStub }]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PhotoUploadComponent);
        component = fixture.componentInstance;
      })
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
