/* tslint:disable:no-unused-variable */

import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { Person } from './person';
import { PersonEditorComponent } from './person-editor/person-editor.component';
import { PersonCardComponent } from './person-card/person-card.component';
import { Http, Response, HttpModule } from '@angular/http'

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let person: Person = { Id: 1, FirstName: "Adam", LastName: "Miller", Photo: "0x", ActiveFlag: true, ConcurrencyToken: "", Dob: new Date(), Age: 1, Interests: "None" };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, PersonEditorComponent, PersonCardComponent],
      imports: [FormsModule, HttpModule]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      })
  }));

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Directory Search'`, async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Directory Search');
  }));
  /*  
    it('should render title in a h1 tag', async(() => {
      let fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('app works!');
    }));
    */
});
