import { Component, Input } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.css']
})
export class PersonCardComponent {

  @Input()
  person: Person;

}
