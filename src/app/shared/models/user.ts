
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

        let newScorecards = Scorecard.newArray(scorecards); 
        
        this._id = _id; 
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.image = image; 
        this.wishlist = wishlist;
        this.roles = roles;
        this.scorecards = newScorecards;
        this.isAuth = isAuth; 
    }

      // If constructor args are unknown
    public static returnNewEmptyInstance() : User {
        // let newMedia = Media.returnNewEmptyInstance(); 
        let newWishlist = Wishlist.returnNewEmptyInstance(); 
        let newUser = new User('', '', '', '', '', newWishlist, [], [], false); 
        return newUser; 
    }

    public static newInstance(user : any) : User{
        return new User(
                user._id,
                user.firstName,
                user.lastName,
                user.username,
                user.image,
                user.wishlist,
                user.roles,
                user.scorecards,
                user.isAuth
            );
    }
}