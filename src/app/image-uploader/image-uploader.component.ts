import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommonService } from '../shared'; 
import { ImageService } from '../shared'; 

@Component({
  moduleId: module.id,
  selector: 'app-image-uploader',
  templateUrl: 'image-uploader.component.html',
  styleUrls: ['image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  file : File;
  dataurl : string; 
  //imageurl: string;

  @Output()
  imageUrlChange = new EventEmitter();
  
  constructor(private common : CommonService, private imageService : ImageService) {}

  ngOnInit() {
  }

  onChange(event) {
    var files = event.srcElement.files;
    this.file = files[0]; 
    this.readAsDataURL(); 
    console.log(files);
  }

  createSignature() : void {
    this.imageService.createSignature().subscribe((result) => {
      let body = result.json(); 
      if (body) {
        console.log("Signature success I think: " + body); 
        this.uploadImage(body); 
      }
      else{
        console.log("Image failed to upload"); 
      }
    })
  }

  uploadImage( signature : any ) : void {
    // this.imageService.uploadImage(this.dataurl, signature).subscribe((result) => {
    this.imageService.uploadImage(this.file, signature).subscribe((result) => {
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
        //that.imageurl = event.target.result;
        that.imageUrlChange.emit(event.target.result);  
      };
      reader.readAsDataURL(this.file);
  };


}
