import { Component, Input } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css'],
  providers: [PeopleService]
})
export class PersonEditorComponent {

  @Input()
  person: Person;
  constructor(private _peopleService: PeopleService) {
  }

  onSubmit() {
    if (this.person.Id) {
      console.log("Saving " + this.person.FirstName + " " + this.person.LastName);
      console.log(this._peopleService.savePerson(this.person));
    } else {
      console.log("Adding " + this.person.FirstName + " " + this.person.LastName);
      console.log(this._peopleService.addPerson(this.person));
    }
  }
}
