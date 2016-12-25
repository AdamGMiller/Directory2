import { Component } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PeopleService]
})
export class AppComponent {
  title = 'People Searcher';

  public people: Person[];

  constructor(private _peopleService: PeopleService) {
    this._peopleService.getPeople()
      .subscribe(
      people => {
        console.log(people);
        this.people = people;
      },
      error => alert(error));
  }
}
