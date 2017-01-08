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
  public pageNumber: number = 1;
  public searchString: string = "";
  public atEnd: boolean = false;
  public loading: boolean = false;
  public selectedPerson: Person = null;

  constructor(private _peopleService: PeopleService, lc: NgZone) {
    this.loading = false;
    this.getPeople();


    // infinite scrolling
    window.onscroll = () => {
      let windowHeight = "innerHeight" in window ? window.innerHeight
        : document.documentElement.offsetHeight;
      let body = document.body, html = document.documentElement;
      let docHeight = Math.max(body.scrollHeight,
        body.offsetHeight, html.clientHeight,
        html.scrollHeight, html.offsetHeight);
      let windowBottom = windowHeight + window.pageYOffset;

      // if at bottom of page and more entries to load, then load more entries
      if (windowBottom >= docHeight && this.atEnd == false && this.loading == false) {
        lc.run(() => {
          this.getPeople();
        });
      }
    };
  }

  onClose(person: Person): void {
    this.pageNumber = 1;
    this.people = [];
    console.log("Saved " + person.FirstName + " " + person.LastName + ".  Refreshing search");
    this.getPeople();
  }


  onSelect(person: Person) {
    this.selectedPerson = person;
    console.log("Selected " + person.FirstName + " " + person.LastName);
  }

  onAdd() {
    this.selectedPerson = new Person();
    console.log("Adding new person.");
  }

  onDelete(person: Person) {
    console.log("Deleting " + person.FirstName + " " + person.LastName);
    this._peopleService.deletePerson(person);
    var index = this.people.indexOf(person);
    this.people.splice(index, 1);
  }

  private onSearch() {
    this.pageNumber = 1;
    this.people = [];
    console.log("Searching for " + this.searchString);
    this.getPeople();
  }

  private onClearSearch() {
    this.pageNumber = 1;
    this.people = [];
    this.searchString = "";
    console.log("Searching for " + this.searchString);
    this.getPeople();
  }

  // local method which calls people service, manages pagination
  private getPeople() {
    this.loading = true;
    this._peopleService.getPeople(this.pageNumber, this.searchString)
      .subscribe(
      people => {
        this.loading = false;
        if (people.length == 0) {
          console.log('no more entries');
          this.atEnd == true;
        } else {
          this.pageNumber = this.pageNumber + 1;
          this.people.push(...people);
        }
      },
      error => alert(error));
  }
}
