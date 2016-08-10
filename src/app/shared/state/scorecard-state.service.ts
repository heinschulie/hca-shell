import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from 'immutable';
import 'rxjs/add/operator/map';
import { ScorecardService } from '../services/scorecard.service'; 
import { Scorecard } from '../models/scorecard';
import { Score } from '../models/score';

@Injectable()
export class ScorecardStateService {

  private _selectedScorecard: Scorecard; 
  private _scorecard$: BehaviorSubject<List<Scorecard>> = new BehaviorSubject(List([]));
  public scorecard$: Observable<List<Scorecard>> = this._scorecard$.asObservable();
  
  //Properties 

  // getSelectedScorecard (): Observable<Scorecard> {
  //   //return this._selectedScorecard;
  //   return this.scorecardService.getScorecardById(this._selectedScorecard._id) // TODO: THIS SHOULD BE PER USER 
  //           .map(res => this.extractData(res))
  //           .catch(this.handleError);  
  // }
  
  setSelectedScorecard (selectedScorecard: Scorecard): void {
    this._selectedScorecard = selectedScorecard; 
  }

	constructor( private scorecardService : ScorecardService ) { 
    this.loadInitialData();
  }

  scorecardSetup( scorecardArray : Scorecard[] ) : void {
      scorecardArray.forEach( scorecard => {
          // Determine relevance with current wishlist. 
          // scorecard.scores = anatomyArray.filter( potentialchild => {
          //     return potentialchild.parent === potentialparent._id; 
          // })
          this.calculateTotal(scorecard); 
      })
  }

  calculateTotal (scorecard : Scorecard) : void {
    let total = 0; 
    scorecard.scores.forEach(score => total = total + score.score);
    total = (total / scorecard.scores.length );
    scorecard.total = total.toFixed(1);   
  }

  loadInitialData() {
        this.scorecardService.getScorecards() // TODO: THIS SHOULD BE PER USER 
            .subscribe(
                res => {
                    let allScorecards = (<Object[]>res.json().data).map((component: any) =>
                        new Scorecard(
                          component._id, 
                          component.property,
                          component.wishlist,
                          component.owner,
                          component.scores,
                          component.active
                        ));  
                    this.scorecardSetup(allScorecards);       
                    this._scorecard$.next(List(allScorecards));
                },
                err => this.handleError(err)
            );
    }

  // getScorecards (): Observable<Scorecard[]> {
  //   return this.http.get(this._url + 'scorecards')
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }
  getScorecardById (scorecardId : string): Observable<Scorecard> {
    let scorecard;
    this.scorecard$.forEach(scarray => {
        scorecard = scarray.find(sc => {
        return sc._id === scorecardId; 
      })
    });
    if(!scorecard)
      return this.scorecardService.getScorecardById(scorecardId)
                      .map(this.extractData)
                      .catch(this.handleError);
    return Observable.of(scorecard);
  }

  // Score is included here as an obvious child. And why deny the obvious child? 
  // getScores (): Observable<Score[]> {
  //   return this.http.get(this._url + 'scores')
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }
  
  // getScore ( scoreId : string ): Observable<Score> {
  //   return this.http.get(this._url + 'scores/' + scoreId)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }
  
  private extractData(res: Response) {
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
  
}
