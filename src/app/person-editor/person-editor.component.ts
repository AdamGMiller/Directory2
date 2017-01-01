import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';

@Component({
  selector: 'person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css'],
  providers: [PeopleService]
})
export class PersonEditorComponent {

  @Input() person: Person;
  @Output() onClose = new EventEmitter();

  constructor(private _peopleService: PeopleService) {
  }

  onSubmit() {
    if (this.person.Id) {
      console.log("Saving " + this.person.FirstName + " " + this.person.LastName);
      //console.log(this._peopleService.savePerson(this.person));

      this._peopleService.savePerson(this.person)
        .subscribe(
        person => this.onClose.emit(person)
        //error =>  this.errorMessage = <any>error
        );
    } else {
      console.log("Adding " + this.person.FirstName + " " + this.person.LastName);
      // default photo
      this.person.ActiveFlag = true;
      this.person.Photo = "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
      //console.log(this._peopleService.addPerson(this.person));

      this._peopleService.addPerson(this.person)
        .subscribe(
        person => this.onClose.emit(person)
        //error =>  this.errorMessage = <any>error
        );

    }
  }
}
