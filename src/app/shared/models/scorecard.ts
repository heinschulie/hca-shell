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
        
        let newFeaturedImage = Media.newInstance(featuredimage); 
        let mediaArray = Media.newArray(media); 

        this._id = _id; 
        this.property = property;
        this.wishlist = wishlist;
        this.owner = owner;
        this.scores = scores;
        this.featuredimage = newFeaturedImage;
        this.media = mediaArray;
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

    public static newInstance(scorecard : any) : Scorecard{
        return new Scorecard(
                scorecard._id,
                scorecard.property,
                scorecard.wishlist,
                scorecard.owner,
                scorecard.scores,
                scorecard.featuredimage,
                scorecard.media,
                scorecard.active
            );
    }

    public static newArray(scorecard : any[]) : Scorecard[]{
        let newarray : Scorecard[] = [];
        scorecard.forEach(m => {
            newarray.push(this.newInstance(m)); 
        })
        return newarray; 
    }

    private calculateTotal (scorecard : Scorecard) : void {
        let total = 0; 
        scorecard.scores.forEach(score => total = total + score.score);
        total = (total / scorecard.scores.length );
        scorecard.total = total.toFixed(1);   
    }
}
