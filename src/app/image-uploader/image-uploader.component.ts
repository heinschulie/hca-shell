import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input/input'
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

import { CommonService } from '../shared'; 
import { MediaStateService } from '../shared'; 
import { MediaService } from '../shared'; 

@Component({
  moduleId: module.id,
  selector: 'app-image-uploader',
  templateUrl: 'image-uploader.component.html',
  styleUrls: ['image-uploader.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_ICON_DIRECTIVES
  ]
})
export class ImageUploaderComponent implements OnInit {

  file : File;
  dataurl : string; 
  //imageurl: string;
  @Input('form') 
    form: string; 
  @Input('selfupload') 
    autonomousUpload: boolean; 
  @Output()
  fileAvailable = new EventEmitter();
  @Output()
  imageUrlChange = new EventEmitter();
  
  constructor(private common : CommonService, 
              private mediaStateService : MediaStateService,
              private mediaService : MediaService) {}

  ngOnInit() {
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.mediaStateService.currentFile = files[0]; 
    this.file = files[0];
    console.log(files);

    if(this.form === 'card')
      this.readAsDataURL(); 
    else
      this.fileAvailable.emit(true); 
  }

  createSignature() : void {
    // this.mediaService.createSignature().subscribe((result) => {
    //   let body = result.json(); 
    //   if (body) {
    //     console.log("Signature success I think: " + body); 
    //     this.uploadImage(body); 
    //   }
    //   else{
    //     console.log("Image failed to upload"); 
    //   }
    // })
  }

  uploadImage( signature : any ) : void {
    // this.imageService.uploadImage(this.dataurl, signature).subscribe((result) => {
    this.mediaService.uploadImage(this.file, signature).subscribe((result) => {
      if (result) {
        let body = result.json();
        console.log("Image success I think: " + result); 
        //this.imageurl = body.secure_url; 
        this.imageUrlChange.emit(body.secure_url);
      }
      else{
        console.log("Image failed to upload"); 
      }
    });
  }

  private extractData(res: any) {
    let body = res.json();
    return body.data || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  readAsDataURL() { 
      let that = this; 
      var reader = new FileReader();
      reader.onload = function(event : any) {
        // The file's text will be printed here
        console.log(event.target);
        that.imageUrlChange.emit(event.target.result);     
      };
      reader.readAsDataURL(this.file);
  };


}
