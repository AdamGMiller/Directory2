import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent {

  @Input() person: Person;
  @Output() onSelect: EventEmitter<Person> = new EventEmitter<Person>();

  selectPerson() {
    console.log("Emitting person " + this.person.FirstName);
    this.onSelect.emit(this.person)
  }
}
