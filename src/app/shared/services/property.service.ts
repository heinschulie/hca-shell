import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommonService } from './common.service'; 
import { Property } from '../models/property';

@Injectable()
export class PropertyService {
  
  private _url : string;   // URL to web api
  
	constructor( private http: Http, private _common: CommonService ) { 
    this._url = this._common.getUrl();
  }

  getPropertyListByAddress(partialAddress : string): Observable<Response> {
    return this.http.get(this._url + 'properties/getByPartialAddress/' + partialAddress);
  }

}
