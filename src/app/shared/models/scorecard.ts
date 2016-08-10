import { Score } from './score';
import { Property } from './property';
import { Wishlist } from './wishlist';

export class Scorecard {
    _id: string; 
    property: Property;
	wishlist: Wishlist;
	owner: string;
	scores: Score[];
    active: boolean; 
    total: string; //This is purely a frontend property 
    
    constructor(_id: string,
                property: Property,
                wishlist: Wishlist,
	            owner: string,
	            scores: Score[],
                active: boolean){
        this._id = _id; 
        this.property = property;
        this.wishlist = wishlist;
        this.owner = owner;
        this.scores = scores;
        this.active = active; 
    }
}