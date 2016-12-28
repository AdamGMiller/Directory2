import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http'
import { Jsonp, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PeopleService {
  private _url = 'http://localhost:17533/api/person/';

  constructor(private http: Http) { }

  getPeople(pageNumber: number) {
    var search = new URLSearchParams();
    if (pageNumber) search.set('page', pageNumber.toString());
    console.log(pageNumber + ' ' + search);
    return this.http.get(this._url, { search })
      .map(responce => <Person[]>responce.json());
  }

}
