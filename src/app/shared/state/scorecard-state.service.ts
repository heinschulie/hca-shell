import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/Rx";
import { List } from 'immutable';
import 'rxjs/add/operator/map';
import { UserStateService } from '../state/user-state.service'; 
import { ScorecardService } from '../services/scorecard.service'; 
import { Scorecard } from '../models/scorecard';
import { Score } from '../models/score';
import { Media } from '../models/media';

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
  
	constructor( private scorecardService : ScorecardService,
               private userState: UserStateService) {
      this.userState.user$.subscribe(
        user => { 
          this.scorecardSetup(user.scorecards);       
          this._scorecard$.next(List(user.scorecards));
        },
        error => console.log(error)); //TODO: ERROR HANDLING! 
  }
  
  // { 
  //   this.loadInitialData();
  // }

  setSelectedScorecard (selectedScorecard: Scorecard): void {
    this._selectedScorecard = selectedScorecard; 
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

  scorecardExists(address : string) : boolean{
    this.scorecard$.forEach(scorecardarray => {
      scorecardarray.forEach(scorecard => {
        if(scorecard.property.address === address)
          return true; 
      });
    })
    return false; 
  }

  updateScore(score) {
    this.scorecardService.updateScore(score)
    .map(res => res.json())
    .subscribe((res) => {
      if (res) {
        let newScore = new Score(
          res.data._id,
          res.data.score,
          res.data.scorecard,
          res.data.priority.weight,
          res.data.wishlist,
          res.data.priority
        ); 
        this.userState.updateUserCollectionsWithNewScore(newScore);  
      }
      else{
        console.log("Priority delete did not succeed! Message: " + res.message); 
      }
      return res.success;
    })
  }

  createScorecard(scorecard : Scorecard) {

    return this.scorecardService.createScorecard(scorecard)
      .map(res => res.json())
      .map((body) => {
        if (body.data._id) {
          console.log('Succesfully created scorecard for ' + body.data.property.address);
          let newsc = new Scorecard(
            body.data._id, 
            body.data.property,
            body.data.wishlist,
            body.data.owner,
            body.data.scores,
            body.data.featuredimage,
            body.data.media,
            body.data.active
          );
          this.userState.addScorecardToUserScorecards(newsc);  
          body.scorecard = newsc; 
          // let data = { scorecard : newsc, signature : body.signature };
          return body;   
        }
        else{
          console.log("Create did not succeed! Message: " + body.reason); 
          return false;
        }
      });
  }

  updateSingleScorecardInUserScorecards(newsc : Scorecard) {
    this.userState.updateExistingScorecardInUserScorecards(newsc);
  }
  
  updateScorecard(scorecard : Scorecard) {

    return this.scorecardService.updateScorecard(scorecard)
      .map(res => res.json())
      .map((res) => {
        if (res.data._id) {
          console.log('Succesfully updated scorecard for ' + res.data.property.address);
          let newsc = new Scorecard(
            res.data._id, 
            res.data.property,
            res.data.wishlist,
            res.data.owner,
            res.data.scores,
            res.data.featuredimage,
            res.data.media,
            res.data.active
          );
          this.updateSingleScorecardInUserScorecards(newsc);  
          return true;   
        }
        else{
          console.log("Create did not succeed! Message: " + res.reason); 
          return false;
        }
      });
  }

  addMediaItemToScorecard(scorecard : Scorecard, media : Media) {
    return this.scorecardService.addMediaToScorecard(scorecard, media)
      .map(res => res.json())
      .map((res) => {
        if (res.data._id) {
          let newMedia = new Media(
            res.data._id, 
            res.data.url,
            res.data.caption,
            res.data.owner,
            res.data.type,
            res.data.date,
            res.data.orientation,
            res.data.stereo,
            res.data.tags
          ); 
          return newMedia;   
        }
        else{
          console.log("Create did not succeed! Message: " + res.reason); 
          return Media.returnNewEmptyInstance();
        }
      });
  }

  // loadInitialData() {
  //       this.scorecardService.getScorecards() // TODO: THIS SHOULD BE PER USER 
  //           .subscribe(
  //               res => {
  //                   let allScorecards = (<Object[]>res.json().data).map((component: any) =>
  //                       new Scorecard(
  //                         component._id, 
  //                         component.property,
  //                         component.wishlist,
  //                         component.owner,
  //                         component.scores,
  //                         component.active
  //                       ));  
  //                   this.scorecardSetup(allScorecards);       
  //                   this._scorecard$.next(List(allScorecards));
  //               },
  //               err => this.handleError(err)
  //           );
  //   }

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

  newScorecardArray (scorecards : any []) : Observable<Scorecard[]> {
    let newscorecards : Scorecard[] = []; 
    scorecards.forEach(sc => {
      let newsc = new Scorecard(
        sc._id, 
        sc.property,
        sc.wishlist,
        sc.owner,
        sc.scores,
        sc.featuredimage,
        sc.media,
        sc.active
      );
      newscorecards.push(newsc);    
    })
    return Observable.of(newscorecards); 
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
