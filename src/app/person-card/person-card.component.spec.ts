/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonCardComponent } from './person-card.component';
import { PhotoUploadComponent } from '../photo-upload/photo-upload.component';
import { Person } from '../person';
import { FormsModule } from '@angular/forms';
import { PeopleService } from '../people.service';
import { Http, Response, HttpModule } from '@angular/http';

describe('PersonCardComponent', () => {
  let comp: PersonCardComponent;
  let fixture: ComponentFixture<PersonCardComponent>;
  let person: Person = {
    Id: 1, FirstName: 'Adam', LastName: 'Miller', Photo: '0x', ActiveFlag: true,
    ConcurrencyToken: '', Dob: new Date(), Age: 1, Interests: 'None'
  };
  let firstNameEl;

  let peopleServiceStub = {
    deletePerson(p: Person) { }
  };

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PersonCardComponent, PhotoUploadComponent],
      imports: [FormsModule, HttpModule],
      providers: [{ provide: PeopleService, useValue: peopleServiceStub }]
    })
      .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCardComponent);
    comp = fixture.componentInstance;
    firstNameEl = fixture.debugElement.query(By.css('#firstName')); // find hero element

    comp.person = person;
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should display name', () => {
    const expectedPipedName = person.FirstName + ' ' + person.LastName;
    expect(firstNameEl.nativeElement.textContent).toContain(expectedPipedName);
  });

  it('should return ...', inject([PeopleService], service => {
    service.deletePerson();
  }));

  it('should do something on delete click', () => {
    spyOn(comp, 'deletePerson');
    // first round of change detection
    fixture.detectChanges();

    // get ahold of the input
    let input = fixture.debugElement.query(By.css('#deletePerson'));
    let inputElement = input.nativeElement;

    // set input value
    inputElement.dispatchEvent(new Event('click'));

    expect(comp.deletePerson).toHaveBeenCalled();
  });

});
