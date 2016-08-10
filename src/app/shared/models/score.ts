//import { Priority } from './priority';

export class Score {
    _id: string; 
    score: number;
    priority: string; 
	scorecard: string;
	wishlist: string;
    
    constructor(_id: string,
                score: number,
                scorecard: string,
	            weight: number,
	            wishlist: string,
	            priority: string){
        this._id = _id; 
        this.score = score;
        this.scorecard = scorecard;
        this.priority = priority;
        this.wishlist = wishlist;
    }
}
