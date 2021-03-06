import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PersonCardComponent } from './person-card/person-card.component';
import { PersonEditorComponent } from './person-editor/person-editor.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomNgbDateParserFormatter } from './custom-ngbDateParserFormatter';

export function customNgbDateParserFormatter() {
  return new CustomNgbDateParserFormatter('longDate');
}

@NgModule({
  declarations: [
    AppComponent,
    PersonCardComponent,
    PersonEditorComponent,
    PhotoUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot()
  ],
  providers: [{ provide: NgbDateParserFormatter, useFactory: customNgbDateParserFormatter }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }


