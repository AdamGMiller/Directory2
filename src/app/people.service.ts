import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http'
import { Jsonp, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PeopleService {
  private _url = 'http://localhost:17533/api/person/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  constructor(private http: Http) { }

  getPeople(pageNumber: number, searchString: string) {
    var search = new URLSearchParams();
    if (pageNumber) search.set('page', pageNumber.toString());
    if (searchString) search.set('search', searchString.toString());
    console.log(pageNumber + ' ' + search);
    return this.http.get(this._url, { search })
      .map(responce => <Person[]>responce.json());
  }

  savePerson(person: Person) {
    console.log("Saving " + person.FirstName + " " + person.LastName);
    return this.http.put(this._url + person.Id, JSON.stringify(person), this.options)
      .map(response => response.json())
      .subscribe();
  }

  addPerson(person: Person) {
    person.ActiveFlag = true;
    console.log("Adding " + person.FirstName + " " + person.LastName);
    return this.http.post(this._url, JSON.stringify(person), this.options).map((res: Response) => res.json())
      .subscribe();
  }

  deletePerson(person: Person) {
    console.log("Deleting " + person.FirstName + " " + person.LastName);
    return this.http.delete(this._url + person.Id, this.options)
      .subscribe();
  }
}
