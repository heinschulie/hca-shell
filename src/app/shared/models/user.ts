
import { Scorecard } from './scorecard';
import { Wishlist } from './wishlist';

export class User {

     _id: string; 
    firstName: string; 
    lastName: string;
	username: string;
    image: string; 
	wishlist: Wishlist;
	roles: string[];
    scorecards: Scorecard[]; 
    isAuth: boolean; //This is purely a frontend property 
    
    constructor(_id: string,
                firstName: string, 
                lastName: string,
                username: string,
                image: string,
                wishlist: Wishlist,
	            roles: string[],
	            scorecards: Scorecard[],
                isAuth: boolean){
        this._id = _id; 
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.image = image; 
        this.wishlist = wishlist;
        this.roles = roles;
        this.scorecards = scorecards;
        this.isAuth = isAuth; 
    }
}