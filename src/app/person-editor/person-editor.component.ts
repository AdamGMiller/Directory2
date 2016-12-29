import { Component, Input } from '@angular/core';
import { Person } from '../person';


@Component({
  selector: 'person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent {

  @Input()
  person: Person;
}
