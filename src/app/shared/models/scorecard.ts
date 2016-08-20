import { Score } from './score';
import { Property } from './property';
import { Wishlist } from './wishlist';
import { Media } from './media';

export class Scorecard {
    _id: string; 
    property: Property;
	wishlist: Wishlist;
	owner: string;
	scores: Score[];
    featuredimage: Media; 
    media: Media[];
    active: boolean; 
    total: string; //This is purely a frontend property 
    
    constructor(_id: string,
                property: Property,
                wishlist: Wishlist,
	            owner: string,
	            scores: Score[],
                featuredimage: Media,
                media: Media[],
                active: boolean){
        this._id = _id; 
        this.property = property;
        this.wishlist = wishlist;
        this.owner = owner;
        this.scores = scores;
        this.featuredimage = featuredimage;
        this.media = media;
        this.active = active; 
    }

    // If constructor args are unknown
    public static returnNewEmptyInstance() : Scorecard {
        let newMedia = Media.returnNewEmptyInstance(); 
        let newProperty = Property.returnNewEmptyInstance(); 
        let newWishlist = Wishlist.returnNewEmptyInstance(); 
        let newScorecard = new Scorecard('', newProperty, newWishlist, '', [], newMedia, [], false); 
        return newScorecard; 
    }
}
