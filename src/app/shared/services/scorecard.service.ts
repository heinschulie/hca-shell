import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { CommonService } from './common.service'; 
import { Scorecard } from '../models/scorecard';
import { Score } from '../models/score';

@Injectable()
export class ScorecardService {

  private _url : string;   // URL to web api
  private _selectedScorecard: Scorecard; 
  
	constructor( private http: Http, private _common: CommonService ) { 
    this._url = this._common.getUrl();
  }

  getScorecards (): Observable<Response> {
    return this.http.get(this._url + 'scorecards');
  }
  
  getScorecardById ( scorecardId : string ): Observable<Response> {
    return this.http.get(this._url + 'scorecards/' + scorecardId); //How do I handle singles? 
  }

  // Score is included here as an obvious child. And why deny the obvious child? 
  getScores (): Observable<Response> {
    return this.http.get(this._url + 'scores');
  }
  
  getScore ( scoreId : string ): Observable<Response> {
    return this.http.get(this._url + 'scores/' + scoreId);
  }

}

