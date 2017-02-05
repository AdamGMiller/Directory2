import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person';
import { NgZone } from '@angular/core';
import { PersonCardComponent } from './person-card/person-card.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PeopleService]
})
export class AppComponent {
  title = 'Directory Search';

  public date = new Date();

  public people: Person[] = [];
  public pageNumber = 1;
  public searchString = '';
  public atEnd = false;
  public loading = false;
  public selectedPerson: Person = null;

  constructor(private _peopleService: PeopleService, lc: NgZone) {
    this.loading = false;
    this.getPeople();


    // infinite scrolling
    window.onscroll = () => {
      const windowHeight = 'innerHeight' in window ? window.innerHeight
        : document.documentElement.offsetHeight;
      const body = document.body, html = document.documentElement;
      const docHeight = Math.max(body.scrollHeight,
        body.offsetHeight, html.clientHeight,
        html.scrollHeight, html.offsetHeight);
      const windowBottom = windowHeight + window.pageYOffset;

      // if at bottom of page and more entries to load, then load more entries
      if (windowBottom >= docHeight && this.atEnd === false && this.loading === false) {
        lc.run(() => {
          this.getPeople();
        });
      }
    };
  }

  onClose(person: Person): void {
    this.pageNumber = 1;
    this.people = [];
    console.log('Saved ' + person.FirstName + ' ' + person.LastName + '.  Refreshing search');
    this.getPeople();
  }


  onSelect(person: Person) {
    this.selectedPerson = person;
    console.log('Selected ' + person.FirstName + ' ' + person.LastName);
  }

  onAdd() {
    this.selectedPerson = new Person();
    console.log('Adding new person.');
  }

  onDelete(person: Person) {
    console.log('Deleting ' + person.FirstName + ' ' + person.LastName);
    this._peopleService.deletePerson(person);
    const index = this.people.indexOf(person);
    this.people.splice(index, 1);
  }

  public onSearch() {
    this.pageNumber = 1;
    this.people = [];
    console.log('Searching for ' + this.searchString);
    this.getPeople();
  }

  public onClearSearch() {
    this.pageNumber = 1;
    this.people = [];
    this.searchString = '';
    console.log('Searching for ' + this.searchString);
    this.getPeople();
  }

  // local method which calls people service, manages pagination
  private getPeople() {
    this.loading = true;
    this._peopleService.getPeople(this.pageNumber, this.searchString)
      .subscribe(
      people => {
        this.loading = false;
        if (people.length === 0) {
          this.atEnd = true;
          console.log('no more entries');
        } else {
          this.pageNumber = this.pageNumber + 1;
          this.people.push(...people);
        }
      },
      error => alert(error));
  }
}
