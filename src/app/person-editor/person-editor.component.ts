import { Component, Input } from '@angular/core';
import { Person } from '../person';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'person-editor',
  templateUrl: './person-editor.component.html',
  styleUrls: ['./person-editor.component.css']
})
export class PersonEditorComponent {

  @Input()
  person: Person;
}
