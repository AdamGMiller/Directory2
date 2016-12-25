import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PeopleService {
  private _url = 'http://localhost:17533/api/person/';

  constructor(private http: Http) { }

  getPeople() {
    return this.http.get(this._url)
      .map(responce => <Person[]>responce.json());
  }

}
