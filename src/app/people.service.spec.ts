/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async, inject } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { Http, Response } from '@angular/http'

describe('PeopleService', () => {
  beforeEach(() => {

    var peopleServiceStub = {
      isLoggedIn: true,
      user: { name: 'Test User' }
    };

    TestBed.configureTestingModule({
      //providers: [PeopleService]
      providers: [{ provide: PeopleService, useValue: peopleServiceStub }]
    });
    //peopleServiceStub = fixture.debugElement.injector.get(PeopleService);
  });

  it('should ...', inject([PeopleService], (service: PeopleService) => {
    expect(service).toBeTruthy();
  }));
});
