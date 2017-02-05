/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PeopleService } from './people.service';
import { Person } from './person';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Jsonp, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Http, BaseRequestOptions, Response, HttpModule, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

describe('PersonService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PeopleService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => {
            return new Http(backend, options);
          },
          deps: [MockBackend, BaseRequestOptions],
        }
      ],
      imports: [
        HttpModule
      ]
    });

    TestBed.compileComponents();
  }));

  it('returns a list of people', async(inject([MockBackend, PeopleService], (backend: MockBackend, service) => {
    const people = [
      {
        Id: 1, FirstName: 'Adam', LastName: 'Miller', Photo: '0x', ActiveFlag: true,
        ConcurrencyToken: '', Dob: new Date(), Age: 1, Interests: 'None'
      },
      {
        Id: 2, FirstName: 'Sally', LastName: 'Smith', Photo: '0x', ActiveFlag: true,
        ConcurrencyToken: '', Dob: new Date(), Age: 1, Interests: 'None'
      }
    ];
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: JSON.stringify(people)
          })));
      });

    service.getPeople()
      .subscribe(p => {
        expect(p.length).toBeDefined();
        expect(p.length).toBe(2);
      });
  })));


});
