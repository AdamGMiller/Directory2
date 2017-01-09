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

      this._peopleService.addPerson(this.person)
        .subscribe(
        person => this.onClose.emit(person)
        //error =>  this.errorMessage = <any>error
        );
    }
  }

  onBlurBirthday(dob: any): void {
    let e = dob.split('-');
    let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
    d.setDate(d.getDate() + 1);
    this.person.Dob = d;
    this.person.Age = this.calculateAge(d);
  }

  calculateAge(birthday) { // birthday is a date
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
