import { Component } from '@angular/core';
import { PeopleService } from './people.service';
import { Person } from './person';
import { NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [PeopleService]
})
export class AppComponent {
  title = 'People Searcher';

  public people: Person[];

  constructor(private _peopleService: PeopleService, lc: NgZone) {
    this._peopleService.getPeople()
      .subscribe(
      people => {
        console.log(people);
        this.people = people;
      },
      error => alert(error));

    window.onscroll = () => {
      let status = "not reached";
      let windowHeight = "innerHeight" in window ? window.innerHeight
        : document.documentElement.offsetHeight;
      let body = document.body, html = document.documentElement;
      let docHeight = Math.max(body.scrollHeight,
        body.offsetHeight, html.clientHeight,
        html.scrollHeight, html.offsetHeight);
      let windowBottom = windowHeight + window.pageYOffset;

      console.log(windowBottom + " " + docHeight);
      if (windowBottom >= docHeight) {
        console.log('bottom reached');
        lc.run(() => {
          this._peopleService.getPeople()
            .subscribe(
            people => {
              console.log(people);
              this.people.push(...people);
            },
            error => alert(error));
        });
      }
    };
  }
}
