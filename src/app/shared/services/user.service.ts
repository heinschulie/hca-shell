import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommonService } from './common.service'; //Give full pathname for classes that are used in constructors 
import { User } from '../'; 

@Injectable()
export class UserService {

  constructor(private http: Http, private common : CommonService) { }

  login(username, password) : Observable<Response> {
    
    let loginUrl = this.common.getLoginUrl();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    console.log(username); 
    return this.http
      .post(
        loginUrl, 
        JSON.stringify({ username, password }), 
        { headers }
      );
  }

  createUser(user : User) : Observable<Response> {
    let url = this.common.getUrl() + 'users';
    let body = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        url,  
        body, 
        { headers }
      );
  }

  updateUser(user : User) : Observable<Response> {
    let url = this.common.getUrl() + 'users';
    let body = JSON.stringify(user);
    let headers = new Headers();
    let authToken = localStorage.getItem('hca_auth_token');
    headers.append('Authorization', `${authToken}`);
    headers.append('Content-Type', 'application/json');
    return this.http
      .put(
        url,  
        body, 
        { headers }
      );
  }

  testRole() {
    let url = this.common.getUrl() + 'admin';
    let headers = new Headers();
    let authToken = localStorage.getItem('hca_auth_token');
    headers.append('Authorization', `${authToken}`);
    headers.append('Content-Type', 'application/json');

    return this.http
      .get(
        url, 
        { headers }
      );
  }

  testAuth() {
    let url = this.common.getUrl() + 'users';
    let headers = new Headers();
    let authToken = localStorage.getItem('hca_auth_token');
    headers.append('Authorization', `${authToken}`);
    headers.append('Content-Type', 'application/json');

    return this.http
      .get(
        url, 
        { headers }
      );
  }

  getUserByToken() : Observable<Response>  {
    let url = this.common.getUrl() + 'getUserByToken';
    let headers = new Headers();
    let authToken = localStorage.getItem('hca_auth_token');
    headers.append('Authorization', `${authToken}`);
    headers.append('Content-Type', 'application/json');

    return this.http
      .get(
        url, 
        { headers }
      );
  }
}