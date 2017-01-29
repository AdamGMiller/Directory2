import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person';
import { PhotoUploadComponent } from '../photo-upload/photo-upload.component';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent {

  @Input() person: Person;
  @Output() onSelect: EventEmitter<Person> = new EventEmitter<Person>();
  @Output() onDelete: EventEmitter<Person> = new EventEmitter<Person>();

  selectPerson() {
    console.log('Selecting person ' + this.person.FirstName + ' ' + this.person.LastName);
    this.onSelect.emit(this.person);
  }

  deletePerson() {
    console.log('Deleting person ' + this.person.FirstName + ' ' + this.person.LastName);
    this.onDelete.emit(this.person);
  }
}
