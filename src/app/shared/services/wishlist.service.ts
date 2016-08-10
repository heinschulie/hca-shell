import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { CommonService } from './common.service'; 
import { Wishlist } from '../models/wishlist';
import { Priority } from '../models/priority';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class WishlistService {

  private _url : string;   // URL to web api
  private _selectedWishlist: Wishlist; 
  
	constructor( private http: Http, private _common: CommonService ) { 
    this._url = this._common.getUrl();
  }

  getWishlists (): Observable<Response> {
    return this.http.get(this._url + 'wishlists');
  }
  
  getWishlist ( wishlistId : string ): Observable<Response> {
    return this.http.get(this._url + 'wishlists/' + wishlistId);
  }
  
  // Priority is included here as an obvious child. And why deny the obvious child? 
  getPriorities (): Observable<Response> {
    return this.http.get(this._url + 'priorities');
  }
  
  getPriority ( priorityId : string ): Observable<Response> {
    return this.http.get(this._url + 'priorities/' + priorityId);
  }
}
