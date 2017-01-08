import { Component, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { Person } from '../person';
import { DomSanitizer } from '@angular/platform-browser'
import { PeopleService } from '../people.service';

@Component({
  selector: 'photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})

export class PhotoUploadComponent {
  public file_src: string[] = [];
  constructor(private changeDetectorRef: ChangeDetectorRef, private _peopleService: PeopleService, private sanitizer: DomSanitizer) { }

  @Input() person: Person;
  @Output() onClose = new EventEmitter();

  // This is called when the user selects new files from the upload button
  fileChange(input) {
    this.readFile(input.files[0]);
  }

  getFile(file, reader, callback) {
    // Set a callback funtion to fire after the file is fully loaded
    reader.onload = () => {
      // callback with the results
      callback(reader.result);
    }

    // Read the file
    reader.readAsDataURL(file);
  }

  readFile(file) {
    // Create the file reader
    let reader = new FileReader();

    // Start reading this file
    this.getFile(file, reader, (result) => {
      // Create an img element and add the image file data to it
      var img = document.createElement("img");
      img.src = result;

      // Send this img to the resize function (and wait for callback)
      this.resize(img, 250, 250, (resized_jpeg, before, after) => {

        // Set person photo
        this.file_src = resized_jpeg;
        var imageData = resized_jpeg.replace('data:image/jpeg;base64,', '')
        this.person.Photo = imageData;

        console.log("Saving " + this.person.FirstName + " " + this.person.LastName);
        //console.log(this._peopleService.savePerson(this.person));

        this._peopleService.savePerson(this.person)
          .subscribe(
          person => this.onClose.emit(person)
          //error =>  this.errorMessage = <any>error
          );

        this.changeDetectorRef.detectChanges();
      });
    });
  }

  resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
    // This will wait until the img is loaded before calling this function
    return img.onload = () => {
      console.log("img loaded");
      // Get the images current width and height
      var width = img.width;
      var height = img.height;

      // Set the WxH to fit the Max values (but maintain proportions)
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      // create a canvas object
      var canvas = document.createElement("canvas");

      // Set the canvas to the new calculated dimensions
      canvas.width = width;
      canvas.height = height;
      var ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0, width, height);

      // Get this encoded as a jpeg
      // IMPORTANT: 'jpeg' NOT 'jpg'
      var dataUrl = canvas.toDataURL('image/jpeg');

      // callback with the results
      callback(dataUrl, img.src.length, dataUrl.length);
    };
  }
}
