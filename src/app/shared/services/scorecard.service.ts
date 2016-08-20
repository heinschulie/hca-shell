import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommonService } from './common.service'; 
import { Scorecard } from '../models/scorecard';
import { Score } from '../models/score';
import { Media } from '../models/media';

@Injectable()
export class ScorecardService {

  private _url : string;   // URL to web api
  private _selectedScorecard: Scorecard; 
  
	constructor( private http: Http, private _common: CommonService ) { 
    this._url = this._common.getUrl();
  }

  getScorecards (): Observable<Response> {
    // return this.http.get(this._url + 'scorecards');
    let url = this._url + 'scorecards';
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
  
  getScorecardById ( scorecardId : string ): Observable<Response> {
    let url = this._url + 'scorecards/' + scorecardId; //How do I handle singles?
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

  // Score is included here as an obvious child. And why deny the obvious child? 
  getScores (): Observable<Response> {
    return this.http.get(this._url + 'scores');
  }
  
  getScore ( scoreId : string ): Observable<Response> {
    return this.http.get(this._url + 'scores/' + scoreId);
  }

  createScorecard(scorecard : Scorecard) : Observable<Response> {
    let url = this._url + 'scorecards';
    let body = JSON.stringify(scorecard);
    let headers = new Headers();
    let authToken = localStorage.getItem('hca_auth_token');
    headers.append('Authorization', `${authToken}`);
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        url,  
        body, 
        { headers }
      );
  }

  updateScorecard(scorecard : Scorecard) : Observable<Response> {
    let url = this._url + 'scorecards';
    let body = JSON.stringify(scorecard);
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
  

  addMediaToScorecard(scorecard : Scorecard, media : Media) : Observable<Response> {
    let url = this._url + 'addmediatoscorecard';
    // Marcellus Mongoose don't like to take Ids from anybody else but mrs mongoose 
    let newMedia = {
          url: media.url,
          type: media.type,
          date: media.date,
          orientation: media.orientation,
          stereo: media.stereo,
          tags: media.tags
        };
    let data = { scorecard : scorecard, media : newMedia }; 
    let body = JSON.stringify(data);
    let headers = new Headers();
    let authToken = localStorage.getItem('hca_auth_token');
    headers.append('Authorization', `${authToken}`);
    headers.append('Content-Type', 'application/json');
    return this.http
      .post(
        url,  
        body, 
        { headers }
      );
  }

  updateScore( score : any ): Observable<Response> {
    let url = this._url + 'scores';
    let body = JSON.stringify(score);
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
}

