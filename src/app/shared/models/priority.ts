export class Priority {
    _id: string; 
    description: string;
	weight: number;
	wishlist: string;
    
    constructor(_id: string,
                description: string,
	            weight: number,
	            wishlist: string){
        this._id = _id; 
        this.description = description;
        this.weight = weight;
        this.wishlist = wishlist;
    }
}