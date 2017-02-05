import { Injectable } from '@angular/core';
import { Person } from './person';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Jsonp, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class PeopleService {
  private _url = 'http://localhost:17533/api/person/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getPeople(pageNumber: number, searchString: string) {
    const search = new URLSearchParams();
    if (pageNumber) { search.set('page', pageNumber.toString()); }
    if (searchString) { search.set('search', searchString.toString()); }
    console.log(pageNumber + ' ' + search);
    return this.http.get(this._url, { search })
      .map(response => <Person[]>response.json());
  }

  addPerson(person: Person): Observable<Person> {
    console.log('Adding new ' + person.FirstName + ' ' + person.LastName);
    return this.http.post(this._url, person, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  savePerson(person: Person): Observable<Person> {
    console.log('Saving new ' + person.FirstName + ' ' + person.LastName);
    return this.http.put(this._url + person.Id, person, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deletePerson(person: Person) {
    console.log('Deleting ' + person.FirstName + ' ' + person.LastName);
    return this.http.delete(this._url + person.Id, this.options)
      .subscribe();
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
