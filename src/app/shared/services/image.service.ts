import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommonService } from './common.service'; //Give full pathname for classes that are used in constructors 

@Injectable()
export class ImageService {

  private _imageUrl = 'https://api.cloudinary.com/v1_1/heinairport/image/upload';  // URL to web api
  //private _cloud_name = 'your cloud_name';
  private _fd : FormData;

  constructor(private http: Http, private common : CommonService) {}

  createSignature() : Observable<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .get(
        this.common.getUrl() + 'images/getsasurl', 
        { headers }
      );
  }

//  uploadImage(file : string, signature : any) : Observable<Response> { //: Observable<Response>
  uploadImage(file : File, signature : any) : Observable<Response> { //: Observable<Response>
    
    this._fd = new FormData(); 
    //this._fd.append('upload_preset', 'n5parual');
    this._fd.append('file', file);
    this._fd.append('api_key', signature.api_key);
    // this._fd.append('eager', signature.eager);
    // this._fd.append('folder', signature.folder);
    // this._fd.append('public_id', signature.public_id);
    this._fd.append('signature', signature.signature);
    // this._fd.append('tags', signature.tags);
    this._fd.append('timestamp', signature.timestamp);
    //this._fd.append('transformation', signature.transformation);


    // http://stackoverflow.com/questions/12348216/uploading-a-file-with-xmlhttprequest-missing-boundary-in-multipart-form-data

    let headers = new Headers();
    //headers.append('Content-Type', 'undefined');
    //headers.append('X-Requested-With', 'XMLHttpRequest');
    return this.http
      .post(
        this._imageUrl, 
        this._fd
       // { headers }
      );
  }
  
  
}
