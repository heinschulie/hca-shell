import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from 'immutable';
import 'rxjs/add/operator/map';
import { MediaService } from '../services/media.service'; 
import { Media } from '../models/media';

@Injectable()
export class MediaStateService {

  private _media$: BehaviorSubject<Media> = new BehaviorSubject(Media.returnNewEmptyInstance());  
  public media$: Observable<Media> = this._media$.asObservable();
  public currentFile : File; 

  constructor(private mediaService : MediaService) {}

  setCurrentMedia(media : Media){
    this._media$.next(media); 
  }

  createSignature(mediaInfo : Object) {
    return this.mediaService.createSignature(mediaInfo)
    .map((result) => {
      let body = result.json(); 
      if (body) {
        console.log("Signature success I think: " + body); 
        // this.uploadImage(body); 
        return body;
      }
      else{
        console.log("Image failed to upload");
        return {};
      }
    })
  }

  uploadImage( file : File, signature : Object) {
    return this.mediaService.uploadImage(file, signature)
    .map((res: Response) => {
        let body = res.json();
        return body;
    })
  }

  updateMedia(newMedia){
    return this.mediaService.updateMedia(newMedia)
    .map((res: Response) =>{
      console.log("Image update success I think: " + res); 
      let body = res.json();
      let updatedBody = body.data;
      let updatedMedia = new Media(
        updatedBody._id,
        updatedBody.url,
        updatedBody.caption,
        updatedBody.owner,
        updatedBody.type,
        updatedBody.date,
        updatedBody.orientation,
        updatedBody.stereo,
        updatedBody.tags); 
      this._media$.next(updatedMedia); 
      return updatedMedia;     
    });
  }


  createMedia(newMedia){
    return this.mediaService.createMedia(newMedia)
    .map((res: Response) =>{
      console.log("Image update success I think: " + res); 
      let body = res.json();
      let createdBody = body.data;
      let createdMedia = new Media(
        createdBody._id,
        createdBody.url,
        createdBody.caption,
        createdBody.owner,
        createdBody.type,
        createdBody.date,
        createdBody.orientation,
        createdBody.stereo,
        createdBody.tags); 
      this._media$.next(createdMedia); 
      return createdMedia;     
    });
  }



  // uploadImage( file : File, mediaInfo : Object) {

  // return this.createSignature(mediaInfo)
  // .flatMap((signature) => {
  //   return this.mediaService.uploadImage(file, signature);   
  // })
  // .flatMap((res: Response) => {
  //     let body = res.json();
  //     //Create a new record in our db for newly uploaded image 
  //     let newMedia = new Media('',body.secure_url,'featured image','','image',new Date(),'landscape',false,[]); 
  //     return this.mediaService.createMedia(newMedia);
  // })
  // .map((res: Response) =>{
  //     //Reflect massive journey on frontend 
  //     console.log("Image success I think: " + res); 
  //     let body = res.json();
  //     let createdMedia = body.data;
  //     let newMedia = new Media(
  //       createdMedia._id,
  //       createdMedia.url,
  //       createdMedia.caption,
  //       createdMedia.owner,
  //       createdMedia.type,
  //       createdMedia.date,
  //       createdMedia.orientation,
  //       createdMedia.stereo,
  //       createdMedia.tags); 
  //     this._media$.next(newMedia); 
  //     return newMedia;     
  //   });
  // }

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

  // readAsDataURL() { 
  //     let that = this; 
  //     var reader = new FileReader();
  //     reader.onload = function(event : any) {
  //       // The file's text will be printed here
  //       console.log(event.target);
  //       //that.imageurl = event.target.result;
  //       that.imageUrlChange.emit(event.target.result);  
  //     };
  //     reader.readAsDataURL(this.file);
  // };


}
