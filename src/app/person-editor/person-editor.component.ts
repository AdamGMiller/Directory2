import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person';
import { PeopleService } from '../people.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css'],
  providers: [PeopleService]
})
export class PersonEditorComponent implements OnInit, OnChanges {

  model: NgbDateStruct;
  dateString: string;
  minDate: NgbDateStruct;
  maxDate: NgbDateStruct;

  @Input() person: Person;
  @Output() onClose = new EventEmitter();

  constructor(private _peopleService: PeopleService, private ngbDateParserFormatter: NgbDateParserFormatter) {
  }

  ngOnInit() {
    this.model = this.setDefaultDate();
    this.onSelectDate(this.model);
    this.minDate = this.ngbDateParserFormatter.parse('1910-1-1');
    this.maxDate = this.setDefaultDate();
  }

  ngOnChanges() {
    // rebind the datepicker when the underlying data changes
    this.model = this.setDefaultDate();
  }

  onSubmit() {
    if (this.person.Id) {
      console.log('Saving ' + this.person.FirstName + ' ' + this.person.LastName);

      this._peopleService.savePerson(this.person)
        .subscribe(
        person => this.onClose.emit(person)
        // error =>  this.errorMessage = <any>error
        );
    } else {
      console.log('Adding ' + this.person.FirstName + ' ' + this.person.LastName);
      // default photo
      this.person.ActiveFlag = true;
      this.person.Photo = 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';

      this._peopleService.addPerson(this.person)
        .subscribe(
        person => this.onClose.emit(person)
        // error =>  this.errorMessage = <any>error
        );
    }
  }

  onSelectDate(date: NgbDateStruct) {
    if (date != null) {
      // needed for first time around due to ngModel not binding during ngOnInit call. Seems like a bug in ng2.
      this.model = date;
      this.dateString = this.ngbDateParserFormatter.format(date);

      const d = new Date(Date.UTC(date.year, date.month - 1, date.day));
      d.setDate(d.getDate() + 1);
      this.person.Dob = d;
      this.person.Age = this.calculateAge(d);
    }
  }

  setDefaultDate(): NgbDateStruct {
    let startDate = new Date();
    if (this.person.Dob) {
      startDate = new Date(this.person.Dob);
      const startYear = startDate.getFullYear().toString();
      const startMonth = startDate.getMonth() + 1;
      const startDay = startDate.getDate();

      return this.ngbDateParserFormatter.parse(startYear + '-' + startMonth.toString() + '-' + startDay);
    }
    return null;
  }

  calculateAge(birthday) { // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
