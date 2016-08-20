import { Priority } from './priority';

export class Wishlist {
    _id: string; 
    title: string;
	priorities: Priority[];
	owner: string;
    
    constructor(_id: string,
                title: string,
	            priorities: Priority[],
	            owner: string){
        this._id = _id; 
        this.title = title;
        this.priorities = priorities;
        this.owner = owner;
    }

    public static returnNewEmptyInstance() {
        let newWishlist = new Wishlist('', '', [], ''); 
        return newWishlist;
    }
}